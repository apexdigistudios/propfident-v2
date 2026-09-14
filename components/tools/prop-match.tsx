"use client";

import { useState } from "react";
import { CheckCircle2, ShieldAlert, Sparkles, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FirmRules {
  name: string;
  maxDailyDD: string;
  maxTotalDD: string;
  profitTarget: string;
  drawdownType: "Balance-Based" | "Equity-Based (Trailing)" | "Static";
  newsTrading: boolean;
  weekendHolding: boolean;
  minTradingDays: number;
}

const PROP_FIRMS: Record<string, FirmRules> = {
  ftmo: {
    name: "FTMO (Normal)",
    maxDailyDD: "5%",
    maxTotalDD: "10%",
    profitTarget: "10%",
    drawdownType: "Balance-Based",
    newsTrading: true,
    weekendHolding: false,
    minTradingDays: 4,
  },
  fundingpips: {
    name: "Funding Pips (2-Step)",
    maxDailyDD: "5%",
    maxTotalDD: "10%",
    profitTarget: "8%",
    drawdownType: "Equity-Based (Trailing)",
    newsTrading: false,
    weekendHolding: true,
    minTradingDays: 0,
  },
  fundednext: {
    name: "FundedNext (Stellar)",
    maxDailyDD: "5%",
    maxTotalDD: "10%",
    profitTarget: "8%",
    drawdownType: "Balance-Based",
    newsTrading: true,
    weekendHolding: true,
    minTradingDays: 5,
  },
  fivepercenters: {
    name: "The 5%ers (High Stakes)",
    maxDailyDD: "5%",
    maxTotalDD: "10%",
    profitTarget: "8%",
    drawdownType: "Static",
    newsTrading: true,
    weekendHolding: true,
    minTradingDays: 3,
  },
};

export function PropMatchEvaluator() {
  const [selectedFirm, setSelectedFirm] = useState<string>("ftmo");
  const [tradingStyle, setTradingStyle] = useState<string>("day");

  const firm = PROP_FIRMS[selectedFirm];

  // Logic to determine compatibility score based on trading style
  const getCompatibilityScore = () => {
    let score = 90;
    if (tradingStyle === "swing" && !firm.weekendHolding) score -= 30;
    if (tradingStyle === "news" && !firm.newsTrading) score -= 40;
    if (firm.drawdownType === "Equity-Based (Trailing)") score -= 15;
    return Math.max(score, 35);
  };

  const score = getCompatibilityScore();

  return (
    <Card className="w-full border-border/60 bg-background/50 backdrop-blur-md shadow-xl">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
          <Scale className="h-4 w-4" />
          <span>TOOL 02 // RULE COMPARATOR</span>
        </div>
        <CardTitle className="text-xl font-bold font-sans">Prop Firm Match Evaluator</CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">SELECT PROP FIRM EVALUATION</label>
            <select
              value={selectedFirm}
              onChange={(event) => setSelectedFirm(event.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm font-mono"
            >
              {Object.entries(PROP_FIRMS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">YOUR TRADING STYLE</label>
            <select
              value={tradingStyle}
              onChange={(event) => setTradingStyle(event.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm font-mono"
            >
              <option value="scalp">Scalper (High Volume / Short Holds)</option>
              <option value="day">Day Trader (Intraday Holds)</option>
              <option value="swing">Swing Trader (Overnight / Weekend Holds)</option>
              <option value="news">News Trader (High Volatility Events)</option>
            </select>
          </div>
        </div>

        {/* Firm Spec Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-surface/50 rounded-lg border border-border/40">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block">Daily Max DD</span>
            <span className="text-lg font-bold font-mono text-foreground">{firm.maxDailyDD}</span>
          </div>
          <div className="p-3 bg-surface/50 rounded-lg border border-border/40">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block">Total Max DD</span>
            <span className="text-lg font-bold font-mono text-foreground">{firm.maxTotalDD}</span>
          </div>
          <div className="p-3 bg-surface/50 rounded-lg border border-border/40">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block">Profit Target</span>
            <span className="text-lg font-bold font-mono text-primary">{firm.profitTarget}</span>
          </div>
          <div className="p-3 bg-surface/50 rounded-lg border border-border/40">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block">DD Calculation</span>
            <span className="text-xs font-bold font-mono text-foreground truncate block">{firm.drawdownType}</span>
          </div>
        </div>

        {/* Dynamic Match Rating Banner */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-sans">Style Compatibility Score</h4>
              <p className="text-xs text-muted-foreground font-mono">Based on your trading behavior & firm rules</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold font-mono ${score >= 75 ? "text-emerald-500" : "text-amber-500"}`}>
              {score}%
            </span>
            <Badge variant={score >= 75 ? "default" : "secondary"} className="font-mono text-[10px]">
              {score >= 75 ? "HIGH MATCH" : "MODERATE RISKS"}
            </Badge>
          </div>
        </div>

        {/* Rule Highlights */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between p-2 rounded bg-surface border border-border/40">
            <span>News Trading Allowed</span>
            {firm.newsTrading ? (
              <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Yes</span>
            ) : (
              <span className="text-rose-500 flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5" /> Prohibited (2-min window)</span>
            )}
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-surface border border-border/40">
            <span>Weekend Holding Allowed</span>
            {firm.weekendHolding ? (
              <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Yes</span>
            ) : (
              <span className="text-rose-500 flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5" /> Close Friday 17:00 EST</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}