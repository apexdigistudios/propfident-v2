import type { Metadata } from "next";
import Link from "next/link";
import { PropMatchEvaluator } from "@/components/tools/prop-match";
import { FounderModal } from "@/components/founder-modal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Prop Match Evaluator",
  description: "Compare your trading journal against FTMO, FundedNext, Funding Pips and other prop firms to find your best-fit challenge.",
  openGraph: {
    title: "Prop Match Evaluator | Propfident",
    description: "Find the best prop firm fit for your trading style with a pass-probability evaluation.",
    url: "https://propfident.online/tools/prop-match",
  },
};

export default function PropMatchPage() {
  return (
    <main className="min-h-screen bg-background pt-16 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <span aria-hidden>←</span>
            <span>Back to Utility Hub</span>
          </Link>
          <div className="rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
            Evaluation Tool
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-border/60 bg-gradient-to-r from-primary/10 via-background to-background p-6 shadow-[0_20px_60px_rgba(124,58,237,0.08)]">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Prop Fit</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Prop Match Evaluator</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Analyze your account history against the strictest prop firm rules and discover the highest probability fit for your trading strategy.
          </p>
        </div>

        <PropMatchEvaluator />

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Founder's Access</p>
              <h2 className="mt-2 text-2xl font-bold">Get lifetime access for $299</h2>
            </div>
            <FounderModal>
              <Button size="lg" className="min-w-[220px]">Claim Founder's Lifetime</Button>
            </FounderModal>
          </div>
        </div>
      </div>
    </main>
  );
}
