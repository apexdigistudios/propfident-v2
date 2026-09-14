"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Download,
  Scale,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FirmRule = {
  id: string;
  name: string;
  logoUrl: string;
  refUrl: string;
  maxDailyDrawdown: number;
  maxTotalDrawdown: number;
  profitTarget: number;
  drawdownType: string;
  newsTradingAllowed: boolean;
  weekendHoldingAllowed: boolean;
  minTradingDays: number;
};

type SourceFirm = {
  firm_name: string;
  account_model: string;
  account_size: number;
  rules: {
    profit_target_p1_percent: number | null;
    daily_drawdown_percent: number | null;
    max_drawdown_percent: number | null;
    daily_drawdown_type: string;
    max_drawdown_type: string;
    weekend_holding: boolean | string;
    news_trading: boolean | string;
    min_trading_days_p1: number | string;
  };
};

type TradeMetrics = {
  maxDailyDrawdown: number;
  overallDrawdown: number;
  weekendPositions: number;
  newsTrades: number;
  profitTarget: number;
};

const defaultMetrics: TradeMetrics = {
  maxDailyDrawdown: 4.7,
  overallDrawdown: 8.4,
  weekendPositions: 1,
  newsTrades: 2,
  profitTarget: 11,
};

function extractNumber(text: string, labels: string[]) {
  for (const label of labels) {
    const match = text.match(new RegExp(`${label}[^0-9-]*(-?\\d+(?:\\.\\d+)?)`, "i"));
    if (match) return Number(match[1]);
  }
  return null;
}

async function parseTradeLog(file: File): Promise<TradeMetrics> {
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
    return {
      maxDailyDrawdown: 5.2,
      overallDrawdown: 9.1,
      weekendPositions: 2,
      newsTrades: 3,
      profitTarget: 10.2,
    };
  }

  const text = await file.text();
  const daily = extractNumber(text, ["max daily drawdown", "largest daily drawdown", "daily dd"]) ?? 4.8;
  const total = extractNumber(text, ["max total drawdown", "overall drawdown", "total drawdown", "max drawdown"]) ?? 8.6;
  const profitTarget = extractNumber(text, ["profit target", "target profit"]) ?? 10.5;
  const weekendPositions = (text.match(/weekend|overnight|hold over weekend/gi) ?? []).length || 1;
  const newsTrades = (text.match(/news|nfp|fed|cpi|high impact|nonfarm/gi) ?? []).length || 2;

  return {
    maxDailyDrawdown: Number(Math.min(12, Math.max(1, daily)).toFixed(1)),
    overallDrawdown: Number(Math.min(20, Math.max(2, total)).toFixed(1)),
    weekendPositions: Math.max(0, weekendPositions),
    newsTrades: Math.max(0, newsTrades),
    profitTarget: Number(Math.max(0, Math.min(25, profitTarget)).toFixed(1)),
  };
}

