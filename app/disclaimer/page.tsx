import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Financial Disclaimer | Propfident",
  description: "Important trading risk and financial disclaimer for Propfident platform users.",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 space-y-10 text-foreground font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="space-y-3 border-b border-border/60 pb-8">
        <Badge
          variant="outline"
          className="font-mono text-xs text-amber-700 dark:text-amber-400 border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/10"
        >
          RISK DISCLOSURE
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Financial Disclaimer</h1>
        <p className="text-xs font-mono text-muted-foreground">
          Last updated: September 15, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/5 text-amber-950 dark:text-amber-200/90 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed font-medium dark:font-normal">
            Trading futures, forex, commodities, and equities involves substantial risk of loss and is not suitable for every investor. Please read this disclosure carefully before using Propfident tools.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Not Financial Advice</h2>
          <p>
            Propfident is an independent software tool designed strictly for risk management, position sizing calculation, and trading execution analytics. <strong className="text-foreground">Propfident is not a financial advisor, broker-dealer, or signal provider.</strong> No content on this platform constitutes financial or investment advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Prop Firm Rule Compliance</h2>
          <p>
            Proprietary trading firms (including FTMO, Topstep, FundedNext, The 5%ers, and others) frequently update their rules regarding daily drawdown limits, trailing stops, news trading, and holding trades over weekends. Users are solely responsible for verifying that their trade parameters comply with their specific firm&apos;s legal contract.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Hypothetical & Historical Performance</h2>
          <p>
            Past performance analytics displayed in the Trade Playbook or Prop Match tool do not guarantee future results. Simulated trading results have inherent limitations.
          </p>
        </section>
      </div>
    </div>
  );
}