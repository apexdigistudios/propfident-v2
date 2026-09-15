"use client";

import { useState } from "react";
import { Calculator, Scale, Brain } from "lucide-react";
import { RiskLotCalculator } from "@/components/tools/risk-calculator";
import { PropMatchEvaluator } from "@/components/tools/prop-match";
import { AITradePlanner } from "@/components/tools/ai-trade-planner";

export function Tools() {
  const [activeTab, setActiveTab] = useState<"calculator" | "prop-match" | "ai-planner">("calculator");

  return (
    <section id="tools" className="py-20 sm:py-28 border-t border-border/40 relative z-10 font-sans bg-surface/30">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-3">
              Utility Hub
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
              Free tools for every funded trader.
            </p>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            No sign-up required. Access browser-based utilities designed specifically for prop firm evaluation rules.
          </p>
        </div>

        {/* Utility Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-surface border border-border/60 gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "calculator"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Position Sizer</span>
            </button>

            <button
              onClick={() => setActiveTab("prop-match")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "prop-match"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Prop Match</span>
            </button>

            <button
              onClick={() => setActiveTab("ai-planner")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "ai-planner"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <Brain className="h-3.5 w-3.5" />
              <span>AI Trade Planner</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tool Display */}
        <div className="transition-all duration-200 max-w-3xl mx-auto">
          {activeTab === "calculator" && <RiskLotCalculator />}
          {activeTab === "prop-match" && <PropMatchEvaluator />}
          {activeTab === "ai-planner" && <AITradePlanner />}
        </div>
      </div>
    </section>
  );
}