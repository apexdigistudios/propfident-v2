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
    <section className="py-14 border-t border-border/40 relative z-10 bg-background/50">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-10">
          Engineered for All Major Prop Trading Firms & Rulesets
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-5xl mx-auto">
          {propFirms.map((firm, idx) => (
            <div
              key={idx}
              className="flex h-16 w-36 sm:w-44 items-center justify-center rounded-xl border border-border/40 bg-card/40 p-3 shadow-xs backdrop-blur-sm grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:border-border/80 hover:bg-card/80"
            >
              <div className="relative h-8 w-full flex items-center justify-center">
                <Image
                  src={firm.logo}
                  alt={firm.name}
                  width={140}
                  height={40}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}