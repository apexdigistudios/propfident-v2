"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  BookOpen,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
  RefreshCw,
  Building2,
  PieChart,
  BarChart3,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  Zap,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface TradingAccount {
  id: string;
  account_name: string;
  broker: string;
  initial_balance: number;
}

export interface TradeLog {
  id: string;
  account_id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entry_price: number;
  exit_price?: number;
  lot_size: number;
  pnl: number;
  pnl_pct: number;
  setup_type: string;
  emotion: string;
  emotion_emoji: string;
  ai_notes: string;
  status: "OPEN" | "CLOSED";
  executed_at: string;
}

interface JournalProps {
  onChangeView?: (view: any) => void;
}

export function TradingJournal({ onChangeView }: JournalProps) {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [trades, setTrades] = useState<TradeLog[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const [filterDirection, setFilterDirection] = useState<"ALL" | "LONG" | "SHORT">("ALL");

  useEffect(() => {
    fetchJournalData();
  }, []);

  const fetchJournalData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // 1. Fetch user trading accounts
      const { data: accountData } = await supabase
        .from("trading_accounts")
        .select("id, account_name, broker, initial_balance")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (accountData && accountData.length > 0) {
        setAccounts(accountData);
        const activeAccId = accountData[0].id;
        setSelectedAccountId(activeAccId);

        // 2. Fetch MT5 live trade logs for active account
        await fetchTradesForAccount(activeAccId);
      } else {
        setAccounts([]);
        setTrades([]);
      }
    } catch (err) {
      console.error("Error fetching Journal data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTradesForAccount = async (accountId: string) => {
    const { data: tradeData } = await supabase
      .from("journal_trades")
      .select("*")
      .eq("account_id", accountId)
      .order("executed_at", { ascending: false });

    if (tradeData && tradeData.length > 0) {
      setTrades(tradeData);
      setSelectedTrade(tradeData[0]);
    } else {
      setTrades([]);
      setSelectedTrade(null);
    }
  };

  const handleAccountChange = async (accId: string) => {
    setSelectedAccountId(accId);
    await fetchTradesForAccount(accId);
  };

  // Filtered trades based on Long/Short selection
  const filteredTrades = useMemo(() => {
    if (filterDirection === "ALL") return trades;
    return trades.filter((t) => t.direction === filterDirection);
  }, [trades, filterDirection]);

  // Calculated Metrics
  const totalTrades = trades.length;
  const winningTrades = trades.filter((t) => t.pnl > 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalPnl = trades.reduce((acc, t) => acc + (Number(t.pnl) || 0), 0);

  const disciplinedCount = trades.filter((t) =>
    ["Disciplined", "Calm", "Target Met", "Focused"].includes(t.emotion)
  ).length;
  const disciplinedPct = totalTrades > 0 ? (disciplinedCount / totalTrades) * 100 : 0;

  if (loading) {
    return <JournalSkeleton />;
  }

  return (
    <div className="space-y-6 font-sans">
      {/* 1. HEADER & ACCOUNT SELECTOR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-100/80 dark:bg-zinc-900/80 p-3.5 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Building2 className="size-5 text-muted-foreground ml-1" />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wide">
              Active Trading Journal
            </span>
            {accounts.length > 0 ? (
              <select
                value={selectedAccountId || ""}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="bg-transparent text-sm font-bold text-foreground focus:outline-none cursor-pointer"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-background text-foreground">
                    {acc.account_name} ({acc.broker})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-xs font-bold text-muted-foreground">No account linked</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Badge variant="outline" className="text-[10px] font-bold rounded-full px-3 py-1">
            MT5 Auto-Sync Active
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchJournalData}
            className="size-8 rounded-full"
            title="Sync MT5 Trades"
          >
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. PSYCHOLOGICAL & STATISTICAL METRICS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Total P&L</span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-foreground">
              <DollarSign className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold tracking-tight">
            ${totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-muted-foreground font-medium">From {totalTrades} synced trades</div>
        </Card>

        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Win Rate</span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-emerald-500">
              <Target className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold tracking-tight">{winRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground font-medium">{winningTrades} Wins / {totalTrades - winningTrades} Losses</div>
        </Card>

        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">AI Discipline Index</span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-amber-500">
              <Brain className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold tracking-tight">{disciplinedPct.toFixed(0)}%</div>
          <div className="text-xs text-muted-foreground font-medium">Trades aligned with plan</div>
        </Card>

        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">AI Engine</span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-indigo-400">
              <Sparkles className="size-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-foreground">Auto-Emotion Tagging</div>
          <div className="text-xs text-muted-foreground font-medium">Analyzes MT5 execution speed & stops</div>
        </Card>
      </div>

      {/* 3. MAIN JOURNAL BOOK LAYOUT (LEFT: LIVE TRADES FEED, RIGHT: CHART & AI ANALYSIS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT BOOK PAGE: LIVE TRADE LISTING */}
        <Card className="lg:col-span-5 p-5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-amber-500" />
                <h3 className="text-base font-extrabold tracking-tight">Trade Logs</h3>
              </div>

              {/* Long / Short Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-zinc-800/70 p-1 rounded-xl text-[11px] font-bold">
                <button
                  onClick={() => setFilterDirection("ALL")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterDirection === "ALL" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterDirection("LONG")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterDirection === "LONG" ? "bg-emerald-500/20 text-emerald-400 font-extrabold" : "text-muted-foreground"
                  }`}
                >
                  Longs
                </button>
                <button
                  onClick={() => setFilterDirection("SHORT")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterDirection === "SHORT" ? "bg-rose-500/20 text-rose-400 font-extrabold" : "text-muted-foreground"
                  }`}
                >
                  Shorts
                </button>
              </div>
            </div>

            {/* Trades List */}
            <div className="mt-4 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredTrades.length > 0 ? (
                filteredTrades.map((trade) => {
                  const isLong = trade.direction === "LONG";
                  const isProfit = trade.pnl >= 0;

                  return (
                    <div
                      key={trade.id}
                      onClick={() => setSelectedTrade(trade)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedTrade?.id === trade.id
                          ? "border-amber-500/80 bg-amber-500/10 shadow-sm"
                          : "border-slate-200/80 dark:border-zinc-800/80 bg-background/60 hover:bg-background"
                      }`}
                    >
                      {/* Left Side: Direction Indicator + Symbol + Emotion Tag */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isLong ? "bg-emerald-500/15 text-emerald-500" : "bg-rose-500/15 text-rose-500"
                          }`}
                        >
                          {isLong ? <ArrowUpRight className="size-5" /> : <ArrowDownRight className="size-5" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-foreground">{trade.symbol}</span>
                            <Badge
                              variant="outline"
                              className={`text-[9px] px-1.5 py-0 font-bold ${
                                isLong ? "border-emerald-500/40 text-emerald-500" : "border-rose-500/40 text-rose-500"
                              }`}
                            >
                              {trade.direction}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {trade.lot_size} Lots
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-slate-200/80 dark:bg-zinc-800 text-foreground border-none text-[10px] font-semibold py-0.5">
                              {trade.emotion_emoji} {trade.emotion}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{trade.setup_type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: P&L */}
                      <div className="text-right">
                        <div className={`text-sm font-extrabold ${isProfit ? "text-emerald-500" : "text-rose-500"}`}>
                          {isProfit ? `+$${trade.pnl.toFixed(2)}` : `-$${Math.abs(trade.pnl).toFixed(2)}`}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium">
                          {new Date(trade.executed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-muted-foreground space-y-2">
                  <Activity className="size-8 mx-auto opacity-40" />
                  <p className="text-xs font-bold">No MT5 trades recorded yet</p>
                  <p className="text-[11px] max-w-xs mx-auto">
                    When you take a position on MT5, the connected AI will tag your emotions and display the trade here live.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* RIGHT BOOK PAGE: TRADE CHART PREVIEW & AI EMOTIONAL BREAKDOWN */}
        <Card className="lg:col-span-7 p-5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm space-y-5 flex flex-col justify-between">
          {selectedTrade ? (
            <>
              {/* Selected Trade Overview */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedTrade.emotion_emoji}</span>
                    <div>
                      <h4 className="text-base font-extrabold tracking-tight">
                        {selectedTrade.symbol} Execution Analysis
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium">
                        Executed via MT5 • {new Date(selectedTrade.executed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Badge
                    className={`text-xs font-bold px-3 py-1 ${
                      selectedTrade.direction === "LONG"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                    }`}
                  >
                    {selectedTrade.direction} POSITION
                  </Badge>
                </div>

                {/* Price Execution Visualizer */}
                <div className="mt-4 p-4 rounded-2xl bg-background/80 border border-slate-200/80 dark:border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Entry: ${selectedTrade.entry_price}</span>
                    <span>
                      Exit: {selectedTrade.exit_price ? `$${selectedTrade.exit_price}` : "Active Position"}
                    </span>
                  </div>

                  {/* SVG Price Trail Mock Component */}
                  <div className="w-full h-28 flex items-center justify-center relative overflow-hidden rounded-xl bg-slate-900/5 dark:bg-zinc-950/50 p-2">
                    <svg viewBox="0 0 400 80" className="w-full h-full">
                      <path
                        d="M 10 50 Q 100 20, 200 60 T 390 30"
                        fill="none"
                        stroke={selectedTrade.pnl >= 0 ? "#10b981" : "#f43f5e"}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="50" r="5" fill="#3b82f6" />
                      <circle cx="390" cy="30" r="5" fill={selectedTrade.pnl >= 0 ? "#10b981" : "#f43f5e"} />
                    </svg>
                  </div>
                </div>

                {/* AI Emotion & Behavioral Analysis Card */}
                <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-amber-500 text-xs">
                    <Brain className="size-4" />
                    <span>AI Psychological Assessment</span>
                  </div>
                  <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                    {selectedTrade.ai_notes ||
                      `AI detected a state of ${selectedTrade.emotion} during this ${selectedTrade.direction} entry. Execution was aligned with the ${selectedTrade.setup_type} setup guidelines.`}
                  </p>
                </div>
              </div>

              {/* Bottom Analytics Breakdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200/80 dark:border-zinc-800/80">
                <div className="p-3.5 rounded-2xl bg-background/60 border border-slate-200/80 dark:border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <PieChart className="size-3.5" />
                    <span>Setup Type</span>
                  </div>
                  <div className="text-sm font-extrabold text-foreground">{selectedTrade.setup_type}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-background/60 border border-slate-200/80 dark:border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <BarChart3 className="size-3.5" />
                    <span>Net Result</span>
                  </div>
                  <div
                    className={`text-sm font-extrabold ${
                      selectedTrade.pnl >= 0 ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {selectedTrade.pnl >= 0 ? `+$${selectedTrade.pnl}` : `-$${Math.abs(selectedTrade.pnl)}`}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 text-muted-foreground space-y-2">
              <BookOpen className="size-10 opacity-30" />
              <p className="text-sm font-bold">Select a trade log to view AI analysis</p>
              <p className="text-xs max-w-xs">
                Click any trade on the left page to inspect the entry/exit visualization, AI emotion tags, and trade notes.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function JournalSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Skeleton className="lg:col-span-5 h-[500px] rounded-3xl" />
        <Skeleton className="lg:col-span-7 h-[500px] rounded-3xl" />
      </div>
    </div>
  );
}