"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Lock, Sparkles, Target } from "lucide-react";

export function RoadmapStagePreview() {
  const [selectedNum, setSelectedNum] = useState("01");

  const stages = [
    {
      num: "01",
      title: "FOUNDATION",
      range: "$0 → $10K",
      objective: "Build discipline and validate your edge before taking on funded capital.",
      modules: [
        "Trading Plan Construction",
        "Fixed Fractional Risk & Sizing",
        "Drawdown Mechanics & Limits",
        "Trading Journal & Edge Verification",
      ],
    },
    {
      num: "02",
      title: "FIRST FUNDING",
      range: "$10K → $100K",
      objective: "Pass evaluation phases safely and secure your first official profit payout.",
      modules: [
        "Prop Match Evaluation Criteria",
        "Challenge Risk Management",
        "Daily Drawdown Preservation",
        "First Withdrawal Protection",
      ],
    },
    {
      num: "03",
      title: "SCALING",
      range: "$100K → $250K",
      objective: "Transition from a single account to a multi-account allocation system.",
      modules: [
        "Multi-Account Architecture",
        "Trade Replication & Latency",
        "Asset Correlation Management",
        "Payout Schedule Rotations",
      ],
    },
    {
      num: "04",
      title: "CAPITAL STACK",
      range: "$250K → $500K",
      objective: "Build a repeatable multi-firm capital stack with institutional risk controls.",
      modules: [
        "Counterparty Diversification",
        "Portfolio-Level Exposure Limits",
        "Equity Buffer Architecture",
        "Circuit Breaker Systems",
      ],
    },
    {
      num: "05",
      title: "$1M+ OPERATOR",
      range: "$500K → $1M+",
      objective: "Operate at peak prop firm scale with long-term capital preservation.",
      modules: [
        "Institutional Risk Overlay",
        "Dynamic Capital Allocation",
        "Hedging & Portfolio Risk",
        "Treasury & Cash Management",
      ],
    },
  ];

  const current = stages.find((s) => s.num === selectedNum) || stages[0];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 border-t border-border/40">
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
        <Badge
          variant="outline"
          className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400"
        >
          <Sparkles className="h-3 w-3 mr-1" /> STAGE SNEAK PEEK
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
          Explore the 5 Progression Stages
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Click through the roadmap stages to preview the core curriculum and milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Selector Buttons */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {stages.map((stg) => {
            const isActive = stg.num === selectedNum;
            return (
              <button
                key={stg.num}
                type="button"
                onClick={() => setSelectedNum(stg.num)}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? "border-purple-500 bg-purple-500/10 shadow-md shadow-purple-500/10"
                    : "border-border/60 bg-card/60 hover:bg-muted/40 hover:border-purple-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stg.num}
                  </span>
                  <div>
                    <div className="font-bold text-xs text-foreground font-sans">
                      {stg.title}
                    </div>
                    <div className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                      {stg.range}
                    </div>
                  </div>
                </div>
                <Lock className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Preview */}
        <Card className="lg:col-span-8 border-purple-500/30 bg-card/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[10px] text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            <Lock className="h-3 w-3" /> UNLOCKS AT LAUNCH
          </div>

          <CardHeader className="p-6 border-b border-border/40">
            <Badge
              variant="outline"
              className="w-max font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400"
            >
              STAGE {current.num} // {current.range}
            </Badge>
            <CardTitle className="text-xl sm:text-2xl font-extrabold font-sans mt-2">
              {current.title}
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {current.objective}
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="font-mono text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-500" /> Core Curriculum
              Modules
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.modules.map((mod) => (
                <div
                  key={mod}
                  className="flex items-center gap-2.5 p-3 rounded-lg border border-border/40 bg-background/50 text-xs font-medium text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}