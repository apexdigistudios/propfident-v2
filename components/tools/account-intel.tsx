"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldCheck,
  AlertTriangle,
  Plus,
  RefreshCw,
  Zap,
  CheckCircle2,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface TradingAccount {
  id: string;
  account_name: string;
  broker: string;
  account_type: string;
  initial_balance: number;
  current_balance: number;
  current_equity: number;
  max_daily_drawdown_pct: number;
  max_total_drawdown_pct: number;
  profit_target_pct: number;
  status: "active" | "breached" | "passed" | "paused";
}

interface EquityPoint {
  id: string;
  equity: number;
  balance: number;
  recorded_at: string;
}

interface AccountIntelProps {
  onChangeView?: (view: any) => void;
}

export function AccountIntel({ onChangeView }: AccountIntelProps) {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [equityHistory, setEquityHistory] = useState<EquityPoint[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    fetchIntelData();
  }, []);

  const fetchIntelData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // 1. Subscription status
      const { data: subData } = await supabase
        .from("user_subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      setIsSubscribed(!!subData);

      // 2. Fetch trading accounts
      const { data: accountData } = await supabase
        .from("trading_accounts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (accountData && accountData.length > 0) {
        setAccounts(accountData);
        const activeAcc = accountData[0];
        setSelectedAccountId(activeAcc.id);

        // 3. Fetch strictly recorded equity points for selected account
        const { data: historyData } = await supabase
          .from("account_equity_history")
          .select("id, equity, balance, recorded_at")
          .eq("account_id", activeAcc.id)
          .order("recorded_at", { ascending: true });

        if (historyData) {
          setEquityHistory(historyData);
        } else {
          setEquityHistory([]);
        }
      } else {
        setAccounts([]);
        setEquityHistory([]);
      }
    } catch (err) {
      console.error("Error fetching Account Intel data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch equity points when switching account dropdown
  const handleAccountChange = async (accountId: string) => {
    setSelectedAccountId(accountId);
    const { data: historyData } = await supabase
      .from("account_equity_history")
      .select("id, equity, balance, recorded_at")
      .eq("account_id", accountId)
      .order("recorded_at", { ascending: true });

    setEquityHistory(historyData || []);
  };

  const currentAccount = accounts.find((a) => a.id === selectedAccountId);

  // Metrics calculation
  const initialBalance = currentAccount?.initial_balance || 0;
  const currentBalance = currentAccount?.current_balance || 0;
  const currentEquity = currentAccount?.current_equity || 0;

  const totalPnl = currentBalance - initialBalance;
  const totalPnlPct = initialBalance > 0 ? (totalPnl / initialBalance) * 100 : 0;

  const maxDailyDDPct = currentAccount?.max_daily_drawdown_pct || 5;
  const maxTotalDDPct = currentAccount?.max_total_drawdown_pct || 10;
  const profitTargetPct = currentAccount?.profit_target_pct || 8;

  const targetAmount = initialBalance * (1 + profitTargetPct / 100);
  const profitProgress = initialBalance > 0 && totalPnl > 0
    ? Math.min(100, (totalPnl / (initialBalance * (profitTargetPct / 100))) * 100)
    : 0;

  const dailyDrawdownUsedPct = currentBalance < initialBalance && initialBalance > 0
    ? Math.min(100, ((initialBalance - currentBalance) / (initialBalance * (maxDailyDDPct / 100))) * 100)
    : 0;

  const totalDrawdownUsedPct = currentBalance < initialBalance && initialBalance > 0
    ? Math.min(100, ((initialBalance - currentBalance) / (initialBalance * (maxTotalDDPct / 100))) * 100)
    : 0;

  // Strict mapping from database query results
  const chartPoints = useMemo(() => {
    return equityHistory.map((pt) => Number(pt.equity));
  }, [equityHistory]);

  if (loading) {
    return <AccountIntelSkeleton />;
  }

  return (
    <div className="space-y-6 font-sans">
      {/* 1. SUBSCRIPTION & ACCOUNT CONNECT BANNER */}
      {(!isSubscribed || accounts.length === 0) && (
        <Card className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-950 border border-amber-500/30 p-5 md:p-6 text-white shadow-md">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="size-32 text-amber-400" />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10 relative">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] font-semibold">
                  {!isSubscribed ? "Subscription Required" : "No Account Linked"}
                </Badge>
              </div>
              <h3 className="text-base md:text-xl font-extrabold tracking-tight text-white">
                {!isSubscribed
                  ? "Subscribe to Propfident Shield for Automated Live Protection"
                  : "Connect your MetaTrader Account to sync live account performance"}
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 max-w-2xl font-medium">
                {!isSubscribed
                  ? "Unlock automated drawdown protection, live floating equity charts, and instant rule breach alerts."
                  : "Link your prop firm account credentials to sync live balance, equity, and rule boundaries directly."}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {accounts.length === 0 ? (
                <Button
                  size="sm"
                  className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs rounded-full px-5 h-9"
                  onClick={() => onChangeView && onChangeView("prop-match")}
                >
                  <Plus className="size-3.5 mr-1.5" /> Connect Account
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs rounded-full px-5 h-9"
                >
                  <Zap className="size-3.5 mr-1.5" /> Upgrade Subscription
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* 2. ACCOUNT SELECTOR & BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-100/80 dark:bg-zinc-900/80 p-3.5 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Building2 className="size-5 text-muted-foreground ml-1" />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wide">
              Active Monitored Account
            </span>
            {accounts.length > 0 ? (
              <select
                value={selectedAccountId || ""}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="bg-transparent text-sm font-bold text-foreground focus:outline-none cursor-pointer"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-background text-foreground">
                    {acc.account_name} ({acc.broker} - ${acc.initial_balance.toLocaleString()})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-xs font-bold text-muted-foreground">No accounts connected</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Badge
            variant={currentAccount?.status === "active" ? "default" : "secondary"}
            className="text-[10px] font-bold rounded-full px-2.5 py-0.5"
          >
            {currentAccount?.status ? currentAccount.status.toUpperCase() : "UNLINKED"}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchIntelData}
            className="size-8 rounded-full"
            title="Refresh Intel"
          >
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* 3. METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance */}
        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Current Balance
            </span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-foreground">
              <DollarSign className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight">
              ${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium">
              {totalPnl >= 0 ? (
                <span className="text-emerald-500 font-bold flex items-center">
                  <ArrowUpRight className="size-3.5 mr-0.5" />+${totalPnl.toFixed(2)} (+{totalPnlPct.toFixed(2)}%)
                </span>
              ) : (
                <span className="text-rose-500 font-bold flex items-center">
                  <ArrowDownRight className="size-3.5 mr-0.5" />-${Math.abs(totalPnl).toFixed(2)} ({totalPnlPct.toFixed(2)}%)
                </span>
              )}
              <span className="text-muted-foreground">vs starting</span>
            </div>
          </div>
        </Card>

        {/* Equity */}
        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Current Equity
            </span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-foreground">
              <Activity className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight">
              ${currentEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-1">
              Floating P&L: ${(currentEquity - currentBalance).toFixed(2)}
            </p>
          </div>
        </Card>

        {/* Daily DD */}
        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Daily DD Used
            </span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-amber-500">
              <AlertTriangle className="size-4" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>{dailyDrawdownUsedPct.toFixed(1)}%</span>
              <span className="text-muted-foreground">Limit: {maxDailyDDPct}%</span>
            </div>
            <Progress value={dailyDrawdownUsedPct} className="h-2" />
          </div>
        </Card>

        {/* Total DD */}
        <Card className="p-4 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Max DD Buffer
            </span>
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-emerald-500">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>{(100 - totalDrawdownUsedPct).toFixed(1)}% safe</span>
              <span className="text-muted-foreground">Max DD: {maxTotalDDPct}%</span>
            </div>
            <Progress value={totalDrawdownUsedPct} className="h-2" />
          </div>
        </Card>
      </div>

      {/* 4. LOWER SECTION: PROFIT TARGET & LIVE EQUITY CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profit Target Progress */}
        <Card className="lg:col-span-1 p-5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-wide">
              Target Evaluation
            </span>
            <h4 className="text-lg font-extrabold tracking-tight">Account Growth Goal</h4>
          </div>

          <div className="space-y-3 my-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Profit Target ({profitTargetPct}%)</span>
              <span className="font-bold">${targetAmount.toLocaleString()}</span>
            </div>
            <Progress value={profitProgress} className="h-2.5" />
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-bold text-emerald-500">{profitProgress.toFixed(1)}%</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-200/60 dark:bg-zinc-800/60 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span>Risk Shield Boundary</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
              Keep peak daily drawdown below {maxDailyDDPct}% to maintain evaluation status and compliance.
            </p>
          </div>
        </Card>

        {/* Strictly Supabase-Backed Live Equity Curve */}
        <Card className="lg:col-span-2 p-5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-extrabold tracking-tight">Live Equity Curve</h4>
              <p className="text-xs text-muted-foreground font-medium">Real-time snapshots from account equity history</p>
            </div>
            <Badge variant="outline" className="text-[10px] font-bold rounded-full px-3 py-1">
              Database Sync
            </Badge>
          </div>

          <div className="w-full pt-2">
            {chartPoints.length > 0 ? (
              <EquityLineChart data={chartPoints} />
            ) : (
              <div className="h-44 sm:h-52 w-full flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-zinc-800 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/50 p-6 text-center">
                <Activity className="size-8 text-muted-foreground/40 mb-2" />
                <p className="text-xs font-semibold text-muted-foreground">
                  No equity history snapshots recorded yet
                </p>
                <p className="text-[11px] text-muted-foreground/70 max-w-xs mt-1">
                  Equity datapoints will chart here automatically as MetaApi or account updates stream into Supabase.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium pt-2 border-t border-slate-200/60 dark:border-zinc-800/60">
            <span>Points Recorded: {chartPoints.length}</span>
            {chartPoints.length > 0 && (
              <span className="font-bold text-foreground">
                Latest Equity: ${chartPoints[chartPoints.length - 1].toLocaleString()}
              </span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

{/* SVG Equity Line Chart Component */}
function EquityLineChart({ data }: { data: number[] }) {
  if (!data || data.length === 0) return null;

  if (data.length === 1) {
    return (
      <div className="h-44 sm:h-52 w-full flex flex-col items-center justify-center border border-slate-200 dark:border-zinc-800 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/50 p-4">
        <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Single Equity Snapshot</span>
        <span className="text-2xl font-extrabold text-foreground mt-1">${data[0].toLocaleString()}</span>
        <span className="text-[11px] text-muted-foreground mt-1">Awaiting additional data points to render curve</span>
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const width = 600;
  const height = 180;
  const padding = 12;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const pathD = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ""
  );

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const isPositive = data[data.length - 1] >= data[0];
  const strokeColor = isPositive ? "#10b981" : "#f43f5e";

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 sm:h-52 overflow-visible">
        <defs>
          <linearGradient id="equityGradientStrict" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <line x1="0" y1={height / 3} x2={width} y2={height / 3} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="4 4" />
        <line x1="0" y1={(height * 2) / 3} x2={width} y2={(height * 2) / 3} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="4 4" />

        <path d={areaD} fill="url(#equityGradientStrict)" />
        <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.x}
            cy={pt.y}
            r={idx === points.length - 1 ? "4" : "2.5"}
            fill={strokeColor}
          />
        ))}
      </svg>
    </div>
  );
}

function AccountIntelSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-28 w-full rounded-3xl" />
      <Skeleton className="h-12 w-full rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 lg:col-span-2 rounded-3xl" />
      </div>
    </div>
  );
}