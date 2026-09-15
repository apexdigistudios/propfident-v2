"use client";

import { WhopCheckoutEmbed } from "@whop/checkout/react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileSpreadsheet,
  Lock,
  ShieldCheck,
  Target,
  Zap,
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

export default function PlaybookPage() {
  return (
    <div className="container max-w-6xl py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          <BookOpen className="h-3.5 w-3.5" /> PROPFIDENT PLAYBOOK V2.0
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl font-sans">
          Institutional Trading Playbook & Risk Matrix
        </h1>
        <p className="max-w-3xl text-muted-foreground text-base sm:text-lg">
          Master prop firm rulesets, pass evaluation phases consistently, and execute standardized high-probability setups with our complete institutional framework.
        </p>
      </div>

      {/* Grid: Playbook Highlights */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/60 bg-background/50">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mb-2">
              <Target className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">Prop Challenge Models</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Complete breakdown of 1-step, 2-step, and instant funding firm requirements.</p>
            <ul className="text-xs space-y-1 font-mono text-slate-300 pt-2">
              <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-primary" /> Daily drawdown calculation math</li>
              <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-primary" /> Max trailing vs balance buffers</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/50">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 mb-2">
              <Zap className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">Execution Mechanics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Step-by-step trade journal protocols, sizing calculators, and news filters.</p>
            <ul className="text-xs space-y-1 font-mono text-slate-300 pt-2">
              <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-primary" /> High-impact event risk management</li>
              <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-primary" /> Dynamic lot size scaling strategy</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/50">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-2">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">Compliance Scorecards</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Ready-to-use trade log templates compatible with the Prop Match Evaluator.</p>
            <ul className="text-xs space-y-1 font-mono text-slate-300 pt-2">
              <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-primary" /> CSV export formats included</li>
              <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-primary" /> Real-time compliance auditing</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Main Callout Box with Modal Trigger */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-background via-primary/5 to-background p-6 sm:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 py-1 font-mono text-xs">
              Instant Digital Access
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Unlock The Seven Figure Funded Trader Playbook
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Gain immediate access to institutional strategy guides, risk calculators, private community access, and live evaluation walkthroughs.
            </p>

            <div className="grid sm:grid-cols-2 gap-2 font-mono text-xs pt-2">
              {[
                "Prop Playbook & Interactive Modules",
                "Automated Trade Log CSV Templates",
                "Exclusive VIP Community Access",
                "Lifetime Updates & Rule Change Alerts",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Dialog Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full md:w-auto gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 px-8 py-6 text-base font-semibold shadow-xl shrink-0">
                <Lock className="h-4 w-4" /> Get Playbook Access
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl border-border bg-background p-0 overflow-hidden sm:rounded-2xl">
              <DialogHeader className="p-4 border-b border-border/60 bg-surface/50">
                <DialogTitle className="flex items-center gap-2 text-sm font-mono text-primary">
                  <ShieldCheck className="h-4 w-4" /> SECURE WHOP CHECKOUT
                </DialogTitle>
              </DialogHeader>
              <div className="p-2 sm:p-4">
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

        </div>
      </div>
    </div>
  );
}