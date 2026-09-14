"use client";

import { useState } from "react";
import { Calculator, ArrowUpRight, Percent, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Tools() {
  const [balance, setBalance] = useState("50000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [stopLossPips, setStopLossPips] = useState("20");

  const riskAmount = (parseFloat(balance) || 0) * ((parseFloat(riskPercent) || 0) / 100);
  const calculatedLotSize = stopLossPips ? (riskAmount / (parseFloat(stopLossPips) * 10)).toFixed(2) : "0.00";

  return (
    <section id="tools" className="py-20 sm:py-28 border-t border-border/40 relative z-10 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-3">
              Utility Hub
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
              Free tools for every funded trader.
            </p>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            No sign-up required. Access browser-based utilities designed specifically for prop firm evaluation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool 1: Interactive Position Sizer */}
          <Card className="p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Calculator className="h-4 w-4" />
                </div>
                <Badge variant="default">Interactive</Badge>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1 font-sans">
                Prop Firm Position Sizer
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Calculate precise lot sizes based on exact equity, risk percentage, and stop loss.
              </p>

              {/* Mini Interactive Calculator UI */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">Balance ($)</label>
                    <Input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">Risk (%)</label>
                    <Input
                      type="number"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-muted-foreground block mb-1">Stop Loss (Pips)</label>
                  <Input
                    type="number"
                    value={stopLossPips}
                    onChange={(e) => setStopLossPips(e.target.value)}
                  />
                </div>
                <div className="mt-3 p-2.5 rounded bg-primary/5 border border-primary/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">Suggested Lot Size:</span>
                  <span className="text-sm font-bold font-mono text-primary">{calculatedLotSize} Lots</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Tool 2 */}
          <Card className="p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-200 group cursor-pointer">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Percent className="h-4 w-4" />
                </div>
                <Badge variant="secondary">Calculator</Badge>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1 font-sans flex items-center gap-1.5 group-hover:text-primary transition-colors">
                Daily Max Drawdown Simulator
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Simulate equity swings to ensure your daily loss limits remain untouched under volatile conditions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60 text-[11px] font-mono text-primary flex items-center gap-1 font-medium">
              Launch simulator tool <ArrowUpRight className="h-3 w-3" />
            </div>
          </Card>

          {/* Tool 3 */}
          <Card className="p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-200 group cursor-pointer">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Scale className="h-4 w-4" />
                </div>
                <Badge variant="secondary">Database</Badge>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1 font-sans flex items-center gap-1.5 group-hover:text-primary transition-colors">
                Rule & Limit Comparator
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Side-by-side comparison of drawdown rules across top prop firms like FTMO, FundedNext, and 5%ers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60 text-[11px] font-mono text-primary flex items-center gap-1 font-medium">
              Compare firm rules <ArrowUpRight className="h-3 w-3" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}