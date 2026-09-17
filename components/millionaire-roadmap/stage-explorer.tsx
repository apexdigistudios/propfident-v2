"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Compass,
  Layers,
  ShieldAlert,
  Target,
  Wrench,
} from "lucide-react";

export type StageDetail = {
  id: string;
  number: string;
  title: string;
  range: string;
  objective: string;
  modules: { title: string; desc: string }[];
  milestones: { id: string; label: string; completed: boolean }[];
  riskRules: string[];
  mistakes: string[];
  recommendedTool: {
    name: string;
    desc: string;
    actionLabel: string;
    href: string;
  };
};

export const STAGES_DATA: Record<string, StageDetail> = {
  "stage-01": {
    id: "stage-01",
    number: "01",
    title: "FOUNDATION",
    range: "$0 → $10K",
    objective:
      "Become consistently disciplined, validate edge, and master risk parameters before managing external capital.",
    modules: [
      { title: "Trading Plan Construction", desc: "Define explicit entry, exit, and execution rules." },
      { title: "Risk & Position Sizing", desc: "Never risk more than 0.5%–1% per trade setup." },
      { title: "Drawdown Mechanics", desc: "Understand trailing vs. static drawdown boundaries." },
      { title: "Trading Journal Setup", desc: "Log 50+ trades with detailed execution metrics." },
      { title: "Strategy Edge Validation", desc: "Prove positive expectancy across varied market regimes." },
      { title: "Psychology & Discipline", desc: "Eliminate revenge trading and impulse sizing." },
      { title: "Prop Firm Fundamentals", desc: "Learn key evaluation rules and hidden restrictions." },
      { title: "Pre-Flight Checklist", desc: "Standardize pre-session routine and news checks." },
    ],
    milestones: [
      { id: "m1-1", label: "Documented complete trading plan", completed: true },
      { id: "m1-2", label: "Calculated exact fixed-fractional position sizes", completed: true },
      { id: "m1-3", label: "Logged 50 consecutive trades in journal", completed: false },
      { id: "m1-4", label: "Validated positive expectancy (Win Rate & Risk:Reward)", completed: false },
      { id: "m1-5", label: "Kept max daily drawdown under 2%", completed: false },
      { id: "m1-6", label: "Passed mock prop firm challenge", completed: false },
    ],
    riskRules: [
      "Max risk per trade: 0.5% - 1.0% of nominal balance.",
      "Max daily drawdown limit: Stop trading after -2% in a single day.",
      "Hard max stop-loss required on 100% of open positions.",
    ],
    mistakes: [
      "Skipping strategy backtesting and diving straight into live challenges.",
      "Confusing high win rate with profitability while taking unbounded losses.",
      "Overleveraging early to pass evaluations rapidly.",
    ],
    recommendedTool: {
      name: "Position Sizer",
      desc: "Calculate precise lot sizes based on stop-loss distance and account risk.",
      actionLabel: "Open Position Sizer",
      href: "/position-sizer",
    },
  },
  "stage-02": {
    id: "stage-02",
    number: "02",
    title: "FIRST FUNDING",
    range: "$10K → $100K",
    objective:
      "Secure your first meaningful funded allocation and execute your first payout safely.",
    modules: [
      { title: "Selecting Suitable Firms", desc: "Match strategy rules against firm constraints using Prop Match." },
      { title: "Evaluation Phase 1 Execution", desc: "Pace profit targets without violating daily DD limits." },
      { title: "Evaluation Phase 2 Control", desc: "Protect accumulated gains and reduce risk near the finish line." },
      { title: "Daily Drawdown Management", desc: "Monitor equity vs balance drawdown calculation methods." },
      { title: "Maximum Drawdown Preservation", desc: "Maintain a buffer above total drawdown thresholds." },
      { title: "First Payout Strategy", desc: "Secure first withdrawal to de-risk challenge cost investments." },
      { title: "Post-Payout Adjustment", desc: "Reset risk after profit split withdrawals to avoid high-water mark traps." },
      { title: "Account Safety Protocols", desc: "Avoid weekend holding and high-impact news spikes." },
    ],
    milestones: [
      { id: "m2-1", label: "Evaluated firm rules using Prop Match tool", completed: false },
      { id: "m2-2", label: "Passed Phase 1 evaluation without daily DD violation", completed: false },
      { id: "m2-3", label: "Passed Phase 2 evaluation with controlled lot sizing", completed: false },
      { id: "m2-4", label: "Received first official prop firm payout split", completed: false },
      { id: "m2-5", label: "Maintained account buffer post-withdrawal", completed: false },
    ],
    riskRules: [
      "Reduce lot size by 50% when within 1.5% of max daily drawdown.",
      "Never hold unhedged positions through major central bank interest rate decisions.",
      "Bank initial payout before scaling to higher account tiers.",
    ],
    mistakes: [
      "Increasing risk immediately after receiving a live funded account.",
      "Failing to account for trailing drawdown that locks in at initial balance.",
      "Ignoring news restriction windows specified by the firm.",
    ],
    recommendedTool: {
      name: "Prop Match Evaluator",
      desc: "Benchmark your statement history directly against top prop firm rules.",
      actionLabel: "Compare Firms with Prop Match",
      href: "/prop-match",
    },
  },
  "stage-03": {
    id: "stage-03",
    number: "03",
    title: "SCALING",
    range: "$100K → $250K",
    objective:
      "Transition from managing a single account to building a multi-account funded allocation.",
    modules: [
      { title: "Multi-Account Architecture", desc: "Distribute risk across multiple distinct prop allocations." },
      { title: "Trade Copier Best Practices", desc: "Sync orders across accounts while managing slippage and execution latency." },
      { title: "Correlation Risk Control", desc: "Avoid stacking identical currency/asset exposure across accounts." },
      { title: "Scaling Rules Benchmark", desc: "Utilize firm organic scaling programs vs purchasing additional accounts." },
      { title: "Payout Rotations", desc: "Stagger payout schedules for continuous cash-flow generation." },
      { title: "Performance Analytics", desc: "Identify drawdown drivers and optimal trading sessions." },
      { title: "Avoiding Overconfidence", desc: "Prevent tilt scaling following profitable payout cycles." },
      { title: "Capital Protection Buffer", desc: "Keep a 3%–5% profit cushion active at all times." },
    ],
    milestones: [
      { id: "m3-1", label: "Managed 2+ active funded accounts simultaneously", completed: false },
      { id: "m3-2", label: "Set up trade replication with latency monitoring", completed: false },
      { id: "m3-3", label: "Achieved consistent bi-weekly or monthly payouts", completed: false },
      { id: "m3-4", label: "Maintained portfolio-wide drawdown below 3%", completed: false },
    ],
    riskRules: [
      "Total aggregate risk across ALL accounts must not exceed 1.5% simultaneously.",
      "Pause copiers during high volatility news events to prevent fill dispersion.",
      "Rebalance portfolio allocation if one firm exceeds 60% of total capital stack.",
    ],
    mistakes: [
      "Copying identical trades without checking asset-class correlation.",
      "Treating $250K allocation as $250K cash balance.",
      "Over-leveraging second account after losing the first.",
    ],
    recommendedTool: {
      name: "Account Dashboard",
      desc: "Track multiple prop firm accounts, drawdowns, and payout cycles in one place.",
      actionLabel: "View Dashboard",
      href: "#",
    },
  },
  "stage-04": {
    id: "stage-04",
    number: "04",
    title: "CAPITAL STACK",
    range: "$250K → $500K",
    objective:
      "Establish a robust, repeatable multi-firm capital stack with institutional risk management.",
    modules: [
      { title: "Firm Counterparty Diversification", desc: "Spread allocation across 3+ distinct prop firm brokers." },
      { title: "Portfolio Exposure Management", desc: "Cap maximum open market risk across all combined positions." },
      { title: "Drawdown Buffer Architecture", desc: "Build permanent equity buffers to absorb market regime shifts." },
      { title: "Performance Analytics & Audit", desc: "Audit trade efficiency, MAE/MFE, and hold times." },
      { title: "Capital Preservation Systems", desc: "Implement circuit breakers for drawdown streaks." },
      { title: "Tax & Entity Structuring", desc: "Organize trading revenues into formal corporate entities." },
      { title: "Systemized Scaling Decisions", desc: "Automate capital reinvestment from profits." },
      { title: "Operational Continuity", desc: "Prepare backup trading hardware, internet, and execution channels." },
    ],
    milestones: [
      { id: "m4-1", label: "Secured funding across 3+ independent prop firms", completed: false },
      { id: "m4-2", label: "Built a persistent 5% profit cushion across all accounts", completed: false },
      { id: "m4-3", label: "Implemented automated account circuit breakers", completed: false },
      { id: "m4-4", label: "Passed $250K total payout benchmark", completed: false },
    ],
    riskRules: [
      "Maximum single-asset exposure capped at 2% total portfolio value.",
      "Mandatory 48-hour trading halt after experiencing 3 consecutive daily losses.",
      "Maintain emergency liquidity reserve for challenge re-entries.",
    ],
    mistakes: [
      "Concentrating all capital in a single prop firm.",
      "Failing to adapt strategy rules when market volatility changes.",
      "Neglecting corporate tax planning as payout revenue grows.",
    ],
    recommendedTool: {
      name: "Risk Monitoring Engine",
      desc: "Real-time portfolio-wide drawdown warning and exposure monitoring.",
      actionLabel: "Open Risk Monitor",
      href: "#",
    },
  },
  "stage-05": {
    id: "stage-05",
    number: "05",
    title: "$1M+ OPERATOR",
    range: "$500K → $1M+",
    objective:
      "Operate at professional scale managing $1M+ in combined funded capital with long-term sustainability.",
    modules: [
      { title: "Multi-Account Risk Architecture", desc: "Institutional-grade risk overlay across top-tier prop firms." },
      { title: "Capital Allocation Frameworks", desc: "Dynamically allocate capital based on strategy performance." },
      { title: "Correlated Risk Hedging", desc: "Balance long/short market exposure across multiple asset classes." },
      { title: "Institutional Drawdown Defense", desc: "Strict capital preservation mechanisms for million-dollar portfolios." },
      { title: "Payout & Treasury Management", desc: "Systematic cash management, yield generation, and capital reserves." },
      { title: "Strategy Refinement & Evolution", desc: "Continuous R&D to maintain quantitative edge." },
      { title: "Team & Automation Scaling", desc: "Incorporate execution bots and quantitative risk assistants." },
      { title: "Long-Term Sustainability", desc: "Treat trading as an institutional asset management business." },
    ],
    milestones: [
      { id: "m5-1", label: "Crossed $1,000,000 in total funded allocations", completed: false },
      { id: "m5-2", label: "Established multi-firm risk management architecture", completed: false },
      { id: "m5-3", label: "Achieved consistent quarter-over-quarter payout stability", completed: false },
      { id: "m5-4", label: "Built a dedicated personal cash reserve from profits", completed: false },
    ],
    riskRules: [
      "Maximum aggregate risk capped at 0.5% per trade across $1M+ capital.",
      "Strict zero-weekend exposure policy across all active accounts.",
      "Continuous counterparty risk review for all participating prop firms.",
    ],
    mistakes: [
      "Allowing ego to increase risk per trade on mega-sized accounts.",
      "Overlooking firm liquidity caps or maximum payout limitations.",
      "Failing to treat funded capital management as a business.",
    ],
    recommendedTool: {
      name: "Propfident Analytics",
      desc: "Advanced performance diagnostics and quantitative trade audit suite.",
      actionLabel: "Explore Analytics",
      href: "#",
    },
  },
};

