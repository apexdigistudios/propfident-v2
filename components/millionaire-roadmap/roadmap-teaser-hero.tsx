"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Lock, Loader2, Sparkles, Users } from "lucide-react";

interface RoadmapTeaserHeroProps {
  onSubscribe?: (email: string, buttonEl?: HTMLElement | null) => void;
  loading?: boolean;
}

export function RoadmapTeaserHero({ onSubscribe, loading = false }: RoadmapTeaserHeroProps) {
  const [email, setEmail] = useState("");
  const heroSubmitRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && onSubscribe) {
      onSubscribe(email.trim(), heroSubmitRef.current);
      setEmail("");
    }
  };

  return (
    <section className="relative w-full border-b border-border/40 bg-background pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Background Image - Mobile View */}
      <div className="block sm:hidden absolute inset-0 pointer-events-none z-0">
        <Image
          src="/roadmap-hero-bg2.png"
          alt="Roadmap Mobile Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Background Image - Desktop View */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
        <Image
          src="/roadmap-hero-bg.png"
          alt="Roadmap Desktop Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 border-primary/40 bg-primary/10 text-primary font-mono text-xs px-3.5 py-1 rounded-full uppercase tracking-wider"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Coming Soon
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-foreground font-sans uppercase leading-tight">
            The Millionaire Roadmap Is Coming to Propfident
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-base text-primary font-semibold tracking-wide uppercase">
            From $0 → $1M+ in Funded Allocation Capital
          </p>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Stop guessing your next move in prop trading. We're building a structured, step-by-step operating system designed to take you from unassigned to managing $1M+ across multiple firm allocations.
          </p>

          {/* Waitlist Form */}
          <div className="pt-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                required
                placeholder="Enter your trader email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="h-11 bg-card/80 border-border/80 text-xs font-sans placeholder:text-muted-foreground focus-visible:ring-primary"
              />
              <Button
                ref={heroSubmitRef}
                type="submit"
                disabled={loading}
                className="h-11 px-6 bg-primary hover:bg-primary text-white font-mono text-xs shrink-0 gap-2 shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Join Waitlist <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-3 font-mono text-[11px] text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span>1,420+ traders waiting for launch</span>
            </div>
          </div>
        </div>

        {/* Visual Teaser Node Banner */}
        <div className="mt-14 rounded-2xl border border-border/60 bg-card/40 p-6 relative overflow-hidden">
          <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground bg-background/80 px-2.5 py-1 rounded-md border border-border/40">
            <Lock className="h-3 w-3 text-primary" />
            IN DEVELOPMENT
          </div>

          <p className="font-mono text-xs text-muted-foreground uppercase text-center mb-6">
            Framework Teaser Preview
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { num: "01", name: "Foundation", range: "$0 - $10K" },
              { num: "02", name: "First Funding", range: "$10K - $100K" },
              { num: "03", name: "Scaling", range: "$100K - $250K" },
              { num: "04", name: "Capital Stack", range: "$250K - $500K" },
              { num: "05", name: "$1M+ Operator", range: "$500K - $1M+" },
            ].map((stage) => (
              <div
                key={stage.num}
                className="flex flex-col items-center p-3 rounded-xl border border-primary/20 bg-primary/5 text-center relative group"
              >
                <span className="font-mono text-[10px] text-primary font-bold">
                  STAGE {stage.num}
                </span>
                <span className="font-sans text-xs font-bold text-foreground my-1">
                  {stage.name}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {stage.range}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}