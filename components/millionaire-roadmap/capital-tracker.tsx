"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Plus,
  ShieldCheck,
  Trash2,
  TrendingUp,
} from "lucide-react";

interface PropAccount {
  id: string;
  firmName: string;
  allocation: number;
}

export function CapitalTracker() {
  const TARGET_CAPITAL = 1000000;

  const [accounts, setAccounts] = useState<PropAccount[]>([
    { id: "1", firmName: "FTMO", allocation: 50000 },
    { id: "2", firmName: "Funding Pips", allocation: 25000 },
  ]);

  const [newFirm, setNewFirm] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const totalAllocation = accounts.reduce((acc, curr) => acc + curr.allocation, 0);
  const progressPercent = Math.min(
    100,
    Number(((totalAllocation / TARGET_CAPITAL) * 100).toFixed(1))
  );

  // Dynamic Level Calculation
  const getTraderLevel = (total: number) => {
    if (total >= 500000) return { level: "05", title: "$1M+ OPERATOR", badge: "Institutional" };
    if (total >= 250000) return { level: "04", title: "CAPITAL BUILDER", badge: "Advanced" };
    if (total >= 100000) return { level: "03", title: "SCALER", badge: "Intermediate" };
    if (total >= 10000) return { level: "02", title: "FUNDED TRADER", badge: "Active" };
    return { level: "01", title: "FOUNDATION", badge: "Novice" };
  };

  const currentLevel = getTraderLevel(totalAllocation);

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirm || !newAmount) return;

    const numericAmount = parseFloat(newAmount.replace(/[^0-9.]/g, ""));
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    setAccounts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        firmName: newFirm,
        allocation: numericAmount,
      },
    ]);

    setNewFirm("");
    setNewAmount("");
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 border-t border-border/40 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <Badge
          variant="outline"
          className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400"
        >
          INTERACTIVE TOOL // CAPITAL TRACKER
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold font-sans">
          Simulate Your Capital Progression
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Track your active prop allocations to calculate your exact position on the roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Status & Progress Bar */}
        <Card className="lg:col-span-2 border-border/60 bg-card/80 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader className="border-b border-border/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase">
                  Current Allocation Status
                </p>
                <h3 className="text-2xl font-extrabold text-foreground font-mono mt-1">
                  ${totalAllocation.toLocaleString()}
                  <span className="text-xs font-normal text-muted-foreground font-sans ml-2">
                    / ${TARGET_CAPITAL.toLocaleString()} Target
                  </span>
                </h3>
              </div>

              {/* Trader Level Badge */}
              <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-xl">
                <Award className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-mono text-[10px] text-purple-600 dark:text-purple-400 uppercase font-bold">
                    LEVEL {currentLevel.level} — {currentLevel.badge}
                  </div>
                  <div className="text-xs font-bold font-sans text-foreground">
                    {currentLevel.title}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-muted-foreground">Progression to $1M+ Goal</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {progressPercent}%
                </span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/40">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Account List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground border-b border-border/40 pb-2">
                <span>ACTIVE ALLOCATED FIRMS</span>
                <span>AMOUNT ($)</span>
              </div>

              {accounts.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No active allocations added yet.
                </p>
              ) : (
                accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-background/50 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-purple-500" />
                      <span className="font-bold text-foreground font-sans">{acc.firmName}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        ${acc.allocation.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAccount(acc.id)}
                        className="text-muted-foreground hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Account & Next Action Card */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Add Allocation Form */}
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="p-4 border-b border-border/40">
              <CardTitle className="text-xs font-mono font-bold uppercase text-foreground">
                + Add Prop Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleAddAccount} className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[11px] font-mono text-muted-foreground">Firm Name</Label>
                  <Input
                    placeholder="e.g. FTMO, FundedNext"
                    value={newFirm}
                    onChange={(e) => setNewFirm(e.target.value)}
                    className="h-8 text-xs font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] font-mono text-muted-foreground">Allocation Amount ($)</Label>
                  <Input
                    placeholder="e.g. 50000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="h-8 text-xs font-mono"
                  />
                </div>
                <Button type="submit" className="w-full gap-1.5 h-8 bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs mt-2">
                  <Plus className="h-3.5 w-3.5" /> Add Capital Node
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Action Recommendation */}
          <Card className="border-purple-500/30 bg-purple-500/5">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                <TrendingUp className="h-4 w-4" /> WHAT TO DO NEXT
              </div>
              <p className="text-xs text-foreground font-medium">
                {totalAllocation < 10000
                  ? "Focus on mastering risk rules, position sizing, and logging 50+ trades in journal."
                  : totalAllocation < 100000
                  ? "Target your first payout split while strictly managing daily and total drawdown."
                  : "Diversify capital across multiple firms and scale allocation with account copiers."}
              </p>
              <Button variant="outline" className="w-full gap-2 text-xs font-mono border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10">
                Continue Roadmap <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}