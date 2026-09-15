"use client";

import Image from "next/image";

const propFirms = [
  { name: "Topstep", logo: "/logos/topstep-logo.png" },
  { name: "Goat Funded Trader", logo: "/logos/Goat-Funded-Trader-logo.png" },
  { name: "Aqua Funded", logo: "/logos/aqua-funded-logo.png" },
  { name: "FundedNext", logo: "/logos/fundednext-logo.png" },
  { name: "Alpha Capital", logo: "/logos/Alpha-Capital-prop-firm-logo.png" },
  { name: "The 5%ers", logo: "/logos/5ers-Logo.png" },
  { name: "FTMO", logo: "/logos/ftmo-logo.png" },
];

export function SupportedFirms() {
  return (
    <section className="py-14 border-t border-border/40 relative z-10 overflow-hidden bg-background/50">
      <div className="container mx-auto max-w-6xl px-4 text-center mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Engineered for All Major Prop Trading Firms &amp; Rulesets
        </p>
      </div>

      {/* Marquee Wrapper with Edge Gradient Mask */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-6 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] py-3 px-3">
          {propFirms.map((firm, idx) => (
            <div
              key={idx}
              className="flex h-20 w-48 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
            >
              <div className="relative h-10 w-full flex items-center justify-center">
                <Image
                  src={firm.logo}
                  alt={firm.name}
                  width={160}
                  height={50}
                  className="max-h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate Track for Continuous Loop */}
        <div
          aria-hidden="true"
          className="flex min-w-full shrink-0 items-center justify-around gap-6 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] py-3 px-3"
        >
          {propFirms.map((firm, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex h-20 w-48 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
            >
              <div className="relative h-10 w-full flex items-center justify-center">
                <Image
                  src={firm.logo}
                  alt={firm.name}
                  width={160}
                  height={50}
                  className="max-h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}