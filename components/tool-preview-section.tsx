"use client";

import { useState } from "react";
import { Safari } from "@/components/ui/safari";
import { Button } from "@/components/ui/button";
import { Calculator, Brain } from "lucide-react";

export function ToolPreviewSection() {
  const [activeTab, setActiveTab] = useState<"calculator" | "planner">("calculator");

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 space-y-8">
      {/* Tab Switcher Controls */}
      <div className="flex justify-center items-center gap-3">
        <Button
          variant={activeTab === "calculator" ? "default" : "outline"}
          onClick={() => setActiveTab("calculator")}
          className="font-mono text-xs gap-2 transition-all"
        >
          <Calculator className="h-4 w-4" />
          Risk & Lot Calculator
        </Button>
        <Button
          variant={activeTab === "planner" ? "default" : "outline"}
          onClick={() => setActiveTab("planner")}
          className="font-mono text-xs gap-2 transition-all"
        >
          <Brain className="h-4 w-4" />
          AI Trade Planner
        </Button>
      </div>

      {/* Safari Container rendering Video Demos */}
      <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-border/40 bg-background/50">
        <Safari
          url={activeTab === "calculator" ? "app.tradeai.com/calculator" : "app.tradeai.com/planner"}
          videoSrc={
            activeTab === "calculator"
              ? "/calculator-demo.mp4"
              : "/planner-demo.mp4"
          }
          className="w-full"
        />
      </div>
    </section>
  );
}