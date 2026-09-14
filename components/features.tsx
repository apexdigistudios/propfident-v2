import { Shield, CheckCircle2, Lock, Cpu, ArrowRight, Zap } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-border/40 relative z-10 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-3">
            Core Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Built from the ground up for strict evaluation parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-surface/50 border border-border/80">
            <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
              <Shield className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1 font-sans">Drawdown Shield</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Real-time synchronization with MT4/MT5/Ctrader feeds to block trades instantly if daily loss caps are approached.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/50 border border-border/80">
            <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
              <Cpu className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1 font-sans">AI Trade Playbook</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Analyzes execution history to flag psychological tilt, over-leveraging, and high-risk session timings.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/50 border border-border/80">
            <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1 font-sans">Rule Enforcement</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pre-configured profiles for FTMO, FundedNext, The5%ers, and Apex to prevent accidental rule infractions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}