"use client";

import { useState } from "react";
import { RoadmapHero } from "@/components/millionaire-roadmap/roadmap-hero";
import { StageExplorer } from "@/components/millionaire-roadmap/stage-explorer";
import { CapitalTracker } from "@/components/millionaire-roadmap/capital-tracker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, Rocket, ShieldCheck } from "lucide-react";

export default function MillionaireRoadmapPage() {
  const [selectedStageId, setSelectedStageId] = useState<string>("stage-01");

  const handleStageSelect = (stageId: string) => {
    setSelectedStageId(stageId);
    const element = document.getElementById("stage-explorer-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/20 selection:text-purple-400">
      {/* 1. Hero with Progression Graph */}
      <RoadmapHero onSelectStage={handleStageSelect} />

      {/* 2. Interactive Stage Explorer */}
      <div id="stage-explorer-section">
        <StageExplorer
          selectedStageId={selectedStageId}
          onStageChange={setSelectedStageId}
        />
      </div>

      {/* 3. Interactive Capital Tracker */}
      <CapitalTracker />

      {/* 4. Frequently Asked Questions */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 border-t border-border/40 space-y-6">
        <div className="text-center space-y-2">
          <Badge
            variant="outline"
            className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400"
          >
            FAQ
          </Badge>
          <h2 className="text-2xl font-bold font-sans">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-bold text-xs text-foreground font-sans flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" /> Does this guarantee $1M in profit?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No. The roadmap measures funded allocation capital across prop firms, not individual personal earnings. Profit depends entirely on execution, risk management, and market conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-bold text-xs text-foreground font-sans flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" /> How do Propfident tools help me?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each stage links directly to specific Propfident utilities like the Position Sizer, Prop Match comparison engine, and Multi-Account Dashboard to protect account parameters.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. Final CTA Banner */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <Card className="border-purple-500/40 bg-gradient-to-r from-purple-900/20 via-card to-purple-950/20 overflow-hidden relative">
          <CardContent className="p-8 sm:p-12 text-center space-y-4 relative z-10">
            <Badge
              variant="outline"
              className="border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs"
            >
              <Rocket className="h-3.5 w-3.5 mr-1" /> START YOUR ROADMAP
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground font-sans uppercase">
              Ready to Scale Your Capital Allocation?
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Start with Stage 01 Foundation rules, audit prop firm constraints, and systematically build your multi-account capital stack.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs px-6 py-5 gap-2">
                Begin Stage 01 Foundation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto font-mono text-xs px-6 py-5 border-border">
                <ShieldCheck className="h-4 w-4 mr-2 text-purple-500" /> Compare Prop Firms
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}