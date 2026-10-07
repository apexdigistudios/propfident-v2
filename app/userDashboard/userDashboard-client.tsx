"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  MonitorCog, 
  BookOpen, 
  Calculator, 
  Building2, 
  Map, 
  Newspaper, 
  Lightbulb, 
  ChevronRight,
  ShieldCheck,
  Wallet,
  ArrowLeft
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskLotCalculator } from "@/components/tools/risk-calculator";
import { PropMatchEvaluator } from "@/components/tools/prop-match";
import { TradePlanner } from "@/components/tools/ai-trade-planner";
import { AccountIntel } from "@/components/tools/account-intel";

export const dynamic = "force-dynamic";

type ViewType = 
  | "overview"
  | "account-intel"
  | "journal"
  | "lot-calculator"
  | "prop-match"
  | "trade-assist"
  | "roadmap"
  | "market-news"
  | "trade-ideas";

interface UserProfile {
  name: string;
  email: string;
}

interface ActiveAccount {
  account_name: string;
  account_type: string;
}

function UserpaneContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const activeView = (searchParams.get("view") as ViewType) || "overview";

  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeAccount, setActiveAccount] = useState<ActiveAccount | null>(null);

  const changeView = (view: ViewType) => {
    if (view === "overview") {
      router.push("/userDashboard");
    } else {
      router.push(`/userDashboard?view=${view}`);
    }
  };

  useEffect(() => {
    if (activeView !== "overview") {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeView]);

  useEffect(() => {
    async function loadData() {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        setUser({
          name: authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Trader",
          email: authUser.email || "",
        });

        const { data: accounts } = await supabase
          .from("trading_accounts")
          .select("account_name, account_type")
          .eq("user_id", authUser.id)
          .limit(1);

        if (accounts && accounts.length > 0) {
          setActiveAccount(accounts[0]);
        }
      }

      setTimeout(() => {
        setLoading(false);
      }, 400);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <OverviewSkeleton />;
  }

  if (activeView !== "overview") {
    return (
      <ViewWrapper activeView={activeView} onBack={() => changeView("overview")}>
        {isTransitioning ? (
          <SectionSkeletonView activeView={activeView} />
        ) : activeView === "account-intel" ? (
          <AccountIntel onChangeView={changeView} />
        ) : activeView === "lot-calculator" ? (
          <RiskLotCalculator />
        ) : activeView === "prop-match" ? (
          <PropMatchEvaluator />
        ) : activeView === "trade-assist" ? (
          <TradePlanner />
        ) : (
          <SectionSkeletonView activeView={activeView} />
        )}
      </ViewWrapper>
    );
  }

  return (
    <div className="p-2 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6 pb-24 md:pb-10 overflow-x-hidden">
      {/* 1. TOP HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-amber-600 text-primary-foreground p-4 md:p-8 shadow-lg md:shadow-xl border border-primary/20">
        <div className="absolute -right-10 -bottom-10 size-40 md:size-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/15 backdrop-blur-md px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[11px] font-mono tracking-wide flex items-center gap-1 border border-white/20">
          <ShieldCheck className="size-3 md:size-3.5 text-emerald-300" />
          <span>Active Shield</span>
        </div>

        <div className="relative z-10 space-y-3 md:space-y-4">
          <div className="space-y-0.5 md:space-y-1 w-3/4">
            <span className="text-[10px] md:text-xs font-mono tracking-wider opacity-80 uppercase">
              Welcome, {user ? user.name : "Trader"}
            </span>
            <h1 className="text-lg md:text-3xl font-extrabold tracking-tight truncate">
              {activeAccount ? activeAccount.account_name : "Propfident Terminal"}
            </h1>
            <p className="text-[10px] md:text-sm font-mono opacity-90 truncate">
              {activeAccount ? `${activeAccount.account_type} • Monitored` : "No active account"}
            </p>
          </div>

          <div className="pt-1 md:pt-2 flex items-center gap-2 md:gap-3">
            <Button
              onClick={() => changeView("account-intel")}
              size="sm"
              className="bg-white text-black hover:bg-white/90 font-semibold text-[10px] md:text-xs rounded-full px-3 md:px-5 h-7 md:h-9 shadow-sm"
            >
              <Wallet className="size-3 md:size-3.5 mr-1 md:mr-2" /> Intel
            </Button>
            <Button
              onClick={() => changeView("lot-calculator")}
              variant="outline"
              size="sm"
              className="bg-black/20 hover:bg-black/30 text-white border-white/30 text-[10px] md:text-xs rounded-full px-3 md:px-5 h-7 md:h-9 backdrop-blur-sm"
            >
              <Calculator className="size-3 md:size-3.5 mr-1 md:mr-2" /> Calc
            </Button>
          </div>
        </div>
      </div>

      {/* 2. CORE TERMINAL MODULES */}
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[10px] md:text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Core Modules
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <Card
            onClick={() => changeView("account-intel")}
            className="group relative h-36 md:h-52 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all p-4 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center size-10 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
                <ShieldCheck className="size-5 md:size-7 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
              </div>
              <Badge className="bg-slate-950 text-white border border-slate-800 font-mono text-[8px] md:text-[10px] rounded-full px-2 py-0.5 shadow-sm">
                Live
              </Badge>
            </div>
            <div>
              <h3 className="font-extrabold text-sm md:text-lg flex items-center justify-between tracking-tight text-slate-900 dark:text-zinc-100">
                <span className="truncate">Account Intel</span>
                <ChevronRight className="hidden md:block size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium line-clamp-1 md:line-clamp-2 mt-0.5">
                Live drawdown limits & safety tracking.
              </p>
            </div>
          </Card>

          <Card
            onClick={() => changeView("journal")}
            className="group relative h-36 md:h-52 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all p-4 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center size-10 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
                <BookOpen className="size-5 md:size-7 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
              </div>
              <Badge className="bg-slate-950 text-white border border-slate-800 font-mono text-[8px] md:text-[10px] rounded-full px-2 py-0.5 shadow-sm">
                Analytics
              </Badge>
            </div>
            <div>
              <h3 className="font-extrabold text-sm md:text-lg flex items-center justify-between tracking-tight text-slate-900 dark:text-zinc-100">
                <span className="truncate">Trading Journal</span>
                <ChevronRight className="hidden md:block size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium line-clamp-1 md:line-clamp-2 mt-0.5">
                Log trades, track wins & evaluate RR.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. FREE UTILITY TOOLS */}
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[10px] md:text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Free Utilities
          </h2>
          <span className="text-[8px] md:text-[10px] font-mono text-primary font-semibold">3 Tools</span>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <Card
            onClick={() => changeView("lot-calculator")}
            className="group relative h-28 md:h-36 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center gap-2 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center size-9 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
              <Calculator className="size-4 md:size-6 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-0.5 max-w-full">
              <h4 className="text-[11px] md:text-sm font-extrabold truncate text-slate-900 dark:text-zinc-100">Lot Calc</h4>
              <p className="hidden md:block text-[10px] md:text-xs text-muted-foreground truncate font-semibold">Position sizing</p>
            </div>
          </Card>

          <Card
            onClick={() => changeView("prop-match")}
            className="group relative h-28 md:h-36 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center gap-2 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center size-9 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
              <Building2 className="size-4 md:size-6 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-0.5 max-w-full">
              <h4 className="text-[11px] md:text-sm font-extrabold truncate text-slate-900 dark:text-zinc-100">Prop Match</h4>
              <p className="hidden md:block text-[10px] md:text-xs text-muted-foreground truncate font-semibold">Compare firms</p>
            </div>
          </Card>

          <Card
            onClick={() => changeView("trade-assist")}
            className="group relative h-28 md:h-36 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center gap-2 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center size-9 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
              <MonitorCog className="size-4 md:size-6 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-0.5 max-w-full">
              <h4 className="text-[11px] md:text-sm font-extrabold truncate text-slate-900 dark:text-zinc-100">Assist</h4>
              <p className="hidden md:block text-[10px] md:text-xs text-muted-foreground truncate font-semibold">Execution guide</p>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. TRADER GROWTH BOARD */}
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[10px] md:text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Trader Growth
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <Card
            onClick={() => changeView("roadmap")}
            className="group relative h-28 md:h-36 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center gap-2 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center size-9 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
              <Map className="size-4 md:size-6 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-0.5 max-w-full">
              <h4 className="text-[11px] md:text-sm font-extrabold truncate text-slate-900 dark:text-zinc-100">Roadmap</h4>
              <p className="hidden md:block text-[10px] md:text-xs text-muted-foreground truncate font-semibold">Compounding blueprint</p>
            </div>
          </Card>

          <Card
            onClick={() => changeView("market-news")}
            className="group relative h-28 md:h-36 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center gap-2 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center size-9 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
              <Newspaper className="size-4 md:size-6 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-0.5 max-w-full">
              <h4 className="text-[11px] md:text-sm font-extrabold truncate text-slate-900 dark:text-zinc-100">Market News</h4>
              <p className="hidden md:block text-[10px] md:text-xs text-muted-foreground truncate font-semibold">Economic & macro updates</p>
            </div>
          </Card>

          <Card
            onClick={() => changeView("trade-ideas")}
            className="group relative h-28 md:h-36 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-slate-100/80 dark:bg-zinc-900/90 hover:bg-slate-200/80 dark:hover:bg-zinc-850/90 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center gap-2 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center size-9 md:size-14 rounded-full bg-slate-200 dark:bg-zinc-800/90 group-hover:bg-slate-300/70 dark:group-hover:bg-zinc-700/80 transition-all shadow-inner">
              <Lightbulb className="size-4 md:size-6 text-slate-800 dark:text-zinc-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-0.5 max-w-full">
              <h4 className="text-[11px] md:text-sm font-extrabold truncate text-slate-900 dark:text-zinc-100">Ideas</h4>
              <p className="hidden md:block text-[10px] md:text-xs text-muted-foreground truncate font-semibold">Bias & setup analysis</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function UserpanePage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <UserpaneContent />
    </Suspense>
  );
}

