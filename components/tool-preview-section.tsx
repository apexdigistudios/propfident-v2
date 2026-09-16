"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Safari } from "@/components/ui/safari";
import { Button } from "@/components/ui/button";
import { Calculator, Brain, Building2 } from "lucide-react";

type TabType = "calculator" | "planner" | "matcher";

export function ToolPreviewSection() {
  const [activeTab, setActiveTab] = useState<TabType>("calculator");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark theme on server/initial render to prevent hydration mismatch
  const currentTheme = mounted && resolvedTheme === "light" ? "light" : "dark";

  const tabConfig = {
    calculator: {
      url: "app.tradeai.com/calculator",
      videoSrc: `/calculator-demo-${currentTheme}.mp4`,
    },
    planner: {
      url: "app.tradeai.com/planner",
      videoSrc: `/planner-demo-${currentTheme}.mp4`,
    },
    matcher: {
      url: "app.tradeai.com/prop-match",
      videoSrc: `/prop-match-demo-${currentTheme}.mp4`,
    },
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 space-y-8">
      {/* Tab Switcher Controls */}
      <div className="flex flex-wrap justify-center items-center gap-2.5">
        <Button
          variant={activeTab === "calculator" ? "default" : "outline"}
          onClick={() => setActiveTab("calculator")}
          className="font-mono text-xs gap-2 transition-all rounded-full"
        >
          <Calculator className="h-4 w-4" />
          Risk & Lot Calculator
        </Button>
        <Button
          variant={activeTab === "planner" ? "default" : "outline"}
          onClick={() => setActiveTab("planner")}
          className="font-mono text-xs gap-2 transition-all rounded-full"
        >
          <Brain className="h-4 w-4" />
          AI Trade Planner
        </Button>
        <Button
          variant={activeTab === "matcher" ? "default" : "outline"}
          onClick={() => setActiveTab("matcher")}
          className="font-mono text-xs gap-2 transition-all rounded-full"
        >
          <Building2 className="h-4 w-4" />
          Prop Firm Matcher
        </Button>
      </div>

      {/* Safari Container rendering Video Demos */}
      <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-border/40 bg-background/50">
        <Safari
          key={`${activeTab}-${currentTheme}`}
          url={tabConfig[activeTab].url}
          videoSrc={tabConfig[activeTab].videoSrc}
          className="w-full"
        />
      </div>
    </section>
  );
}