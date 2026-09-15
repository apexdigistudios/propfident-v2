"use client";

import Image from "next/image";
import { CheckCircle2, Crown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FounderModal } from "@/components/founder-modal";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative z-10 border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge
            variant="outline"
            className="font-mono text-xs px-3 py-1 border-primary/40 text-primary"
          >
            FOUNDER&apos;S ACCESS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Lock in lifetime access during our launch window. Zero monthly subscriptions.
          </p>
        </div>

        {/* Pricing Card with Lifetime Access Banner */}
        <Card className="max-w-xl mx-auto overflow-hidden border-primary/50 shadow-2xl bg-surface/60 backdrop-blur-md">
          {/* Lifetime Access Image Preview */}
          <div className="relative h-56 w-full border-b border-border/60 bg-muted/30 overflow-hidden flex items-center justify-center">
            <Image
              src="/card-images/lifetime-access.png"
              alt="Founder's Lifetime Access"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent dark:from-black/55" />
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-mono text-xs uppercase px-3 py-1 backdrop-blur-md">
                Limited to 100 Spots
              </Badge>
            </div>
          </div>

          <CardHeader className="p-6 sm:p-8 pb-2 text-center sm:text-left">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" /> Founder&apos;s Pass
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  One-time payment for lifetime access &amp; all future updates.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 py-4 space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-foreground">$299</span>
              <span className="text-sm text-muted-foreground line-through">$499</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold ml-2">
                SAVE 70%
              </span>
            </div>

            <div className="space-y-3 pt-2 font-mono text-xs text-muted-foreground border-t border-border/60">
              {[
                "Unlimited Prop Firm Accounts & MT4/MT5 Integration",
                "Real-Time Drawdown & Max Daily Shield",
                "Multi-Channel Telegram & Social Platform Notifications",
                "Trade Leak & Over-Leverage Analytics",
                "Full Access to The 7-Figure Funded Trader Playbook",
                "All Future Platform Core Updates Included",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="p-6 sm:p-8 pt-2">
            <FounderModal>
              <Button size="lg" className="w-full gap-2 text-sm font-semibold shadow-xl">
                <Zap className="h-4 w-4 fill-current text-amber-500 dark:text-amber-400" /> Claim Lifetime Access Now
              </Button>
            </FounderModal>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}