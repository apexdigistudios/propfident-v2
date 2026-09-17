"use client";

import { useState } from "react";
import { RoadmapBenefitsGrid } from "@/components/millionaire-roadmap/teaser/roadmap-benefits-grid";
import { RoadmapStagePreview } from "@/components/millionaire-roadmap/teaser/roadmap-stage-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, HelpCircle, Sparkles, Users } from "lucide-react";

function RoadmapTeaserHero() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 text-center space-y-5">
      <Badge
        variant="outline"
        className="border-purple-500/30 text-purple-600 dark:text-purple-400 font-mono text-xs"
      >
        THE MILLIONAIRE ROADMAP
      </Badge>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
        Your Path to Consistent Prop Trading Growth
      </h1>
      <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
        A structured roadmap designed to help prop traders build the skills,
        systems, and discipline needed for long-term success.
      </p>
    </section>
  );
}

export default function MillionaireRoadmapTeaserPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/20 selection:text-purple-400">
      {/* 1. Coming Soon Hero Section */}
      <RoadmapTeaserHero />

      {/* 2. Benefits & Ecosystem Value Grid */}
      <RoadmapBenefitsGrid />

      {/* 3. Stage Sneak Peek & Interactive Curriculum */}
      <RoadmapStagePreview />

      {/* 4. Frequently Asked Questions */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 border-t border-border/40 space-y-6">
        <div className="text-center space-y-2">
          <Badge
            variant="outline"
            className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400"
          >
            FAQ
          </Badge>
          <h2 className="text-2xl font-extrabold font-sans uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-5 space-y-2">
              <h3 className="font-bold text-xs text-foreground font-sans flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500 shrink-0" />
                When does the Millionaire Roadmap launch?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We are actively rolling out access in batches. Waitlist members get priority access and launch discounts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-5 space-y-2">
              <h3 className="font-bold text-xs text-foreground font-sans flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500 shrink-0" />
                Is this included with standard Propfident tools?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, early roadmap tiers will directly integrate with your active Propfident tools like Position Sizer and Prop Match.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. Final Waitlist Conversion Card */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
        <Card className="border-purple-500/40 bg-gradient-to-r from-purple-950/30 via-card to-purple-900/20 overflow-hidden relative">
          <CardContent className="p-8 sm:p-12 text-center space-y-5 relative z-10">
            <Badge
              variant="outline"
              className="border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" /> VIP EARLY ACCESS
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-black text-foreground font-sans uppercase">
              Get Notified Before Official Public Release
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Join 1,400+ prop traders securing early access to the Millionaire Roadmap.
            </p>

            <div className="max-w-md mx-auto pt-2">
              {submitted ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  You're on the early access list!
                </div>
              ) : (
                <form
                  onSubmit={handleBottomSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <Input
                    type="email"
                    required
                    placeholder="Enter your trader email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-background/80 border-border/80 text-xs font-sans placeholder:text-muted-foreground focus-visible:ring-purple-500"
                  />
                  <Button
                    type="submit"
                    className="h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs shrink-0 gap-2 shadow-lg shadow-purple-600/20"
                  >
                    Reserve Access <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}

              <div className="flex items-center justify-center gap-2 mt-3 font-mono text-[11px] text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-purple-500" />
                <span>Zero spam. Unsubscribe anytime.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}