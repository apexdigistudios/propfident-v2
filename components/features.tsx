import { ShieldAlert, Calculator, Activity, Cpu } from "lucide-react";

const features = [
  {
    icon: ShieldAlert,
    title: "Drawdown Breach Safeguard",
    description:
      "Real-time monitoring of daily and trailing drawdowns to prevent unexpected account breaches before they happen.",
  },
  {
    icon: Calculator,
    title: "Dynamic Lot Size Calculator",
    description:
      "Precision position sizing calculated instantly from your exact prop firm balance, stop loss, and current equity.",
  },
  {
    icon: Activity,
    title: "Rule Violation Engine",
    description:
      "Automated alerts for news trading windows, weekend hold restrictions, and maximum open exposure caps.",
  },
  {
    icon: Cpu,
    title: "AI Trade Playbook",
    description:
      "Machine-learning analysis of your trading activity to identify hidden drawdown triggers and edge leaks.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-border/40 relative z-10 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-3">
            Built For Prop Traders
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-rounded">
            Engineered to defend capital and pass evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-surface/50 border border-border/60 hover:border-primary/50 transition-all duration-200 backdrop-blur-sm group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-rounded">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}