"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowRight, Compass, Sparkles, Target } from "lucide-react";

export type StageSummary = {
  id: string;
  number: string;
  title: string;
  range: string;
  subtitle: string;
  milestonesCount: number;
  modulesCount: number;
};

export const STAGES_SUMMARY: StageSummary[] = [
  {
    id: "stage-01",
    number: "01",
    title: "FOUNDATION",
    range: "$0 → $10K",
    subtitle: "Build the trader before building the capital.",
    milestonesCount: 8,
    modulesCount: 8,
  },
  {
    id: "stage-02",
    number: "02",
    title: "FIRST FUNDING",
    range: "$10K → $100K",
    subtitle: "Secure your first meaningful prop firm allocation.",
    milestonesCount: 8,
    modulesCount: 8,
  },
  {
    id: "stage-03",
    number: "03",
    title: "SCALING",
    range: "$100K → $250K",
    subtitle: "Transition to managing multiple funded accounts.",
    milestonesCount: 8,
    modulesCount: 8,
  },
  {
    id: "stage-04",
    number: "04",
    title: "CAPITAL STACK",
    range: "$250K → $500K",
    subtitle: "Build a repeatable multi-firm capital management system.",
    milestonesCount: 8,
    modulesCount: 8,
  },
  {
    id: "stage-05",
    number: "05",
    title: "$1M+ OPERATOR",
    range: "$500K → $1M+",
    subtitle: "Operate at institutional prop scale with risk architecture.",
    milestonesCount: 8,
    modulesCount: 8,
  },
];

interface RoadmapHeroProps {
  onSelectStage?: (stageId: string) => void;
}

export function RoadmapHero({ onSelectStage }: RoadmapHeroProps) {
  const [activeStage, setActiveStage] = useState<StageSummary>(STAGES_SUMMARY[0]);

  const handleStageClick = (stage: StageSummary) => {
    setActiveStage(stage);
    if (onSelectStage) {
      onSelectStage(stage.id);
    }
  };

  return (
    <section className="relative w-full border-b border-border/40 bg-background pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 dark:bg-primary/15 blur-3xl rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header Badge & Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="inline-flex items-center gap-1.5 border-primary/30 bg-primary/10 text-primary font-mono text-xs px-3 py-1 rounded-full"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            PROPFIDENT FRAMEWORK // ROADMAP
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans uppercase">
            Millionaire Roadmap
          </h1>

          <p className="font-mono text-xs sm:text-sm text-primary font-semibold tracking-wider uppercase">
            From $0 → $1M+ in Funded Allocation Capital
          </p>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            A step-by-step framework for building, scaling, and protecting funded trading capital.
            <span className="block text-[11px] sm:text-xs text-muted-foreground/80 mt-1">
              *Funding capital ≠ personal profit. Tracks allocation size, not guaranteed income.
            </span>
          </p>
        </div>

        {/* Desktop & Tablet: Interactive Capital Progression Node Graph */}
        <div className="mt-12 hidden md:block relative bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase">
              <Compass className="h-4 w-4 text-primary" /> Progression Ladder
            </div>
            <p className="text-xs font-mono text-primary">
              Hover/Click nodes to inspect stage
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3 relative">
            {/* Connecting Glow Line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 bg-gradient-to-r from-primary/20 via-primary to-primary/20 pointer-events-none z-0" />

            {STAGES_SUMMARY.map((stage) => {
              const isSelected = activeStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleStageClick(stage)}
                  className={`relative z-10 flex flex-col items-center p-4 rounded-xl border text-left transition-all duration-200 group ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-border/60 bg-background/80 hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    STAGE {stage.number}
                  </span>

                  {/* Node Circle */}
                  <div
                    className={`my-3 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-white shadow-md shadow-primary/30 scale-110"
                        : "border-border bg-card text-foreground group-hover:border-primary/50"
                    }`}
                  >
                    {stage.number}
                  </div>

                  <p className="font-bold text-xs text-foreground font-sans text-center line-clamp-1">
                    {stage.title}
                  </p>

                  <p className="mt-1 font-mono text-[11px] font-semibold text-primary text-center">
                    {stage.range}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Stage Preview Banner */}
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-primary">
                  STAGE {activeStage.number} // {activeStage.title}
                </span>
                <Badge variant="outline" className="font-mono text-[10px] border-primary/30">
                  {activeStage.range}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-foreground">{activeStage.subtitle}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                <span>• {activeStage.modulesCount} Modules</span>
                <span>• {activeStage.milestonesCount} Milestones</span>
              </div>
            </div>

            <Button
              onClick={() => onSelectStage?.(activeStage.id)}
              className="gap-2 bg-primary hover:bg-primary text-white font-mono text-xs w-full sm:w-auto shrink-0"
            >
              Explore Stage <ArrowDownRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile: Vertical Stage Flow */}
        <div className="mt-8 block md:hidden space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase text-center mb-4">
            Roadmap Stages ($0 → $1M+)
          </p>
          {STAGES_SUMMARY.map((stage) => {
            const isSelected = activeStage.id === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => handleStageClick(stage)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border/60 bg-card/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 border border-primary/40 font-mono text-xs font-bold text-primary">
                      {stage.number}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-foreground font-sans">
                        {stage.title}
                      </h4>
                      <p className="font-mono text-[10px] text-primary font-semibold">
                        {stage.range}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                {isSelected && (
                  <p className="mt-2 text-xs text-muted-foreground border-t border-border/40 pt-2">
                    {stage.subtitle}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}