interface StageExplorerProps {
  selectedStageId: string;
  onStageChange: (stageId: string) => void;
}

export function StageExplorer({ selectedStageId, onStageChange }: StageExplorerProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const stage = STAGES_DATA[selectedStageId] || STAGES_DATA["stage-01"];

  const toggleModule = (idx: number) => {
    setExpandedModule(expandedModule === idx ? null : idx);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Stage Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border/40">
        {Object.values(STAGES_DATA).map((s) => {
          const isActive = s.id === stage.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onStageChange(s.id)}
              className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
              }`}
            >
              <span>{s.number}</span>
              <span>{s.title}</span>
              <span className="text-[10px] opacity-80">({s.range})</span>
            </button>
          );
        })}
      </div>

      {/* Main Stage Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Objectives, Modules & Milestones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header & Objective */}
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardHeader className="border-b border-border/40 p-5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
                  STAGE {stage.number}
                </Badge>
                <span className="font-mono text-xs font-bold text-muted-foreground">{stage.range}</span>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold font-sans mt-2">{stage.title}</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stage.objective}</p>
            </CardHeader>
          </Card>

          {/* Modules List */}
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="p-5 border-b border-border/40">
              <CardTitle className="text-base font-bold flex items-center gap-2 font-sans">
                <Layers className="h-4 w-4 text-primary" /> Stage Modules ({stage.modules.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {stage.modules.map((m, idx) => {
                const isExpanded = expandedModule === idx;
                return (
                  <div
                    key={m.title}
                    className="rounded-lg border border-border/50 bg-background/60 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between p-3 text-left font-semibold text-xs sm:text-sm text-foreground hover:bg-muted/30"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-primary font-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {m.title}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="p-3 border-t border-border/40 bg-muted/20 text-xs text-muted-foreground">
                        {m.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Milestones Checklist */}
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="p-5 border-b border-border/40">
              <CardTitle className="text-base font-bold flex items-center gap-2 font-sans">
                <Target className="h-4 w-4 text-primary" /> Stage Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              {stage.milestones.map((ms) => (
                <div
                  key={ms.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-background/50"
                >
                  <div className="flex items-center gap-3">
                    {ms.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={`text-xs font-medium ${ms.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {ms.label}
                    </span>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {ms.completed ? "Achieved" : "Pending"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Risk Framework, Mistakes, Connected Tools */}
        <div className="space-y-6">
          {/* Risk Framework */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="p-4 border-b border-primary/20">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary font-sans">
                <ShieldAlert className="h-4 w-4" /> Risk Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              {stage.riskRules.map((rule) => (
                <div key={rule} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mistakes to Avoid */}
          <Card className="border-rose-500/30 bg-rose-500/5">
            <CardHeader className="p-4 border-b border-rose-500/20">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400 font-sans">
                <AlertTriangle className="h-4 w-4" /> Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              {stage.mistakes.map((mistake) => (
                <div key={mistake} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{mistake}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Propfident Tool */}
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="p-4 border-b border-border/40">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground font-sans">
                <Wrench className="h-4 w-4 text-primary" /> Propfident Ecosystem Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-primary">
                  {stage.recommendedTool.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {stage.recommendedTool.desc}
                </p>
              </div>
              <a href={stage.recommendedTool.href} className="block">
                <Button className="w-full gap-2 bg-primary hover:bg-primary text-white font-mono text-xs">
                  {stage.recommendedTool.actionLabel} <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}