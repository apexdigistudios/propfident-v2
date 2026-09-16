"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Info,
  Loader2,
  Scale,
  ShieldAlert,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScorecardModal } from "@/components/scorecard-modal";

type SourceFirm = {
  firm_name: string;
  account_model: string;
  account_size: number;
  rules: Record<string, boolean | number | string | null>;
};

type Metrics = {
  totalTrades: number;
  winRate: number;
  maxDailyDrawdown: number;
  overallDrawdown: number;
  maxDailySwing: number;
  averageWin: number;
  averageLoss: number;
  profitTarget: number;
  weekendPositions: number;
  newsTrades: number;
  tradingDays: number;
};

type Firm = {
  id: string;
  name: string;
  logoUrl: string;
  refUrl: string;
  rules: SourceFirm["rules"];
  daily: number;
  total: number;
  target: number;
  drawdownType: string;
  news: string;
  weekend: string;
  minimumDays: number;
};

type Status = "pass" | "warning" | "fail";
type Line = { label: string; status: Status; detail: string };
type RankedFirm = Firm & { score: number; passed: number; lines: Line[] };

const zeroMetrics: Metrics = {
  totalTrades: 0,
  winRate: 0,
  maxDailyDrawdown: 0,
  overallDrawdown: 0,
  maxDailySwing: 0,
  averageWin: 0,
  averageLoss: 0,
  profitTarget: 0,
  weekendPositions: 0,
  newsTrades: 0,
  tradingDays: 0,
};

const steps = [
  "Parsing trade logs & calculating risk metrics...",
  "Benchmarking against JSON prop firm rules...",
  "Generating pass probability matrix & scorecard...",
];

const toNumber = (value: unknown) => {
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
};

const ruleNumber = (rules: Record<string, unknown>, keys: string[], fallback: number) => {
  for (const key of keys) {
    const value = toNumber(rules[key]);
    if (value !== null) return value;
  }
  return fallback;
};

const logoFor = (name: string) => {
  const value = name.toLowerCase();
  if (value.includes("alpha")) return "/logos/Alpha-Capital-prop-firm-logo.png";
  if (value.includes("fundednext")) return "/logos/fundednext-logo.png";
  if (value.includes("aqua")) return "/logos/aqua-funded-logo.png";
  if (value.includes("topstep")) return "/logos/topstep-logo.png";
  if (value.includes("goat")) return "/logos/Goat-Funded-Trader-logo.png";
  if (value.includes("5%")) return "/logos/5ers-Logo.png";
  if (value.includes("ftmo")) return "/logos/ftmo-logo.png";
  return "/logo.png";
};

const referralFor = (name: string) => {
  const value = name.toLowerCase();
  if (value.includes("ftmo")) return "https://ftmo.com/?ref=propfident";
  if (value.includes("fundednext")) return "https://fundednext.com/?ref=propfident";
  if (value.includes("funding pips")) return "https://fundingpips.com/?ref=propfident";
  if (value.includes("5%")) return "https://www.the5ers.com/?ref=propfident";
  return "#pricing";
};

function normalize(firm: SourceFirm, index: number): Firm {
  const rules = firm.rules;
  return {
    id: `${firm.firm_name}-${firm.account_model}-${firm.account_size}-${index}`,
    name: `${firm.firm_name} ${firm.account_model} $${Math.round(firm.account_size / 1000)}K`,
    logoUrl: logoFor(firm.firm_name),
    refUrl: referralFor(firm.firm_name),
    rules,
    daily: ruleNumber(rules, ["daily_drawdown_percent"], 5),
    total: ruleNumber(rules, ["max_drawdown_percent"], 10),
    target: ruleNumber(rules, ["profit_target_p1_percent"], 0),
    drawdownType: `${rules.daily_drawdown_type ?? "unspecified"} / ${rules.max_drawdown_type ?? "unspecified"}`,
    news: String(rules.news_trading ?? "unspecified"),
    weekend: String(rules.weekend_holding ?? "unspecified"),
    minimumDays: ruleNumber(rules, ["min_trading_days_p1"], 0),
  };
}

