"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FounderModal } from "@/components/founder-modal";
import { Floating3DParticles } from "@/components/ui/floating-3d-particles";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
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

  const particleColor = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <section className="relative overflow-hidden border-b border-border/40 pt-20 pb-16 md:pt-28 md:pb-24 min-h-[520px]">
      {/* 1. Background Image - Mobile & Desktop optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/hero-bg.png"
          alt="Propfident Hero Background"
          fill
          priority
          className="h-full w-full object-cover object-center opacity-70 sm:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/65 to-background dark:from-background/40 dark:via-background/75 dark:to-background" />
      </div>

      {/* 2. Floating Particles Overlay */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden opacity-60 sm:opacity-100">
        {mounted && <Floating3DParticles color={particleColor} quantity={45} />}
      </div>

      {/* Content Layer */}
      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary mb-8">
          <Zap className="h-3.5 w-3.5 fill-primary" />
          <span>LIFETIME ACCESS: ONLY 14 SPOTS LEFT (FIRST 100 USERS)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Risk Management for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-400">
            Funded Traders
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.
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