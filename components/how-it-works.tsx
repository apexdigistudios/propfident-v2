"use client";

import { 
  Link2, 
  SlidersHorizontal, 
  Calculator, 
  ShieldAlert, 
  BrainCircuit, 
  Rocket 
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect Account",
    description: "Link your MT4, MT5, or prop firm terminal via secure API synchronization in seconds.",
    icon: Link2,
  },
  {
    step: "02",
    title: "Select Firm Ruleset",
    description: "Choose your prop firm (FTMO, FundedNext, Alpha, etc.) to instantly import exact drawdown rules.",
    icon: SlidersHorizontal,
  },
  {
    step: "03",
    title: "Dynamic Position Sizing",
    description: "Calculate exact lot sizes before every trade based on real-time equity and maximum allowable loss.",
    icon: Calculator,
  },
  {
    step: "04",
    title: "Active Risk Shield",
    description: "Monitor daily loss limits, trailing drawdown boundaries, and profit buffers with live alerts.",
    icon: ShieldAlert,
  },
  {
    step: "05",
    title: "AI Trade Journaling",
    description: "Log setups automatically and let AI analyze execution metrics to prevent revenge trading.",
    icon: BrainCircuit,
  },
  {
    step: "06",
    title: "Execute & Scale Capital",
    description: "Trade with complete confidence, protect your funded accounts, and scale up allocation.",
    icon: Rocket,
  },
];

export function HowItWorks() {
  const repeatingText = "ENGINEERED FOR ALL MAJOR PROP TRADING FIRMS & RULESETS • ";

  return (
    <section className="py-16 sm:py-20 bg-background border-y border-border/40 overflow-hidden relative">
      {/* CSS Keyframe Animation Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-fast {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-slow:hover,
        .animate-marquee-fast:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Banner: Moving Text Marquee */}
      <div className="w-full bg-primary/10 border-y border-primary/20 py-3 overflow-hidden mb-12 sm:mb-16">
        <div className="animate-marquee-slow flex gap-4 sm:gap-6">
          <div className="flex shrink-0 items-center whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm font-mono font-bold tracking-widest text-primary uppercase mr-4"
              >
                {repeatingText}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={`dup-${i}`}
                className="text-xs sm:text-sm font-mono font-bold tracking-widest text-primary uppercase mr-4"
              >
                {repeatingText}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase">
          How Propfident Works
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-mono">
          From account connection to scaling $1M+ in funded allocation
        </p>
      </div>

      {/* Cards Horizontal Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Blur for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-slow py-4">
          {/* First Set of Cards */}
          <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-xl border border-border/60 bg-card/50 p-5 sm:p-6 shadow-sm hover:border-primary/40 hover:bg-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-2.5 py-1 rounded-md">
                        STEP {item.step}
                      </span>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-sans font-bold text-base text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Duplicated Set of Cards for Seamless Looping */}
          <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={`dup-${item.step}`}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-xl border border-border/60 bg-card/50 p-5 sm:p-6 shadow-sm hover:border-primary/40 hover:bg-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-2.5 py-1 rounded-md">
                        STEP {item.step}
                      </span>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-sans font-bold text-base text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}