function ViewWrapper({ activeView, onBack, children }: { activeView: ViewType; onBack: () => void; children: React.ReactNode }) {
  const titles: Record<ViewType, { title: string; desc: string }> = {
    overview: { title: "Overview", desc: "Main Quick Info Board" },
    "account-intel": { title: "Account Intel", desc: "Live Monitoring & Risk Tracker" },
    journal: { title: "Trading Journal", desc: "Performance Analytics & History" },
    "lot-calculator": { title: "Lot Calculator", desc: "Exact Position Sizing Engine" },
    "prop-match": { title: "Prop Match", desc: "Funding Firm Comparison Matrix" },
    "trade-assist": { title: "Trade Assist", desc: "Execution & Rules Checklist" },
    roadmap: { title: "Millionaire Roadmap", desc: "Account Scaling & Growth Strategy" },
    "market-news": { title: "Market News", desc: "Live Economic Events & Financial Updates" },
    "trade-ideas": { title: "Trade Ideas", desc: "Market Bias & Confluence Setups" },
  };

  return (
    <div className="p-2 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6 pb-24 md:pb-10">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2 md:gap-3">
          <Button onClick={onBack} variant="outline" size="icon" className="size-8 md:size-9 rounded-full shrink-0">
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-sm md:text-xl font-bold tracking-tight">{titles[activeView].title}</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground">{titles[activeView].desc}</p>
          </div>
        </div>
        <Badge variant="secondary" className="font-mono text-[9px] md:text-[11px] rounded-full">
          In Development
        </Badge>
      </div>
      {children}
    </div>
  );
}

