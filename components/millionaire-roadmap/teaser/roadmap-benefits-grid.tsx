"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  CheckSquare,
  Layers,
  ShieldAlert,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";

export function RoadmapBenefitsGrid() {
  const benefits = [
    {
      icon: Layers,
      title: "5 Structured Progression Stages",
      description:
        "Clear, non-linear milestones moving from $0 to $1M+ in aggregate prop allocation—eliminating guesswork on what to focus on next.",
    },
    {
      icon: CheckSquare,
      title: "Interactive Skill & Task Checklists",
      description:
        "Every stage features actionable checklists for risk control, journal verification, and evaluation preparedness before you scale.",
    },
    {
      icon: ShieldAlert,
      title: "Capital Preservation Guardrails",
      description:
        "Stage-specific risk parameters designed to prevent account losses, trailing drawdown traps, and revenge trading after payouts.",
    },
    {
      icon: Wrench,
      title: "Native Propfident Ecosystem Integration",
      description:
        "Seamlessly links your roadmap steps directly to our Position Sizer, Prop Match evaluator, and Risk Analytics suite.",
    },
    {
      icon: Trophy,
      title: "Trader Level & Milestone System",
      description:
        "Earn progression levels as your managed allocation grows, tracking concrete milestones rather than empty promises.",
    },
    {
      icon: BarChart3,
      title: "Multi-Account Allocation Tracking",
      description:
        "Visualize your total capital stack distributed across multiple prop firms, payout schedules, and active buffers in real time.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 border-t border-border/40">
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
        <Badge
          variant="outline"
          className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400"
        >
          <Sparkles className="h-3 w-3 mr-1" /> WHY WE'RE BUILDING THIS
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
          Engineered for Systemic Capital Scaling
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Most traders fail because they lack a disciplined framework for managing larger allocation sizes. Here is how the Millionaire Roadmap changes that.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="border-border/60 bg-card/60 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-200"
            >
              <CardHeader className="p-5 pb-2">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-bold font-sans">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}