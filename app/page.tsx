"use client";

import Image from "next/image";
import { Timer, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Features } from "@/components/features";
import { Tools } from "@/components/tools";
import { Pricing } from "@/components/pricing";
import { FounderModal } from "@/components/founder-modal";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground transition-colors duration-200 font-sans">
      {/* Hero Section */}
      <section className="relative isolate flex-1 overflow-hidden px-4 pt-28 pb-20 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.png"
            alt="Propfident hero background"
            fill
            priority
            className="h-full w-full object-cover object-center opacity-100 transition-opacity duration-300 dark:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/75 dark:from-background/35 dark:via-background/35 dark:to-background/95" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center">
          <Badge variant="secondary" className="mb-8 gap-2 px-3 py-1 text-xs">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            Trusted in dev: 25+ funded accounts protected
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-[1.1]">
            Keep your funded accounts <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-400">
              safe and scalable.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 text-balance font-normal">
            The ultimate SaaS for prop firm traders. AI-driven planning, risk management, and lot sizing. Secure your spot before the public launch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <FounderModal>
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Claim 1 of 100 Lifetime Spots
                <ChevronRight className="w-4 h-4" />
              </Button>
            </FounderModal>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2" asChild>
              <a href="#tools">Explore Free Tools</a>
            </Button>
          </div>

          {/* Launch Timer Banner */}
          <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 p-5 rounded-lg border border-primary/30 bg-primary/5 w-full max-w-xl text-left">
            <div className="p-2.5 bg-primary/10 rounded-md text-primary shrink-0 border border-primary/30">
              <Timer className="w-6 h-6" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-medium text-sm text-foreground mb-0.5 font-sans">Founder's Lifetime Launch</h3>
              <p className="text-xs text-muted-foreground">Only 100 spots available for lifetime access without recurring fees.</p>
            </div>
            <div className="flex gap-2 text-center items-center justify-center font-mono">
              <div className="flex flex-col bg-background px-2.5 py-1 rounded border border-border">
                <span className="text-base font-bold text-foreground">14</span>
                <span className="text-[9px] text-muted-foreground uppercase">Days</span>
              </div>
              <span className="text-lg font-bold text-muted-foreground">:</span>
              <div className="flex flex-col bg-background px-2.5 py-1 rounded border border-border">
                <span className="text-base font-bold text-foreground">08</span>
                <span className="text-[9px] text-muted-foreground uppercase">Hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <Features />
      <Tools />
      <Pricing />

      {/* Footer */}
      <footer className="py-6 border-t border-border/40 relative z-10 text-center text-xs font-mono text-muted-foreground">
        <p>© Propfident. Built for prop firm traders.</p>
      </footer>
    </main>
  );
}