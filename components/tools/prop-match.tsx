"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Coins,
  DollarSign,
  Download,
  FileText,
  Globe,
  Info,
  LineChart,
  Loader2,
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

const defaults: Metrics = {
  totalTrades: 42,
  winRate: 58,
  maxDailyDrawdown: 4.7,
  overallDrawdown: 8.4,
  maxDailySwing: 3.2,
  averageWin: 420,
  averageLoss: 260,
  profitTarget: 11,
  weekendPositions: 1,
  newsTrades: 2,
  tradingDays: 18,
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
  if (value.includes("ftmo")) return "/logos/ftmo-logo.png";
  if (value.includes("fundednext")) return "/logos/fundednext-logo.webp";
  if (value.includes("5%")) return "/logos/5ers-Logo.png";
  if (value.includes("topstep")) return "/logos/topstep-logo.png";
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
          totalTrades: rows.length || defaults.totalTrades,
          winRate: pnl.length ? (wins.length / pnl.length) * 100 : defaults.winRate,
          maxDailyDrawdown: daily.length ? Math.max(...daily.map(Math.abs)) : defaults.maxDailyDrawdown,
          overallDrawdown: totalLoss.length ? Math.max(...totalLoss.map(Math.abs)) : defaults.overallDrawdown,
          maxDailySwing: daily.length ? Math.max(...daily.map(Math.abs)) : defaults.maxDailySwing,
          averageWin: wins.length ? totalWins / wins.length : defaults.averageWin,
          averageLoss: losses.length ? totalLosses / losses.length : defaults.averageLoss,
          profitTarget: netProfit > 0 ? (netProfit / (totalLosses || 1000)) * 10 : defaults.profitTarget,
          weekendPositions: rows.filter((row) =>
            Object.values(row).some((value) => /weekend|overnight/i.test(String(value)))
          ).length,
          newsTrades: rows.filter((row) =>
            Object.values(row).some((value) => /news|nfp|fed|cpi|high impact/i.test(String(value)))
          ).length,
          tradingDays: dates.size || defaults.tradingDays,
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
          ? "Not specified in JSON.txt"
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
    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
  ) : status === "warning" ? (
    <Info className="h-4 w-4 text-amber-400" />
  ) : (
    <ShieldAlert className="h-4 w-4 text-rose-400" />
  );
}

