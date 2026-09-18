import { SlidersHorizontal, CheckCircle2, Building2, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const matchFirms = [
  {
    name: "FTMO",
    matchScore: "98%",
    rules: "News trading allowed, No weekend holding restrictions on swing accounts.",
    maxFunding: "$200,000",
    profitSplit: "Up to 90%",
  },
  {
    name: "FundedNext",
    matchScore: "94%",
    rules: "Raw spreads, 15% profit share from evaluation phase.",
    maxFunding: "$300,000",
    profitSplit: "15% - 90%",
  },
  {
    name: "The Funded Trader",
    matchScore: "89%",
    rules: "Flexible drawdowns, high leverage options available.",
    maxFunding: "$400,000",
    profitSplit: "Up to 90%",
  },
];

export default function PropMatcherPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-2xl font-black text-foreground">
              Prop Match Engine
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Find evaluation firms tailored to your execution strategy and risk profile.
          </p>
        </div>
        <Button size="sm" className="font-mono text-xs gap-1.5 self-start sm:self-auto">
          <Sparkles className="h-3.5 w-3.5" /> Re-run Matching Model
        </Button>
      </div>

      {/* Match Results List */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground px-1">
          Recommended Prop Firms
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {matchFirms.map((firm) => (
            <div
              key={firm.name}
              className="p-6 rounded-2xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-foreground">{firm.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
                      {firm.matchScore} Match
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                    {firm.rules}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t md:border-t-0 border-border pt-4 md:pt-0">
                <div className="space-y-1 text-left md:text-right">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Funding Cap</p>
                  <p className="text-xs font-bold text-foreground font-mono">{firm.maxFunding}</p>
                </div>

                <div className="space-y-1 text-left md:text-right">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Profit Split</p>
                  <p className="text-xs font-bold text-foreground font-mono">{firm.profitSplit}</p>
                </div>

                <Button variant="outline" size="sm" className="font-mono text-xs gap-1.5 w-full sm:w-auto">
                  View Rules <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}