"use client";

import Image from "next/image";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Lock,
  ShieldCheck,
  Target,
  Zap,
  TrendingUp,
  Coins,
  ShieldAlert,
  Layers,
  Sparkles,
  ArrowRight,
  Sliders,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const playbookModules = [
  {
    num: "01",
    title: "THE FUNDED TRADER MINDSET",
    headline: "Stop looking at the big number. Start looking at the risk.",
    description:
      "A $200K account can make you feel rich. But if the firm's drawdown limit is $10K... that's the number you need to respect. Learn how to think about funded capital in a way that puts drawdown first.",
    icon: Target,
  },
  {
    num: "02",
    title: "THE RISK ENGINE",
    headline: "Your biggest job isn't making money. It's staying in the game.",
    description:
      "Master the framework behind risk per trade, available drawdown, daily loss limits, profit buffers, risk reduction, position sizing, and account protection.",
    icon: Zap,
  },
  {
    num: "03",
    title: "BUILD YOUR PROFIT BUFFER",
    headline: "A profit isn't always money you should take out right away.",
    description:
      "Learn why a larger buffer gives your account room to handle normal losses. Reframe your workflow into Profit → Buffer → Protection → Payout instead of starting over each time.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "SCALE ACROSS MULTIPLE FIRMS",
    headline: "Manage several accounts as one unified portfolio.",
    description:
      "Cover multi-firm allocation, account concentration, portfolio exposure, firm rule differences, trade replication, and position-size adjustments across $1M+ in aggregate funding.",
    icon: Layers,
  },
  {
    num: "05",
    title: "HIGH-CONVICTION EXECUTION",
    headline: "You don't need to take every setup. You need a process.",
    description:
      "A structured approach to session-based trading, liquidity sweeps, trade management, risk-to-reward, scaling, breakeven rules, and holding parameters. Less random trading, more planned execution.",
    icon: Sliders,
  },
  {
    num: "06",
    title: "THE PAYOUT SYSTEM",
    headline: "Getting funded is not the finish line. Getting paid is.",
    description:
      "Execute a simple 4-step payout routine: CLEAR → LOCK → DISBURSE → ALLOCATE. Handle open trades, pending orders, and account buffers so withdrawals reinforce your growth.",
    icon: Coins,
  },
  {
    num: "07",
    title: "THE TERMINAL LOCKDOWN",
    headline: "Sometimes the most profitable trade is closing the platform.",
    description:
      "Hit your target? Stop. Hit your loss limit? Stop. Maximum losses for the day? Stop. The Terminal Lockdown Protocol removes emotion from knowing when to walk away before giving back profits.",
    icon: ShieldAlert,
  },
];

const checklistItems = [
  "Funded trader mindset",
  "Drawdown protection",
  "Risk architecture",
  "Position sizing",
  "Profit buffers",
  "Multi-firm scaling",
  "Portfolio risk",
  "Trade execution",
  "Trade management",
  "Payout routines",
  "Capital allocation",
  "Daily execution rules",
  "Terminal Lockdown Protocol",
];

