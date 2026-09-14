import type { Metadata } from "next";
import Link from "next/link";
import { AITradePlanner } from "@/components/tools/ai-trade-planner";
import { FounderModal } from "@/components/founder-modal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI Trade Planner | Propfident",
  description: "Plan safer prop firm entries with AI-led trade structure reviews, R:R checks, and setup analysis.",
  openGraph: {
    title: "AI Trade Planner | Propfident",
    description: "Run an AI pre-flight audit before your next funded account trade.",
    url: "https://propfident.online/tools/ai-trade-planner",
  },
};

export default function AITradePlannerPage() {
  return (
    <main className="min-h-screen bg-background pt-16 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <span aria-hidden>←</span>
            <span>Back to Utility Hub</span>
          </Link>
          <div className="rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
            AI Planner
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-border/60 bg-gradient-to-r from-primary/10 via-background to-background p-6 shadow-[0_20px_60px_rgba(124,58,237,0.08)]">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Pre-Trade Analysis</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">AI Trade Planner</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Review your trading idea, match it to risk limits, and check your execution setup before a funded challenge trade.
          </p>
        </div>

        <AITradePlanner />

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
