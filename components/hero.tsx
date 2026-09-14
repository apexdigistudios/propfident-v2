"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FounderModal } from "@/components/founder-modal";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden border-b border-border/40 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.png"
          alt="Propfident Hero Background"
          fill
          priority
          className="h-full w-full object-cover object-center opacity-100 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/75 dark:from-background/35 dark:via-background/35 dark:to-background/95 pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary mb-8">
          <Zap className="h-3.5 w-3.5 fill-primary" />
          <span>LIFETIME ACCESS: ONLY 14 SPOTS LEFT (FIRST 100 USERS)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Protect Your Prop Firm Accounts Before You Breach.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Real-time drawdown tracking, rule violation alerts, and automated risk calculations engineered for funded traders.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <FounderModal>
            <Button size="lg" className="w-full sm:w-auto font-mono text-sm gap-2">
              Claim Lifetime Access <ArrowRight className="h-4 w-4" />
            </Button>
          </FounderModal>
          <Button size="lg" variant="outline" className="w-full sm:w-auto font-mono text-sm">
            Explore Free Tools
          </Button>
        </div>

          <div className="mt-14 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>25+ Funded Accounts Protected in Beta</span>
          </div>
          <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded-md border border-border/50">
            <span>Offer Closes In:</span>
            <span className="text-foreground font-semibold">
              {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}