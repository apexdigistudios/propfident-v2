"use client";

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
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Engineered for All Major Prop Trading Firms & Rulesets
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {propFirms.map((firm, idx) => (
            <div
              key={idx}
              className="group flex h-24 w-full items-center justify-center rounded-xl border border-border/60 bg-card p-3 shadow-xs grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:border-primary/50 hover:shadow-md"
            >
              <img
                src={firm.logo}
                alt={firm.name}
                className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith(".png")) {
                    target.src = target.src.replace(".png", ".svg");
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}