"use client";

import Image from "next/image";

const propFirms = [
  { name: "Topstep", logo: "/logos/topstep-logo.png" },
  { name: "Goat Funded Trader", logo: "/logos/Goat-Funded-Trader-logo.jpg" },
  { name: "Aqua Funded", logo: "/logos/aqua-funded-logo.webp" },
  { name: "FundedNext", logo: "/logos/fundednext-logo.webp" },
  { name: "Alpha Capital", logo: "/logos/Alpha-Capital-prop-firm-logo.webp" },
  { name: "The 5%ers", logo: "/logos/5ers-Logo.png" },
  { name: "FTMO", logo: "/logos/ftmo-logo.png" },
];

export function SupportedFirms() {
  return (
    <section className="py-12 border-t border-border/40 relative z-10 overflow-hidden bg-background/50">
      <div className="container mx-auto max-w-6xl px-4 text-center mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Engineered for All Major Prop Trading Firms & Rulesets
        </p>
      </div>

      {/* Marquee Wrapper with Edge Gradient Mask */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] py-2">
          {propFirms.map((firm, idx) => (
            <div
              key={idx}
              className="flex h-14 w-40 items-center justify-center shrink-0 rounded-lg border border-border/40 bg-background/60 px-4 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={firm.logo}
                alt={firm.name}
                width={140}
                height={40}
                className="h-11 w-auto max-w-32 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicate Track for Seamless Loop */}
        <div
          aria-hidden="true"
          className="flex min-w-full shrink-0 items-center justify-around gap-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] py-2"
        >
          {propFirms.map((firm, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex h-14 w-40 items-center justify-center shrink-0 rounded-lg border border-border/40 bg-background/60 px-4 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={firm.logo}
                alt={firm.name}
                width={140}
                height={40}
                className="h-11 w-auto max-w-32 object-contain"
              />
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