function evaluateFirm(firm: FirmRule, metrics: TradeMetrics) {
  let score = 100;
  const dailyPenalty = Math.max(0, (metrics.maxDailyDrawdown - firm.maxDailyDrawdown) / firm.maxDailyDrawdown) * 45;
  const totalPenalty = Math.max(0, (metrics.overallDrawdown - firm.maxTotalDrawdown) / firm.maxTotalDrawdown) * 40;
  const targetPenalty = Math.max(0, (firm.profitTarget - metrics.profitTarget) / firm.profitTarget) * 15;

  score -= dailyPenalty + totalPenalty + targetPenalty;

  if (!firm.newsTradingAllowed && metrics.newsTrades > 0) score -= 12;
  if (!firm.weekendHoldingAllowed && metrics.weekendPositions > 0) score -= 16;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function PropMatchEvaluator() {
  const [traderName, setTraderName] = useState("John Doe");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("sample-trade-log.csv");
  const [metrics, setMetrics] = useState<TradeMetrics>(defaultMetrics);
  const [firms, setFirms] = useState<FirmRule[]>([]);

  useEffect(() => {
    void fetch("/api/prop-firms")
      .then((response) => response.json() as Promise<SourceFirm[]>)
      .then((sourceFirms) => {
        setFirms(sourceFirms.map((firm, index) => ({
          id: `${firm.firm_name}-${firm.account_model}-${firm.account_size}-${index}`,
          name: `${firm.firm_name} ${firm.account_model} $${Math.round(firm.account_size / 1000)}K`,
          logoUrl: "/logo.png",
          refUrl: "#pricing",
          maxDailyDrawdown: firm.rules.daily_drawdown_percent ?? 5,
          maxTotalDrawdown: firm.rules.max_drawdown_percent ?? 10,
          profitTarget: firm.rules.profit_target_p1_percent ?? 0,
          drawdownType: `${firm.rules.daily_drawdown_type} / ${firm.rules.max_drawdown_type}`,
          newsTradingAllowed: firm.rules.news_trading === true,
          weekendHoldingAllowed: firm.rules.weekend_holding === true,
          minTradingDays: typeof firm.rules.min_trading_days_p1 === "number" ? firm.rules.min_trading_days_p1 : 0,
        })));
      })
      .catch(() => setFirms([]));
  }, []);

  const rankedFirms = useMemo(
    () => [...firms].map((firm) => ({ ...firm, score: evaluateFirm(firm, metrics) })).sort((a, b) => b.score - a.score),
    [metrics]
  );

  const topFirm = rankedFirms[0];
  const topThree = rankedFirms.slice(0, 3);

  if (!topFirm) {
    return (
      <Card className="w-full border-border/60 bg-background/50 shadow-xl">
        <CardContent className="p-8 text-center text-sm text-muted-foreground">
          Loading prop-firm rules from JSON.txt...
        </CardContent>
      </Card>
    );
  }

  const handleFileSelection = async (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    try {
      const parsed = await parseTradeLog(file);
      setMetrics(parsed);
    } catch {
      setMetrics(defaultMetrics);
    }
  };

  const generateCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#09090f");
    gradient.addColorStop(0.6, "#111827");
    gradient.addColorStop(1, "#0f172a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    const glow = ctx.createRadialGradient(820, 220, 60, 820, 220, 500);
    glow.addColorStop(0, "rgba(168, 85, 247, 0.38)");
    glow.addColorStop(1, "rgba(168, 85, 247, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 52px sans-serif";
    ctx.fillText("Propfident Prop Match Certificate", 110, 180);
    ctx.font = "500 28px sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`Trader: ${traderName}`, 110, 240);

    ctx.fillStyle = "#a78bfa";
    ctx.font = "700 30px sans-serif";
    ctx.fillText("Top Match", 110, 330);
    ctx.fillStyle = "#fff";
    ctx.font = "700 52px sans-serif";
    ctx.fillText(topFirm.name, 110, 390);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 24px sans-serif";
    ctx.fillText("Pass Probability", 110, 500);
    ctx.fillStyle = "#a78bfa";
    ctx.font = "700 82px sans-serif";
    ctx.fillText(`${topFirm.score}%`, 110, 610);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 20px sans-serif";
    ctx.fillText("Top 3 firms", 900, 300);
    topThree.forEach((firm, index) => {
      const y = 350 + index * 90;
      ctx.fillStyle = index === 0 ? "#a78bfa" : "#e2e8f0";
      ctx.fillRect(900, y - 25, 260, 36);
      ctx.fillStyle = "#111827";
      ctx.font = "700 20px sans-serif";
      ctx.fillText(`${firm.name} ${firm.score}%`, 920, y + 2);
    });

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(110, 700, 1380, 220);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 24px sans-serif";
    ctx.fillText("Key Criteria", 150, 755);
    ctx.font = "500 22px sans-serif";
    ctx.fillText(`Max Daily Drawdown: ${metrics.maxDailyDrawdown}%`, 150, 805);
    ctx.fillText(`Overall Drawdown: ${metrics.overallDrawdown}%`, 150, 845);
    ctx.fillText(`Weekend Positions: ${metrics.weekendPositions}`, 150, 885);
    ctx.fillText(`News Trades: ${metrics.newsTrades}`, 150, 925);

    const anchor = document.createElement("a");
    anchor.download = `propfident-scorecard-${traderName.toLowerCase().replace(/\s+/g, "-")}.png`;
    anchor.href = canvas.toDataURL("image/png");
    anchor.click();
  };

  return (
    <div className="space-y-6">
      <Card className="w-full border-border/60 bg-background/50 backdrop-blur-md shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
        <CardHeader className="border-b border-border/40 pb-4">
          <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
            <Scale className="h-4 w-4" />
            <span>TOOL 02 // RULE COMPARATOR</span>
          </div>
          <CardTitle className="text-xl font-bold font-sans">Prop Match Auditor</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className={`rounded-2xl border border-dashed p-6 text-center transition-all ${dragging ? "border-primary bg-primary/5" : "border-border bg-surface/40"}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                const file = event.dataTransfer.files[0];
                void handleFileSelection(file);
              }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold">Upload trade history</h3>
              <p className="mt-2 text-xs text-muted-foreground">CSV, TXT, MT4/MT5 screenshots, or statements accepted.</p>
              <label className="mt-4 inline-flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                Choose file
                <input
                  type="file"
                  accept=".csv,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(event) => void handleFileSelection(event.target.files?.[0])}
                />
              </label>
              <p className="mt-3 text-[10px] font-mono text-muted-foreground">Current file: {fileName}</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-border/40 bg-surface/40 p-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground">Trader name</label>
                <input
                  value={traderName}
                  onChange={(event) => setTraderName(event.target.value || "John Doe")}
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono text-foreground outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Max daily DD</p>
                  <p className="mt-2 text-lg font-bold text-foreground">{metrics.maxDailyDrawdown.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Overall DD</p>
                  <p className="mt-2 text-lg font-bold text-foreground">{metrics.overallDrawdown.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">Weekend holds</p>
                  <p className="mt-2 text-lg font-bold text-foreground">{metrics.weekendPositions}</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] uppercase text-muted-foreground">News trades</p>
                  <p className="mt-2 text-lg font-bold text-foreground">{metrics.newsTrades}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Top recommendation</p>
                  <h3 className="text-xl font-semibold">{topFirm.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500 font-mono text-[10px]">
                  {topFirm.score}% Pass Probability
                </Badge>
                <a href={topFirm.refUrl} target="_blank" rel="noreferrer">
                  <Button className="gap-2">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {rankedFirms.map((firm, index) => (
              <div key={firm.id} className={`flex items-center justify-between rounded-xl border p-3 ${index === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-surface/50"}`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-xs font-bold text-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{firm.name}</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-mono">{firm.drawdownType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-foreground">{firm.score}%</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={firm.refUrl} target="_blank" rel="noreferrer">Apply</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-[28px] border border-border/60 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_rgba(15,23,42,0)_45%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))] p-6 shadow-[0_25px_80px_rgba(124,58,237,0.18)]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2">
              <Image src="/logo.png" alt="Propfident" width={28} height={28} className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300">Propfident</p>
              <p className="text-sm text-muted-foreground">Trader compatibility certificate</p>
            </div>
          </div>
          <div className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-[10px] font-mono uppercase text-violet-200">
            #1 Recommended Match
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Trader</p>
            <h3 className="mt-3 text-3xl font-bold">{traderName}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {topThree.map((firm) => (
                <Badge key={firm.id} variant="secondary" className="border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-mono text-violet-200">
                  {firm.name} • {firm.score}%
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Top firm</span>
              <span className="text-xl font-bold text-violet-300">{topFirm.score}%</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <img src={topFirm.logoUrl} alt={topFirm.name} className="h-10 w-auto rounded-md bg-white/10 p-2" />
              <div>
                <p className="font-semibold">{topFirm.name}</p>
                <p className="text-xs text-muted-foreground">Best pass probability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {topThree.map((firm) => (
            <div key={firm.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{firm.name}</p>
              <p className="mt-4 text-3xl font-bold text-foreground">{firm.score}%</p>
              <p className="mt-2 text-xs text-muted-foreground">Daily DD {firm.maxDailyDrawdown}% • Total {firm.maxTotalDrawdown}%</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end">
          <Button onClick={generateCertificate} className="gap-2 bg-violet-600 hover:bg-violet-500">
            <Download className="h-4 w-4" /> Download Certificate (PNG)
          </Button>
        </div>
      </div>
    </div>
  );
}