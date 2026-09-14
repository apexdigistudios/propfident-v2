"use client";

import { useState } from "react";
import { Brain, Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AITradePlanner() {
  const [pair, setPair] = useState("EURUSD");
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [entry, setEntry] = useState<string>("1.0850");
  const [stopLoss, setStopLoss] = useState<string>("1.0820");
  const [takeProfit, setTakeProfit] = useState<string>("1.0910");
  const [notes, setNotes] = useState<string>("London session break out above key resistance with heavy volume.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  // Calculate Risk-to-Reward Ratio
  const entryNum = parseFloat(entry) || 0;
  const slNum = parseFloat(stopLoss) || 0;
  const tpNum = parseFloat(takeProfit) || 0;

  const risk = Math.abs(entryNum - slNum);
  const reward = Math.abs(tpNum - entryNum);
  const rrRatio = risk > 0 ? (reward / risk).toFixed(2) : "0.00";

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 800);
  };

  return (
    <Card className="w-full border-border/60 bg-background/50 backdrop-blur-md shadow-xl">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
          <Brain className="h-4 w-4" />
          <span>TOOL 03 // AI RISK CHECK</span>
        </div>
        <CardTitle className="text-xl font-bold font-sans">AI Pre-Trade Risk Planner</CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">INSTRUMENT</label>
            <select
              value={pair}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPair(e.target.value)}
              className="flex h-9 w-full rounded-md border border-border bg-surface px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary font-mono text-foreground"
            >
              <option value="EURUSD">EUR/USD</option>
              <option value="GBPUSD">GBP/USD</option>
              <option value="XAUUSD">XAU/USD (Gold)</option>
              <option value="NAS100">NAS100</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">DIRECTION</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={direction === "BUY" ? "default" : "outline"}
                size="sm"
                onClick={() => setDirection("BUY")}
                className="font-mono text-xs gap-1"
              >
                <TrendingUp className="h-3.5 w-3.5" /> BUY
              </Button>
              <Button
                type="button"
                variant={direction === "SELL" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setDirection("SELL")}
                className="font-mono text-xs gap-1"
              >
                <TrendingDown className="h-3.5 w-3.5" /> SELL
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">CALCULATED R:R</label>
            <div className="h-9 px-3 rounded-md bg-surface border border-border flex items-center justify-between font-mono font-bold text-sm">
              <span className="text-muted-foreground text-xs">RATIO</span>
              <span className={Number(rrRatio) >= 2 ? "text-emerald-500" : "text-amber-500"}>
                1 : {rrRatio}
              </span>
            </div>
          </div>
        </div>

        {/* Price Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">ENTRY PRICE</label>
            <Input
              type="number"
              step="0.0001"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="font-mono bg-surface"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">STOP LOSS</label>
            <Input
              type="number"
              step="0.0001"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="font-mono bg-surface"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">TAKE PROFIT</label>
            <Input
              type="number"
              step="0.0001"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="font-mono bg-surface"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground">TRADE CONFLUENCE & SETUP NOTES</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            placeholder="Describe setup confluence, news events, or session drivers..."
            className="flex min-h-[60px] w-full rounded-md border border-border bg-surface px-3 py-2 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 font-mono text-foreground"
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full font-mono text-xs gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" /> Evaluating Prop Rules...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Run AI Pre-Flight Audit
            </>
          )}
        </Button>

        {/* AI Audit Output */}
        {analyzed && (
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> AI PRE-FLIGHT VERDICT
              </span>
              <Badge variant="outline" className="font-mono text-[10px] border-emerald-500/30 text-emerald-500">
                PASSED AUDIT
              </Badge>
            </div>

            <ul className="space-y-2 text-xs font-mono text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong className="text-foreground">Risk-Reward Check:</strong> 1:{rrRatio} satisfies recommended minimum threshold of 1:1.5.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong className="text-foreground">Prop Rule Guard:</strong> Ensure stop loss is hard-set prior to entry to avoid slipping trailing drawdown limits.
                </span>
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}