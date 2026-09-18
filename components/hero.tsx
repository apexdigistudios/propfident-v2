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
    <section className="relative w-full border-b border-border/40 bg-background pt-10 pb-12 sm:pt-24 sm:pb-20 overflow-hidden">
      {/* Ambient Mobile Background Image */}
      <div className="block sm:hidden absolute inset-0 pointer-events-none z-0 opacity-20">
        <Image
          src="/hero-bg2.png"
          alt="Propfident Mobile Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Ambient Desktop Background Image */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-0 opacity-35">
        <Image
          src="/hero-bg.png"
          alt="Propfident Desktop Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Dark Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Banner Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-mono text-primary mb-6 sm:mb-8">
          <Zap className="h-3.5 w-3.5 fill-primary shrink-0" />
          <span className="truncate">LIFETIME ACCESS: ONLY 14 SPOTS LEFT (FIRST 100 USERS)</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Never Breach Your Prop Firm Account{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-400">
            Again
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          <FounderModal>
            <Button size="lg" className="w-full sm:w-auto font-mono text-xs sm:text-sm gap-2 h-11 sm:h-12 px-6">
              Claim Lifetime Access <ArrowRight className="h-4 w-4" />
            </Button>
          </FounderModal>
          <Button size="lg" variant="outline" className="w-full sm:w-auto font-mono text-xs sm:text-sm h-11 sm:h-12 px-6">
            Explore Free Tools
          </Button>
        </div>

        {/* Proof & Timer Bar */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 max-w-3xl mx-auto text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>25+ Funded Accounts Protected in Beta</span>
          </div>
          <div className="flex items-center gap-2.5 bg-card/80 px-3.5 py-1.5 rounded-md border border-border/50">
            <span>Offer Closes In:</span>
            <span className="text-foreground font-semibold">
              {String(timeLeft.hours).padStart(2, "0")}h :{" "}
              {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}