function SectionSkeletonView({ activeView }: { activeView: ViewType }) {
  if (activeView === "journal" || activeView === "account-intel") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <Skeleton className="h-20 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-20 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-20 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-20 rounded-2xl md:rounded-3xl" />
        </div>
        <Skeleton className="h-64 md:h-96 w-full rounded-2xl md:rounded-3xl" />
      </div>
    );
  }

  if (activeView === "lot-calculator" || activeView === "trade-assist") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-72 md:h-96 col-span-1 rounded-2xl md:rounded-3xl" />
        <Skeleton className="h-72 md:h-96 col-span-1 md:col-span-2 rounded-2xl md:rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Skeleton className="h-32 md:h-40 w-full rounded-2xl md:rounded-3xl" />
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <Skeleton className="h-28 md:h-40 rounded-2xl md:rounded-3xl" />
        <Skeleton className="h-28 md:h-40 rounded-2xl md:rounded-3xl" />
        <Skeleton className="h-28 md:h-40 rounded-2xl md:rounded-3xl" />
      </div>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="p-2 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6">
      <Skeleton className="w-full h-32 md:h-48 rounded-2xl md:rounded-3xl" />
      <div className="space-y-2 md:space-y-3">
        <Skeleton className="h-3 w-20 md:h-4 md:w-28 rounded-md" />
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <Skeleton className="h-28 md:h-48 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-28 md:h-48 rounded-2xl md:rounded-3xl" />
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        <Skeleton className="h-3 w-20 md:h-4 md:w-24 rounded-md" />
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <Skeleton className="h-24 md:h-32 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-24 md:h-32 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-24 md:h-32 rounded-2xl md:rounded-3xl" />
        </div>
      </div>
    </div>
  );
}