import { Check, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const features = [
  "Lifetime access to Propfident v2 core engine",
  "Real-time daily & trailing drawdown alerts",
  "Dynamic position size & lot size calculator",
  "Rule violation monitoring (FTMO, FundedNext, etc.)",
  "AI Trade Playbook analytics & leak detector",
  "Unlimited trading accounts connected",
  "Priority Discord channel & direct developer support",
  "All future platform updates & integrations included",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-border/40 relative z-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-3">
            Founder's Launch Offer
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            One-time payment. Zero subscription fees.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Lock in lifetime access before Propfident transitions to a $49/month recurring model.
          </p>
        </div>

        <div className="max-w-xl mx-auto rounded-2xl bg-surface/60 border border-primary/40 p-8 sm:p-10 shadow-[0_0_50px_rgba(124,58,237,0.15)] relative overflow-hidden backdrop-blur-md">
          {/* Top highlight badge */}
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground font-mono text-[10px] uppercase font-bold px-4 py-1 rounded-bl-lg tracking-wider">
            14 / 100 Spots Left
          </div>

          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-primary font-semibold">
            <Zap className="h-4 w-4 fill-primary" />
            <span>FOUNDER'S TIER</span>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-extrabold text-foreground font-mono">$199</span>
            <span className="text-sm text-muted-foreground line-through font-mono">$499</span>
            <span className="text-xs text-muted-foreground ml-2">/ lifetime</span>
          </div>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Full unrestricted platform access for active prop firm traders seeking account longevity.
          </p>

          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground py-4 rounded-lg font-mono text-sm font-semibold transition-all shadow-[0_0_25px_rgba(124,58,237,0.4)] mb-8">
            Claim Your Lifetime Spot <ArrowRight className="h-4 w-4" />
          </button>

          <div className="space-y-3 pt-6 border-t border-border/40">
            <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider block mb-4">
              Everything included:
            </span>
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>30-day money-back guarantee. No questions asked.</span>
          </div>
        </div>
      </div>
    </section>
  );
}