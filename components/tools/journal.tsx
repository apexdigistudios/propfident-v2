"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Building2,
  RefreshCw,
  Search,
  ArrowUp,
  ArrowDown,
  CandlestickChart,
  X,
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

export interface JournalTradeRecord {
  id: string;
  account_id: string;
  pair: string;
  trade_type: "LONG" | "SHORT";
  status: "OPEN" | "CLOSED" | "CANCELLED";
  profit_loss: number;
  start_date: string;
  end_date?: string;
  execution_type: "MARKET" | "LIMIT" | "STOP";
  entry_price: number;
  stop_loss?: number;
  take_profit?: number;
  emotion_tag: string;
  emotion_emoji: string;
  notes?: string;
}

interface JournalProps {
  onChangeView?: (view: any) => void;
}

export function TradingJournal({ onChangeView }: JournalProps) {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [trades, setTrades] = useState<JournalTradeRecord[]>([]);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "LONG" | "SHORT">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  
  // Selected trade for inspection panel
  const [selectedTrade, setSelectedTrade] = useState<JournalTradeRecord | null>(null);

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

      // 1. Fetch user accounts
      const { data: accountData } = await supabase
        .from("trading_accounts")
        .select("id, account_name, broker, initial_balance")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (accountData && accountData.length > 0) {
        setAccounts(accountData);
        const activeAccId = accountData[0].id;
        setSelectedAccountId(activeAccId);

        // 2. Fetch MT5 trade records from Supabase
        await fetchTrades(activeAccId);
      } else {
        setAccounts([]);
        setTrades([]);
      }
    } catch (err) {
      console.error("Error loading journal records:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrades = async (accountId: string) => {
    const { data: tradeData } = await supabase
      .from("journal_trades")
      .select("*")
      .eq("account_id", accountId)
      .order("start_date", { ascending: false });

    if (tradeData) {
      setTrades(tradeData);
    } else {
      setTrades([]);
    }
  };

  const handleAccountSelect = async (accId: string) => {
    setSelectedAccountId(accId);
    await fetchTrades(accId);
  };

  // Filtered dataset
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const matchesSearch =
        trade.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.emotion_tag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "ALL" || trade.trade_type === typeFilter;
      const matchesStatus = statusFilter === "ALL" || trade.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [trades, searchQuery, typeFilter, statusFilter]);

  if (loading) {
    return <JournalSkeleton />;
  }

  return (
    <div className="space-y-4 font-sans text-foreground">
      {/* 1. TOP CONTROL BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-100/90 dark:bg-zinc-900/90 p-3 md:p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        
        {/* Account Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-xl bg-slate-200 dark:bg-zinc-800 text-foreground shrink-0">
            <Building2 className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
              Connected MT5 Account
            </span>
            {accounts.length > 0 ? (
              <select
                value={selectedAccountId || ""}
                onChange={(e) => handleAccountSelect(e.target.value)}
                className="bg-transparent text-xs md:text-sm font-extrabold text-foreground focus:outline-none cursor-pointer"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-background text-foreground">
                    {acc.account_name} ({acc.broker})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-xs font-bold text-muted-foreground">No accounts synced</span>
            )}
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter pair or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-background border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            />
          </div>

          {/* Long / Short Filter */}
          <div className="flex items-center bg-background border border-slate-200 dark:border-zinc-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTypeFilter("ALL")}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                typeFilter === "ALL" ? "bg-slate-200 dark:bg-zinc-800 text-foreground font-bold" : "text-muted-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter("LONG")}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                typeFilter === "LONG" ? "bg-emerald-500/20 text-emerald-500 font-bold" : "text-muted-foreground"
              }`}
            >
              Long
            </button>
            <button
              onClick={() => setTypeFilter("SHORT")}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                typeFilter === "SHORT" ? "bg-rose-500/20 text-rose-500 font-bold" : "text-muted-foreground"
              }`}
            >
              Short
            </button>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={fetchJournalData}
            className="size-8 rounded-xl shrink-0"
            title="Refresh MT5 Logs"
          >
            <RefreshCw className="size-3.5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* 2. JOURNAL DATA TABLE CONTAINER */}
      <Card className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-100/60 dark:bg-zinc-900/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-200/50 dark:bg-zinc-800/50 text-muted-foreground font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Pair</th>
                <th className="py-3.5 px-4">Start Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Trade Type</th>
                <th className="py-3.5 px-4">Profit/Loss</th>
                <th className="py-3.5 px-4">End Date</th>
                <th className="py-3.5 px-4">Execution Type</th>
                <th className="py-3.5 px-4">Entry Price</th>
                <th className="py-3.5 px-4">Stop Loss</th>
                <th className="py-3.5 px-4">Take Profit</th>
                <th className="py-3.5 px-4 text-right">Tags & Emotion</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/60 dark:divide-zinc-800/60 font-medium">
              {filteredTrades.length > 0 ? (
                filteredTrades.map((trade) => {
                  const isLong = trade.trade_type === "LONG";
                  const isProfit = trade.profit_loss >= 0;

                  return (
                    <tr
                      key={trade.id}
                      onClick={() => setSelectedTrade(trade)}
                      className="hover:bg-slate-200/40 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                    >
                      {/* Pair with Direction Icon & Candlestick Accent */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`size-7 rounded-full flex items-center justify-center shrink-0 text-white font-extrabold ${
                              isLong ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          >
                            {isLong ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CandlestickChart className="size-4 text-muted-foreground/60" />
                            <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm">
                              {trade.pair}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap font-mono">
                        {new Date(trade.start_date).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            trade.status === "OPEN"
                              ? "border-amber-500/40 text-amber-500 bg-amber-500/10"
                              : "border-slate-300 dark:border-zinc-700 text-muted-foreground"
                          }`}
                        >
                          {trade.status}
                        </Badge>
                      </td>

                      {/* Trade Type */}
                      <td className="py-3 px-4">
                        <span
                          className={`font-extrabold text-[11px] ${
                            isLong ? "text-emerald-500" : "text-rose-500"
                          }`}
                        >
                          {trade.trade_type}
                        </span>
                      </td>

                      {/* Profit/Loss */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`font-extrabold text-xs px-2 py-1 rounded-lg ${
                            isProfit
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                              : "text-rose-600 dark:text-rose-400 bg-rose-500/10"
                          }`}
                        >
                          {isProfit ? `+$${trade.profit_loss.toFixed(2)}` : `-$${Math.abs(trade.profit_loss).toFixed(2)}`}
                        </span>
                      </td>

                      {/* End Date */}
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap font-mono">
                        {trade.end_date
                          ? new Date(trade.end_date).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                          : "—"}
                      </td>

                      {/* Execution Type */}
                      <td className="py-3 px-4 text-muted-foreground font-semibold">
                        {trade.execution_type}
                      </td>

                      {/* Entry Price */}
                      <td className="py-3 px-4 font-mono font-bold text-foreground">
                        {trade.entry_price}
                      </td>

                      {/* Stop Loss */}
                      <td className="py-3 px-4 font-mono text-rose-500 font-semibold">
                        {trade.stop_loss ? trade.stop_loss : "—"}
                      </td>

                      {/* Take Profit */}
                      <td className="py-3 px-4 font-mono text-emerald-500 font-semibold">
                        {trade.take_profit ? trade.take_profit : "—"}
                      </td>

                      {/* Emotion Tags */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Badge
                          variant="secondary"
                          className="bg-slate-200/80 dark:bg-zinc-800 text-foreground border-none font-bold text-[11px] px-2.5 py-1 rounded-xl"
                        >
                          {trade.emotion_emoji} {trade.emotion_tag}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Empty state matching user reference image */
                <tr>
                  <td colSpan={11} className="py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-sm font-semibold">No results</p>
                      <p className="text-xs text-muted-foreground/70 max-w-sm">
                        Trades taken on your connected MT5 terminal will automatically sync and populate in this log.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 3. TRADE INSPECTOR MODAL / SLIDE-OUT PANEL */}
      {selectedTrade && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedTrade(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 text-muted-foreground transition-colors"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`size-10 rounded-2xl flex items-center justify-center text-white font-extrabold ${
                  selectedTrade.trade_type === "LONG" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {selectedTrade.trade_type === "LONG" ? <ArrowUp className="size-5" /> : <ArrowDown className="size-5" />}
              </div>
              <div>
                <h3 className="text-lg font-extrabold">{selectedTrade.pair} Execution Log</h3>
                <p className="text-xs text-muted-foreground">Automated Analysis & Execution Audit</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Trade Type</span>
                <p className="text-sm font-extrabold text-foreground">{selectedTrade.trade_type}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Net P&L</span>
                <p
                  className={`text-sm font-extrabold ${
                    selectedTrade.profit_loss >= 0 ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  ${selectedTrade.profit_loss.toFixed(2)}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Entry Price</span>
                <p className="text-sm font-bold font-mono text-foreground">{selectedTrade.entry_price}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Execution Type</span>
                <p className="text-sm font-bold text-foreground">{selectedTrade.execution_type}</p>
              </div>
            </div>

            {/* Automated Emotion Tagging Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-500">
                <span className="text-base">{selectedTrade.emotion_emoji}</span>
                <span>Emotion Tag: {selectedTrade.emotion_tag}</span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                {selectedTrade.notes ||
                  "Trade parameters and stop discipline matched automated setup rules upon execution."}
              </p>
            </div>

            <Button
              onClick={() => setSelectedTrade(null)}
              className="w-full rounded-2xl font-bold bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-foreground border-none"
            >
              Close Record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function JournalSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-14 w-full rounded-2xl" />
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}