async function parseStatement(file: File): Promise<Metrics> {
  return new Promise((resolve, reject) =>
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const rows = data.filter((row) => Object.values(row).some(Boolean));
        const values = (names: string[]) =>
          rows.flatMap((row) => {
            const match = Object.entries(row).find(([key]) => names.some((name) => key.toLowerCase().includes(name)));
            const value = match ? toNumber(match[1]) : null;
            return value === null ? [] : [value];
          });

        const pnl = values(["pnl", "profit", "net profit", "result"]);
        const daily = values(["daily loss", "daily drawdown", "daily dd"]);
        const totalLoss = values(["total loss", "max drawdown", "overall drawdown", "total drawdown"]);
        const wins = pnl.filter((value) => value > 0);
        const losses = pnl.filter((value) => value < 0);
        const dates = new Set(
          rows
            .map((row) => Object.entries(row).find(([key]) => /date|time/i.test(key))?.[1])
            .filter(Boolean)
        );

        const totalWins = wins.reduce((sum, value) => sum + value, 0);
        const totalLosses = Math.abs(losses.reduce((sum, value) => sum + value, 0));
        const netProfit = totalWins - totalLosses;

        resolve({
          totalTrades: rows.length || zeroMetrics.totalTrades,
          winRate: pnl.length ? (wins.length / pnl.length) * 100 : zeroMetrics.winRate,
          maxDailyDrawdown: daily.length ? Math.max(...daily.map(Math.abs)) : zeroMetrics.maxDailyDrawdown,
          overallDrawdown: totalLoss.length ? Math.max(...totalLoss.map(Math.abs)) : zeroMetrics.overallDrawdown,
          maxDailySwing: daily.length ? Math.max(...daily.map(Math.abs)) : zeroMetrics.maxDailySwing,
          averageWin: wins.length ? totalWins / wins.length : zeroMetrics.averageWin,
          averageLoss: losses.length ? totalLosses / losses.length : zeroMetrics.averageLoss,
          profitTarget: netProfit > 0 ? (netProfit / (totalLosses || 1000)) * 10 : zeroMetrics.profitTarget,
          weekendPositions: rows.filter((row) =>
            Object.values(row).some((value) => /weekend|overnight/i.test(String(value)))
          ).length,
          newsTrades: rows.filter((row) =>
            Object.values(row).some((value) => /news|nfp|fed|cpi|high impact/i.test(String(value)))
          ).length,
          tradingDays: dates.size || zeroMetrics.tradingDays,
        });
      },
      error: reject,
    })
  );
}

function evaluate(firm: Firm, metrics: Metrics): RankedFirm {
  const dailyMargin = firm.daily - metrics.maxDailyDrawdown;
  const totalMargin = firm.total - metrics.overallDrawdown;
  const newsAllowed = firm.news === "true" || firm.news === "allowed";
  const weekendAllowed = firm.weekend === "true" || firm.weekend === "allowed";
  const ruleStatus = (condition: boolean, warning = false): Status =>
    condition ? "pass" : warning ? "warning" : "fail";

  const lines: Line[] = [
    {
      label: "Daily drawdown",
      status: ruleStatus(dailyMargin >= 0, dailyMargin >= -0.5),
      detail: `${dailyMargin.toFixed(1)}% buffer remaining (${firm.drawdownType.split(" /")[0]})`,
    },
    {
      label: "Total drawdown",
      status: ruleStatus(totalMargin >= 0, totalMargin >= -1),
      detail: `${totalMargin.toFixed(1)}% buffer remaining (${firm.drawdownType.split(" /")[1]})`,
    },
    {
      label: "Phase 1 profit target",
      status: ruleStatus(
        !firm.target || metrics.profitTarget >= firm.target,
        firm.target > 0 && metrics.profitTarget >= firm.target * 0.8
      ),
      detail: `${metrics.profitTarget.toFixed(1)}% achieved / ${firm.target || "none"}% required`,
    },
    {
      label: "Phase 2 / scaling",
      status: firm.rules.profit_target_p2_percent == null ? "warning" : "pass",
      detail:
        firm.rules.profit_target_p2_percent == null
          ? "Not specified in rules"
          : `${firm.rules.profit_target_p2_percent}% phase 2 target`,
    },
    {
      label: "News rule",
      status: ruleStatus(newsAllowed || metrics.newsTrades === 0, !newsAllowed && metrics.newsTrades === 0),
      detail: newsAllowed
        ? "Compliant: news allowed"
        : `${firm.news}; ${metrics.newsTrades} event trades detected`,
    },
    {
      label: "Weekend / overnight",
      status: ruleStatus(weekendAllowed || metrics.weekendPositions === 0, !weekendAllowed && metrics.weekendPositions === 0),
      detail: weekendAllowed
        ? "Holding allowed"
        : `${metrics.weekendPositions ? "Close before Friday cutoff" : "No weekend exposure"}`,
    },
    {
      label: "Minimum trading days",
      status: ruleStatus(!firm.minimumDays || metrics.tradingDays >= firm.minimumDays, metrics.tradingDays >= firm.minimumDays - 1),
      detail: firm.minimumDays ? `${metrics.tradingDays} observed / ${firm.minimumDays} required` : "No minimum listed",
    },
    {
      label: "Lot / position limits",
      status: "warning",
      detail: String(firm.rules.max_lots ?? firm.rules.max_position_size ?? "Not specified"),
    },
    {
      label: "Consistency / profit cap",
      status: "warning",
      detail: String(firm.rules.consistency_rule ?? firm.rules.profit_cap ?? "Not specified"),
    },
    {
      label: "Payout / profit split",
      status: "pass",
      detail: `${firm.rules.profit_split_percent ?? "Unspecified"}% split; cadence ${firm.rules.payout_frequency ?? "not specified"}`,
    },
  ];

  const passed = lines.filter((line) => line.status === "pass").length;
  const weighted = lines.reduce(
    (sum, line) => sum + (line.status === "pass" ? 1 : line.status === "warning" ? 0.55 : 0),
    0
  );
  return { ...firm, score: Math.round((weighted / lines.length) * 100), passed, lines };
}

