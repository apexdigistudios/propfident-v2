import { Calculator, ArrowUpRight, Percent, Scale } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Prop Firm Position Sizer",
    description:
      "Calculate precise lot sizes based on exact equity, risk percentage, and account drawdown rules.",
    badge: "Interactive",
  },
  {
    icon: Percent,
    title: "Daily Max Drawdown Simulator",
    description:
      "Simulate equity swings to ensure your daily loss limits remain untouched under volatile conditions.",
    badge: "Calculator",
  },
  {
    icon: Scale,
    title: "Rule & Limit Comparator",
    description:
      "Side-by-side comparison of drawdown rules across top prop firms like FTMO, FundedNext, and 5%ers.",
    badge: "Database",
  },
];

export function Tools() {
  return (
    <section id="tools" className="py-20 sm:py-28 border-t border-border/40 relative z-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-3">
              Utility Hub
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Free tools for every funded trader.
            </p>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            No sign-up required. Access browser-based utilities designed specifically for prop firm evaluation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/50 transition-all duration-200 group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 font-mono flex items-center gap-1.5 group-hover:text-primary transition-colors">
                    {tool.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}