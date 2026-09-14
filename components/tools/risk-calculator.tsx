"use client";

import { useState } from "react";
import { Calculator, DollarSign, Percent, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAIR_SPECS: Record<string, { pipValue: number; contractSize: number }> = {
  EURUSD: { pipValue: 10, contractSize: 100000 },
  GBPUSD: { pipValue: 10, contractSize: 100000 },
  USDJPY: { pipValue: 6.7, contractSize: 100000 },
  XAUUSD: { pipValue: 10, contractSize: 100 }, // Gold ($1 per 0.1 move = $10/lot)
  BTCUSD: { pipValue: 1, contractSize: 1 },
};

export function RiskLotCalculator() {
  const [balance, setBalance] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<number>(15);
  const [pair, setPair] = useState<string>("EURUSD");

  const riskAmount = (balance * riskPercent) / 100;
  const pairSpec = PAIR_SPECS[pair] || PAIR_SPECS.EURUSD;
  const calculatedLotSize = stopLossPips > 0 ? (riskAmount / (stopLossPips * pairSpec.pipValue)) : 0;

  return (
    <Card className="w-full border-border/60 bg-background/50 backdrop-blur-md shadow-xl">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
          <Calculator className="h-4 w-4" />
          <span>TOOL 01 // POSITION SIZER</span>
        </div>
        <CardTitle className="text-xl font-bold font-sans">Risk & Lot Size Calculator</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">ACCOUNT BALANCE ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="pl-9 font-mono bg-surface"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">RISK PERCENTAGE (%)</label>
            <div className="relative">
              <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                step="0.1"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="pl-9 font-mono bg-surface"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">STOP LOSS (PIPS / POINTS)</label>
            <Input
              type="number"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(Number(e.target.value))}
              className="font-mono bg-surface"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground">ASSET / PAIR</label>
            <select
              value={pair}
              onChange={(e) => setPair(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm font-mono ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="EURUSD">EUR/USD</option>
              <option value="GBPUSD">GBP/USD</option>
              <option value="USDJPY">USD/JPY</option>
              <option value="XAUUSD">XAU/USD (Gold)</option>
              <option value="BTCUSD">BTC/USD</option>
            </select>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex gap-2">
          {[0.5, 1, 1.5, 2].map((pct) => (
            <Button
              key={pct}
              type="button"
              variant={riskPercent === pct ? "default" : "outline"}
              size="sm"
              onClick={() => setRiskPercent(pct)}
              className="font-mono text-xs flex-1"
            >
              {pct}% Risk
            </Button>
          ))}
        </div>

        {/* Outputs Display */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40 bg-surface/50 p-4 rounded-lg border">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">Max Cash Risk</span>
            <span className="text-2xl font-bold font-mono text-foreground">${riskAmount.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">Recommended Position</span>
            <span className="text-2xl font-bold font-mono text-primary">
              {calculatedLotSize.toFixed(2)} <span className="text-xs text-muted-foreground font-sans">Lots</span>
            </span>
          </div>
        </div>

        {riskPercent > 2 && (
          <div className="flex items-center gap-2 p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>High Risk Warning: Most prop firms flag accounts risking over 2% per trade.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}