function StatusIcon({ status }: { status: Status }) {
  return status === "pass" ? (
    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
  ) : status === "warning" ? (
    <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
  ) : (
    <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
  );
}

export function PropMatchEvaluator() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [metrics, setMetrics] = useState<Metrics>(zeroMetrics);
  const [firms, setFirms] = useState<Firm[]>([]);
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState("");

  const [isScorecardOpen, setIsScorecardOpen] = useState(false);
  const [traderName, setTraderName] = useState("John Doe");

  useEffect(() => {
    void fetch("/api/prop-firms")
      .then((response) => response.json() as Promise<SourceFirm[]>)
      .then((data) => setFirms(data.map(normalize)))
      .catch(() => setError("Firm rules could not be loaded."));
  }, []);

  const ranked = useMemo(
    () => firms.map((firm) => evaluate(firm, metrics)).sort((a, b) => b.score - a.score),
    [firms, metrics]
  );
  const top = ranked[0];

  const processFile = async (file?: File) => {
    if (!file || processing) return;
    if (!/\.(csv|txt)$/i.test(file.name)) {
      setError("Please upload a .csv or .txt statement.");
      return;
    }
    setError("");
    setShowSuccessToast(false);
    setAnalysisComplete(false);
    setFileName(file.name);
    setProcessing(true);

    try {
      const parsed = await parseStatement(file);

      setStep(1);
      setMetrics(parsed);
      await new Promise((resolve) => setTimeout(resolve, 1600));

      setStep(2);
      await new Promise((resolve) => setTimeout(resolve, 1700));

      setStep(3);
      await new Promise((resolve) => setTimeout(resolve, 1700));

      setShowSuccessToast(true);
      setAnalysisComplete(true);
    } catch {
      setError("Could not parse statement. Make sure it contains PnL/Profit data.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-x-hidden space-y-6 px-1">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50 flex items-center gap-3 rounded-2xl border border-white/40 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex-1 text-xs min-w-0">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Evaluation Complete</p>
            <p className="text-zinc-600 dark:text-zinc-300 truncate">
              Processed across {metrics.tradingDays} trading days.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccessToast(false)}
            className="rounded-lg p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Upload Box */}
      <Card className="border-border/60 bg-background/50 overflow-hidden w-full">
        <CardHeader className="border-b border-border/40 p-4 sm:p-6">
          <div className="flex items-center gap-2 text-primary font-mono text-xs sm:text-sm">
            <Scale className="h-4 w-4" /> TOOL 02 // PROP MATCH ENGINE
          </div>
          <CardTitle className="text-lg sm:text-xl">Upload your trading statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div
            role="button"
            tabIndex={0}
            className={`cursor-pointer rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-5 sm:p-8 text-center transition-all hover:border-primary hover:bg-primary/10 ${
              dragging ? "border-primary bg-primary/10" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              void processFile(e.dataTransfer.files[0]);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") e.currentTarget.querySelector<HTMLInputElement>("input")?.click();
            }}
          >
            <UploadCloud className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h3 className="mt-3 text-base sm:text-lg font-semibold text-foreground">
              Drop your trading statement here
            </h3>
            <p className="mx-auto mt-1 max-w-lg text-xs sm:text-sm text-muted-foreground">
              Upload a CSV or TXT file to evaluate drawdown and match rules.
            </p>
            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs sm:text-sm text-primary-foreground font-medium hover:bg-primary/90 transition-all">
              <FileText className="h-4 w-4" /> Choose statement
              <input
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                className="hidden"
                onChange={(e) => void processFile(e.target.files?.[0])}
              />
            </label>
            <p className="mt-2 text-[11px] font-mono text-muted-foreground truncate">{fileName || "CSV or TXT files supported"}</p>
          </div>

          {/* Loader */}
          {processing && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary">
                <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                Analyzing trading history...
              </div>
              <div className="space-y-2">
                {steps.map((label, idx) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 text-xs sm:text-sm transition-all duration-300 ${
                      step > idx + 1
                        ? "text-emerald-600 dark:text-emerald-400 font-medium"
                        : step === idx + 1
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground opacity-50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                        step > idx + 1
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : step === idx + 1
                          ? "border-primary bg-primary/20 text-primary animate-pulse"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {step > idx + 1 ? "✓" : idx + 1}
                    </span>
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-xs sm:text-sm text-rose-600 dark:text-rose-400">{error}</p>}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {[
              ["Total trades", analysisComplete ? metrics.totalTrades : 0],
              ["Win rate", `${analysisComplete ? metrics.winRate.toFixed(1) : "0.0"}%`],
              ["Max daily DD", `${analysisComplete ? metrics.maxDailyDrawdown.toFixed(1) : "0.0"}%`],
              ["Overall DD", `${analysisComplete ? metrics.overallDrawdown.toFixed(1) : "0.0"}%`],
              ["Max daily swing", `${analysisComplete ? metrics.maxDailySwing.toFixed(1) : "0.0"}%`],
              ["Avg win", `$${analysisComplete ? Math.round(metrics.averageWin) : 0}`],
              ["Avg loss", `$${analysisComplete ? Math.round(metrics.averageLoss) : 0}`],
              ["Trading days", analysisComplete ? metrics.tradingDays : 0],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-lg border border-border/60 bg-background/80 p-2.5">
                <p className="text-[9px] sm:text-[10px] uppercase font-mono text-muted-foreground truncate">{label}</p>
                <p className="mt-0.5 text-sm sm:text-base font-bold font-mono text-foreground truncate">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Banner */}
      {analysisComplete && !processing && top && (
        <>
          <Card className="border-primary/30 bg-primary/5 overflow-hidden w-full">
            <CardContent className="flex flex-col gap-3 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <Sparkles className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-primary">Highest Match</p>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{top.name}</h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-mono text-[11px] px-2.5 py-1">
                  {top.score}% Pass
                </Badge>
                <Button
                  onClick={() => setIsScorecardOpen(true)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 font-mono text-xs border-primary/30 hover:bg-primary/10"
                >
                  <BarChart3 className="h-3.5 w-3.5 text-primary" /> View Card
                </Button>
                <a href={top.refUrl} target="_blank" rel="noreferrer" className="shrink-0">
                  <Button size="sm" className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                    Apply <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Firm Cards */}
          <div className="space-y-2.5 w-full">
            {ranked.map((firm, index) => (
              <Card key={firm.id} className={`w-full overflow-hidden ${index === 0 ? "border-primary/40 bg-primary/5" : "border-border/60"}`}>
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5">
                  <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background font-mono text-xs font-bold text-foreground border border-border/60">
                      #{index + 1}
                    </div>
                    <Image
                      src={firm.logoUrl}
                      alt={firm.name}
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs sm:text-sm text-foreground truncate">{firm.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {firm.passed}/{firm.lines.length} passed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-0 border-border/30">
                    <span className="text-base sm:text-lg font-bold font-mono text-primary">{firm.score}%</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="font-mono text-xs h-8 px-2.5">
                          Rules
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto p-4 sm:p-6">
                        <DialogHeader>
                          <DialogTitle className="text-base sm:text-lg">{firm.name} Matrix</DialogTitle>
                          <DialogDescription className="text-xs">
                            Evaluated against your trade statement.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 py-2">
                          {firm.lines.map((line) => (
                            <div
                              key={line.label}
                              className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/30 p-2.5"
                            >
                              <StatusIcon status={line.status} />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-foreground">{line.label}</p>
                                <p className="text-[11px] text-muted-foreground font-mono break-words">{line.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <a href={firm.refUrl} target="_blank" rel="noreferrer" className="w-full">
                          <Button className="w-full gap-2 text-xs">
                            Go to Challenge <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Full-Screen Scorecard Modal */}
      <ScorecardModal
        isOpen={isScorecardOpen}
        onClose={() => setIsScorecardOpen(false)}
        traderName={traderName}
        setTraderName={setTraderName}
        topFirm={top}
        metrics={metrics}
        rankedFirms={ranked}
      />
    </div>
  );
}