export function PropMatchEvaluator() {
  const [traderName, setTraderName] = useState("John Doe");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [metrics, setMetrics] = useState(defaults);
  const [firms, setFirms] = useState<Firm[]>([]);
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState("");

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
    setShowSuccessAlert(false);
    setAnalysisComplete(false);
    setFileName(file.name);
    setProcessing(true);

    try {
      const parsed = await parseStatement(file);

      // Total 5.0 seconds progress loader across 3 steps
      setStep(1);
      setMetrics(parsed);
      await new Promise((resolve) => setTimeout(resolve, 1600));

      setStep(2);
      await new Promise((resolve) => setTimeout(resolve, 1700));

      setStep(3);
      await new Promise((resolve) => setTimeout(resolve, 1700));

      setShowSuccessAlert(true);
      setAnalysisComplete(true);
    } catch {
      setError("Could not parse the statement. Include PnL, profit, or result columns.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadCertificate = () => {
    if (!top) return;
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = 1200 * scale;
    canvas.height = 630 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#09090b");
    gradient.addColorStop(0.5, "#0f172a");
    gradient.addColorStop(1, "#09090b");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Rounded glowing outer border
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, 1152, 582);

    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, 1140, 570);

    // Grid lines accent
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    for (let x = 40; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, 590);
      ctx.stroke();
    }
    for (let y = 40; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(1160, y);
      ctx.stroke();
    }

    // Forex symbols background watermark
    ctx.fillStyle = "rgba(59, 130, 246, 0.05)";
    ctx.font = "bold 90px sans-serif";
    ctx.fillText("EUR/USD  XAU/USD  GBP/USD", 80, 520);

    // Certificate Header
    ctx.fillStyle = "#3b82f6";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("PROPFIDENT VERIFIED EVALUATION", 64, 78);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 32px sans-serif";
    ctx.fillText("CERTIFICATE OF COMPLIANCE", 64, 126);

    ctx.font = "500 15px sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`Trader: ${traderName}`, 64, 160);
    ctx.fillText(`Verified: ${new Date().toLocaleDateString()}`, 64, 184);

    // Big Match Percentage Score
    ctx.fillStyle = "#60a5fa";
    ctx.font = "800 72px sans-serif";
    ctx.fillText(`${top.score}%`, 64, 280);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 24px sans-serif";
    ctx.fillText(top.name, 64, 320);

    ctx.fillStyle = "#34d399";
    ctx.font = "600 13px sans-serif";
    ctx.fillText("✓ TOP RECOMMENDED CHALLENGE MATCH", 64, 348);

    // Metrics Overview Box
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(64, 380, 580, 160);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "600 13px sans-serif";
    ctx.fillText(`Win Rate: ${metrics.winRate.toFixed(1)}%`, 84, 415);
    ctx.fillText(`Max Daily Drawdown: ${metrics.maxDailyDrawdown.toFixed(1)}%`, 84, 445);
    ctx.fillText(`Overall Drawdown: ${metrics.overallDrawdown.toFixed(1)}%`, 84, 475);
    ctx.fillText(`Total Executed Trades: ${metrics.totalTrades}`, 84, 505);

    // Right Box: Top 3 Firm Matches
    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 14px sans-serif";
    ctx.fillText("TOP 3 MATCHED PROP FIRMS", 720, 126);

    ranked.slice(0, 3).forEach((firm, index) => {
      const y = 170 + index * 95;

      ctx.fillStyle = index === 0 ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.04)";
      ctx.strokeStyle = index === 0 ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.fillRect(720, y, 410, 75);
      ctx.strokeRect(720, y, 410, 75);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "600 15px sans-serif";
      ctx.fillText(`${index + 1}. ${firm.name}`, 740, y + 35);

      ctx.font = "500 12px sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`${firm.passed}/${firm.lines.length} rules compliant`, 740, y + 55);

      ctx.font = "700 22px sans-serif";
      ctx.fillStyle = index === 0 ? "#a78bfa" : "#38bdf8";
      ctx.fillText(`${firm.score}%`, 1050, y + 45);
    });

    const anchor = document.createElement("a");
    anchor.download = `propfident-scorecard-${traderName.toLowerCase().replace(/\s+/g, "-")}.png`;
    anchor.href = canvas.toDataURL("image/png");
    anchor.click();
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Upload Card */}
      <Card className="border-border/60 bg-background/50">
        <CardHeader className="border-b border-border/40">
          <div className="flex items-center gap-2 text-primary font-mono text-sm">
            <Scale className="h-4 w-4" /> TOOL 02 // PROP MATCH ENGINE
          </div>
          <CardTitle>Upload your trading statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div
            role="button"
            tabIndex={0}
            className={`cursor-pointer rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 text-center transition-all hover:border-primary hover:bg-primary/10 ${
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
            <UploadCloud className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Drop your trading statement here</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Upload a CSV or TXT history to compute drawdown, win rate, daily swings, and pass probabilities across prop firm rulesets.
            </p>
            <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground font-medium hover:bg-primary/90 transition-all">
              <FileText className="h-4 w-4" /> Choose statement
              <input
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                className="hidden"
                onChange={(e) => void processFile(e.target.files?.[0])}
              />
            </label>
            <p className="mt-3 text-xs font-mono text-muted-foreground">{fileName || "CSV or TXT files supported"}</p>
          </div>

          {/* 5-Second 3-Step Loader */}
          {processing && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing trading history (5s evaluation)...
              </div>
              <div className="space-y-2">
                {steps.map((label, idx) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                      step > idx + 1
                        ? "text-emerald-400 font-medium"
                        : step === idx + 1
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground opacity-50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                        step > idx + 1
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                          : step === idx + 1
                          ? "border-primary bg-primary/20 text-primary animate-pulse"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {step > idx + 1 ? "✓" : idx + 1}
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coss-style Success Alert */}
          {showSuccessAlert && !processing && (
            <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300 flex items-start gap-3 backdrop-blur-md">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold font-sans text-emerald-200">
                  Trade Analysis Complete — Passed Benchmark Evaluation
                </h4>
                <p className="text-xs text-emerald-300/80">
                  Calculated metrics for {metrics.totalTrades} trades across {metrics.tradingDays} trading days. Top matching firm matched below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccessAlert(false)}
                className="ml-auto text-emerald-400 hover:text-emerald-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

          {/* Calculated Statement Metrics Grid (Balance & Equity removed) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {[
              ["Total trades", metrics.totalTrades],
              ["Win rate", `${metrics.winRate.toFixed(1)}%`],
              ["Max daily drawdown", `${metrics.maxDailyDrawdown.toFixed(1)}%`],
              ["Overall drawdown", `${metrics.overallDrawdown.toFixed(1)}%`],
              ["Max daily swing", `${metrics.maxDailySwing.toFixed(1)}%`],
              ["Avg win", `$${Math.round(metrics.averageWin)}`],
              ["Avg loss", `$${Math.round(metrics.averageLoss)}`],
              ["Trading days", metrics.tradingDays],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-lg border border-border/60 bg-background/80 p-3">
                <p className="text-[10px] uppercase font-mono text-muted-foreground">{label}</p>
                <p className="mt-1 text-lg font-bold font-mono">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Recommendation Banner */}
      {analysisComplete && !processing && top && (
        <>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Highest Compatibility Match</p>
                  <h3 className="text-xl font-semibold">{top.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-3 py-1">
                  {top.score}% Pass Probability
                </Badge>
                <a href={top.refUrl} target="_blank" rel="noreferrer">
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                    Apply Challenge <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Firm Matches & Coss-style Modal Popover */}
          <div className="space-y-3">
            {ranked.map((firm, index) => (
              <Card key={firm.id} className={index === 0 ? "border-primary/40 bg-primary/5" : "border-border/60"}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background font-mono font-bold border border-border/60">
                      #{index + 1}
                    </div>
                    <Image src={firm.logoUrl} alt="" width={36} height={36} className="h-9 w-9 rounded-md object-contain" />
                    <div>
                      <p className="font-semibold">{firm.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {firm.passed}/{firm.lines.length} rules passed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold font-mono text-primary">{firm.score}%</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="font-mono text-xs">
                          Analyze Rules
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{firm.name} — Full JSON.txt Rule Matrix</DialogTitle>
                          <DialogDescription>
                            Evaluated directly against your uploaded trade history statement.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 py-2">
                          {firm.lines.map((line) => (
                            <div
                              key={line.label}
                              className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface/40 p-3"
                            >
                              <StatusIcon status={line.status} />
                              <div>
                                <p className="text-sm font-semibold">{line.label}</p>
                                <p className="text-xs text-muted-foreground font-mono">{line.detail}</p>
                              </div>
                              <Badge variant="secondary" className="ml-auto text-[10px] uppercase font-mono">
                                {line.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <a href={firm.refUrl} target="_blank" rel="noreferrer">
                          <Button className="w-full gap-2">
                            Go to {firm.name} Challenge <ArrowRight className="h-4 w-4" />
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

      {/* WYSIWYG Downloadable Scorecard Certificate (Identical design to downloaded PNG) */}
      {analysisComplete && !processing && <div className="relative overflow-hidden rounded-[28px] border-2 border-blue-500/50 bg-[linear-gradient(135deg,#09090b_0%,#0f172a_50%,#09090b_100%)] p-6 sm:p-8 shadow-[0_25px_80px_rgba(59,130,246,0.2)]">
        {/* Forex Splash Icons scattered across background */}
        <Globe className="absolute top-4 left-6 h-20 w-20 text-blue-500/10 -rotate-12 pointer-events-none" />
        <TrendingUp className="absolute top-6 right-16 h-24 w-24 text-indigo-500/10 rotate-12 pointer-events-none" />
        <BarChart3 className="absolute bottom-10 left-1/3 h-28 w-28 text-purple-500/10 rotate-6 pointer-events-none" />
        <Coins className="absolute bottom-6 right-8 h-20 w-20 text-emerald-500/10 -rotate-45 pointer-events-none" />
        <LineChart className="absolute bottom-4 left-8 h-20 w-20 text-cyan-500/10 rotate-12 pointer-events-none" />
        <Activity className="absolute top-1/2 right-1/4 h-16 w-16 text-blue-400/5 -rotate-12 pointer-events-none" />
        <DollarSign className="absolute top-1/3 left-10 h-16 w-16 text-emerald-400/5 rotate-45 pointer-events-none" />
        <Zap className="absolute bottom-1/3 right-10 h-14 w-14 text-amber-400/5 -rotate-12 pointer-events-none" />

        {/* Certificate Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Propfident" width={36} height={36} />
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-blue-400 font-semibold uppercase">
                PROPFIDENT VERIFIED EVALUATION
              </p>
              <p className="text-sm font-semibold text-card-foreground">Certificate of Compliance</p>
            </div>
          </div>
          <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/40 font-mono text-xs px-3 py-1">
            Scorecard
          </Badge>
        </div>

        {/* Certificate Body */}
        <div className="relative z-10 mt-6 grid gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">TRADER NAME (EDITABLE)</p>
            <input
              value={traderName}
              onChange={(e) => setTraderName(e.target.value)}
              className="mt-1 w-full max-w-md border-b border-border/60 bg-transparent py-1.5 text-2xl sm:text-3xl font-bold text-card-foreground outline-none focus:border-blue-400 transition-all font-sans"
            />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">HIGHEST MATCHED FIRM</p>
            <div className="mt-2 flex items-center gap-3">
              <Image
                src={top?.logoUrl ?? "/logo.png"}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain bg-background/40 p-1 border border-white/10"
              />
              <div>
                <span className="text-xl font-semibold text-card-foreground">{top?.name ?? "Loading firm rules..."}</span>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Top recommended challenge match
                </p>
              </div>
            </div>

            {/* Performance Snapshot */}
            <div className="mt-6 rounded-xl border border-border/60 bg-card/40 p-4 grid grid-cols-2 gap-3 max-w-md font-mono text-xs text-card-foreground">
              <div>
                <span className="text-muted-foreground block text-[10px]">WIN RATE</span>
                <span className="font-bold text-card-foreground text-sm">{metrics.winRate.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">MAX DAILY DD</span>
                <span className="font-bold text-card-foreground text-sm">{metrics.maxDailyDrawdown.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">OVERALL DD</span>
                <span className="font-bold text-card-foreground text-sm">{metrics.overallDrawdown.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">EXECUTED TRADES</span>
                <span className="font-bold text-card-foreground text-sm">{metrics.totalTrades}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground text-left md:text-right">
                PASS PROBABILITY
              </p>
              <p className="mt-1 text-6xl font-extrabold text-blue-400 font-mono">{top?.score ?? 0}%</p>
            </div>

            {/* Top 3 Matches Mini Matrix */}
            <div className="mt-4 w-full md:w-64 space-y-2">
              <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Top 3 Firm Rankings</p>
              {ranked.slice(0, 3).map((firm, idx) => (
                <div
                  key={firm.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono"
                >
                  <span className="text-card-foreground truncate">
                    {idx + 1}. {firm.name}
                  </span>
                  <span className="font-bold text-blue-400">{firm.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action / Export Footer */}
        <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-5">
          <p className="text-xs font-mono text-muted-foreground">High-DPI PNG certificate output (1200×630)</p>
          <Button
            onClick={downloadCertificate}
            disabled={!top}
            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-primary-foreground shadow-lg"
          >
            <Download className="h-4 w-4" /> Download Certificate (PNG)
          </Button>
        </div>
      </div>}
    </div>
  );
}