export default function PlaybookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/20 selection:text-purple-400">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-20">
        
        {/* HERO SECTION: Left Description & Right Book Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Copy & Description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge
              variant="outline"
              className="font-mono text-xs border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1 uppercase tracking-wider"
            >
              <BookOpen className="h-3.5 w-3.5 mr-1.5" />
              Official Digital Blueprint
            </Badge>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-foreground leading-[1.1]">
                THE SEVEN-FIGURE FUNDED TRADER PLAYBOOK
              </h1>
              <p className="text-base sm:text-xl font-semibold text-purple-600 dark:text-purple-400 font-sans">
                You Don't Need Another Trading Strategy.
                <br className="hidden sm:inline" /> You Need A Better Way To Protect Your Funded Account.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                You can have access to a $100K, $200K, or $500K funded account...
                and still lose it in a few bad trades.
              </p>
              <p>
                <strong className="text-foreground">Why?</strong> Because most traders focus on the account size.
                They see <span className="font-mono text-foreground font-bold">$200,000</span> and think:{" "}
                <em className="text-foreground">“I can risk $2,000.”</em>
              </p>
              <p className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 text-foreground font-medium">
                But the number that matters most is not the $200K on the screen.{" "}
                <strong className="text-purple-600 dark:text-purple-400">It's your drawdown.</strong> That's the money you can actually lose before the account is gone. Once you understand that, you start trading funded accounts in a completely different way.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <CheckoutModalButton text="Get The Playbook For $27" size="lg" className="h-12 px-8 text-xs sm:text-sm" />
              <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Instant PDF Access • $27 One-time</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Book Card from public/playbook */}
          <div className="lg:col-span-5 flex justify-center">
            <Card className="w-full max-w-md overflow-hidden border-purple-500/40 bg-card/80 backdrop-blur-md shadow-2xl relative group">
              <div className="absolute top-3 right-3 z-20">
                <Badge className="bg-purple-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                  Digital Edition
                </Badge>
              </div>

              {/* Book Image Preview */}
              <div className="relative h-72 sm:h-80 w-full bg-gradient-to-b from-purple-950/40 to-background/80 flex items-center justify-center p-6 border-b border-border/60">
                <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl border border-purple-500/30">
                  <Image
                    src="/playbook/playbook-cover.png"
                    alt="The Seven-Figure Funded Trader Playbook"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <div>
                    <h3 className="font-bold font-sans text-sm text-foreground">
                      The 7-Figure Funded Trader Playbook
                    </h3>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      PDF Digital Guide • Instant Download
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xl font-extrabold text-purple-600 dark:text-purple-400">
                      $27
                    </span>
                    <span className="block font-mono text-[9px] text-muted-foreground line-through">
                      $97
                    </span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                    <span>7 Core Execution Modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                    <span>Terminal Lockdown Protocol</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                    <span>Multi-Firm Scale Matrix</span>
                  </div>
                </div>

                <CheckoutModalButton text="Claim Playbook Copy ($27)" className="w-full h-11" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEM */}
        <section className="space-y-8 border-t border-border/40 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="outline" className="font-mono text-xs border-red-500/30 text-red-500">
              THE CYCLE
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
              Here's The Problem...
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Most traders know how to find trades and pass challenges. But then something happens...
            </p>
          </div>

          <Card className="border-red-500/20 bg-card/60 backdrop-blur-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <p className="text-foreground font-semibold">
                  They get funded... and start trading like they have unlimited room:
                </p>
                <ul className="space-y-2 font-mono text-xs text-foreground">
                  <li className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-4 w-4 shrink-0" /> They increase size impulsively.
                  </li>
                  <li className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-4 w-4 shrink-0" /> They chase losses and overtrade.
                  </li>
                  <li className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-4 w-4 shrink-0" /> They give back earned profit buffers.
                  </li>
                  <li className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-4 w-4 shrink-0" /> They ignore daily drawdown limits.
                  </li>
                </ul>
                <p className="pt-2">
                  And eventually... the account is gone. They buy another challenge and repeat the cycle.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-background/80 border border-border/60 text-center space-y-3">
                <ShieldAlert className="h-8 w-8 text-red-400 mx-auto" />
                <h3 className="font-bold font-sans text-sm uppercase">The Reality Check</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The problem isn't always finding a better entry. <br />
                  <strong className="text-foreground">It's learning how to survive.</strong>
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 3: WHAT IF YOU STOPPED... */}
        <section className="space-y-8 border-t border-border/40 pt-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="outline" className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400">
              A NEW FRAMEWORK
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
              What If You Stopped Trading Your Funded Account Like A Normal Account?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Imagine opening your dashboard every morning with absolute clarity:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Exactly how much drawdown you have left.",
              "Exactly how much you should risk per trade.",
              "When you should stop trading for the day.",
              "How to protect and grow your profit buffer.",
              "How to handle and prepare for payouts.",
              "How to manage and scale multiple funded accounts.",
            ].map((point, index) => (
              <Card key={index} className="border-border/60 bg-card/60">
                <CardContent className="p-5 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    {point}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 4: INSIDE THE PLAYBOOK (01 TO 07) */}
        <section className="space-y-10 border-t border-border/40 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="outline" className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-3 w-3 mr-1" /> CURRICULUM
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
              Inside The Playbook
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              7 practical, non-fluff modules built specifically for managing and retaining funded prop capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playbookModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Card
                  key={mod.num}
                  className="border-border/60 bg-card/60 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <CardHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                        MODULE {mod.num}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold font-sans uppercase tracking-tight">
                      {mod.title}
                    </CardTitle>
                    <p className="font-semibold text-xs text-foreground mt-1">
                      {mod.headline}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {mod.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: CAPITAL OPERATOR MINDSET */}
        <section className="border-t border-border/40 pt-16">
          <Card className="border-purple-500/40 bg-gradient-to-r from-purple-950/30 via-card to-background p-8 sm:p-12 text-center space-y-6">
            <Badge variant="outline" className="font-mono text-xs border-purple-500/40 text-purple-600 dark:text-purple-400">
              PARADIGM SHIFT
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase max-w-3xl mx-auto">
              And Then... You Start Thinking Like A Capital Operator.
            </h2>
            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-left pt-2">
              <div className="p-4 rounded-xl border border-border/60 bg-background/50 space-y-1">
                <span className="text-muted-foreground line-through block">
                  “How do I pass my next challenge?”
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-bold block">
                  → “How do I protect the capital I already have?”
                </span>
              </div>
              <div className="p-4 rounded-xl border border-border/60 bg-background/50 space-y-1">
                <span className="text-muted-foreground line-through block">
                  “How big can I size this trade?”
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-bold block">
                  → “How do I build a bigger buffer & scale?”
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 6: WHO IS THIS FOR / NOT FOR */}
        <section className="space-y-8 border-t border-border/40 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
              Who Is This For?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* THIS IS FOR YOU IF */}
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-base font-bold font-sans uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> THIS IS FOR YOU IF:
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {[
                    "You are preparing for a prop-firm challenge.",
                    "You already have an active funded account.",
                    "You are managing multiple funded accounts.",
                    "You keep losing accounts after getting close to payouts.",
                    "You make profits but end up giving them back.",
                    "You struggle with overtrading & emotional execution.",
                    "You don't have a clear, structured payout process.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* THIS IS NOT FOR YOU IF */}
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-base font-bold font-sans uppercase text-red-600 dark:text-red-400 flex items-center gap-2">
                  <XCircle className="h-5 w-5" /> THIS IS NOT FOR YOU IF:
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {[
                    "You're looking for trade signals or entry shortcuts.",
                    "You're looking for a 'guaranteed' holy grail strategy.",
                    "You want someone to trade your account for you.",
                    "You want a get-rich-quick promise without discipline.",
                    "You expect guaranteed $1M results without putting in work.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground">
                      <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 7: THE ROAD TO $1M+ */}
        <section className="space-y-8 border-t border-border/40 pt-16 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <Badge variant="outline" className="font-mono text-xs border-purple-500/30 text-purple-600 dark:text-purple-400">
              SYSTEMATIC PROGRESSION
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
              The Road To $1M+
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Don't rush the next level. Build the system first. Then grow.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono font-bold text-sm sm:text-base">
            {["$10K", "$50K", "$100K", "$250K", "$500K", "$1M+"].map((tier, idx, arr) => (
              <div key={tier} className="flex items-center gap-3 sm:gap-4">
                <span className="px-4 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  {tier}
                </span>
                {idx < arr.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground font-mono max-w-lg mx-auto">
            * The seven-figure goal refers to aggregate allocated prop-firm capital.
          </p>
        </section>

        {/* SECTION 8: WHAT YOU GET TODAY & FINAL CHECKOUT */}
        <section className="space-y-8 border-t border-border/40 pt-16">
          <Card className="border-purple-500/50 bg-card/90 shadow-2xl overflow-hidden relative">
            <div className="p-8 sm:p-12 space-y-8">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <Badge variant="outline" className="font-mono text-xs border-purple-500/40 text-purple-600 dark:text-purple-400">
                  COMPLETE PACKAGE
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-sans uppercase">
                  What You Get Today
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Full digital guide covering everything you need to start building a structured approach to funded trading.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs max-w-4xl mx-auto border-y border-border/60 py-6">
                {checklistItems.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
                    <span>✓ {item}</span>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4 max-w-md mx-auto pt-2">
                <div className="space-y-1">
                  <div className="font-mono text-xs uppercase text-muted-foreground tracking-widest">
                    ONE BOOK. ONE SYSTEM.
                  </div>
                  <div className="text-4xl font-black font-sans text-purple-600 dark:text-purple-400">
                    $27
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    No monthly payment • No hidden fees • Lifetime Access
                  </div>
                </div>

                <CheckoutModalButton text="GET THE PLAYBOOK FOR $27" size="lg" className="w-full h-12 text-sm" />

                <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-muted-foreground pt-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>256-Bit Encrypted Whop Checkout</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 9: CLOSING MOTIVATIONAL STANDARD */}
        <section className="text-center max-w-2xl mx-auto space-y-4 border-t border-border/40 pt-16 pb-8">
          <h3 className="text-xl sm:text-2xl font-black font-sans uppercase text-foreground">
            YOUR FUNDED ACCOUNT IS NOT YOUR PAYCHECK.
            <br />
            <span className="text-purple-600 dark:text-purple-400">IT'S CAPITAL YOU HAVE TO PROTECT.</span>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            You don't need to trade bigger just because the account is bigger. You need to manage risk better. Build your buffer. Protect your drawdown. Take your payouts. Then scale.
          </p>
          <div className="font-mono text-xs font-bold text-foreground uppercase tracking-widest pt-2">
            — THAT'S THE SEVEN-FIGURE STANDARD.
          </div>
          <div className="pt-4">
            <CheckoutModalButton text="GET THE PLAYBOOK FOR $27" className="px-8 h-12 text-xs" />
          </div>
        </section>

      </div>
    </div>
  );
}

{/* WHOP CHECKOUT MODAL BUTTON COMPONENT */}
function CheckoutModalButton({
  text,
  size = "default",
  className = "",
}: {
  text: string;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={size}
          className={`bg-purple-600 hover:bg-purple-700 text-white font-mono font-bold uppercase tracking-wider shadow-lg shadow-purple-600/20 gap-2 ${className}`}
        >
          <Lock className="h-4 w-4" />
          <span>{text}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-[92vw] max-h-[90vh] p-0 overflow-hidden sm:rounded-2xl border-border bg-background flex flex-col">
        <DialogHeader className="p-4 border-b border-border/60 bg-surface/80 backdrop-blur-sm shrink-0 flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400">
            <ShieldCheck className="h-4 w-4" /> SECURE WHOP CHECKOUT — THE PLAYBOOK ($27)
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-3 sm:p-6 min-h-0">
          <WhopCheckoutEmbed
            planId="plan_4VBu6Mxzk15hN"
            returnUrl="https://yoursite.com/checkout/complete"
            themeOptions={{
              backgroundColor: "#580ec8",
              accentColor: "#4c00ff",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}