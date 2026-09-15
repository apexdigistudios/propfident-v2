"use client";

import Image from "next/image";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Target,
  Zap,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const playbookModules = [
  {
    icon: Target,
    badge: "Module 01",
    title: "Prop Evaluation Models",
    description:
      "Complete mathematical breakdown of 1-step, 2-step, and instant funding firm models. Master daily drawdown calculations and trailing max buffers.",
    image: "/playbook/module-models.png",
  },
  {
    icon: Zap,
    badge: "Module 02",
    title: "Execution Mechanics",
    description:
      "Standardized position sizing protocols, high-impact news filters, dynamic lot scaling strategies, and strict risk parameters.",
    image: "/playbook/module-execution.png",
  },
  {
    icon: FileSpreadsheet,
    badge: "Module 03",
    title: "Compliance Scorecards",
    description:
      "Ready-to-use trade log CSV templates, automated performance audits, and real-time compliance scorecards tailored for prop rules.",
    image: "/playbook/module-compliance.png",
  },
  {
    icon: Users,
    badge: "Module 04",
    title: "VIP Discord & Direct Signals",
    description:
      "Private Discord channel access with weekly rule change alerts, evaluation walkthroughs, and live risk management strategy sessions.",
    image: "/playbook/module-community.png",
  },
];

export default function PlaybookPage() {
  return (
    <div className="container max-w-6xl py-24 sm:py-28 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="default" className="gap-1.5 px-3 py-1 font-mono text-xs">
          <BookOpen className="h-3.5 w-3.5" /> PROPFIDENT PLAYBOOK V2.0
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl font-sans text-foreground">
          The Seven Figure Funded Trader Playbook
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Standardized risk matrices, execution protocols, and evaluation phase strategies engineered to pass prop challenges and retain funded capital.
        </p>
      </div>

      {/* Modules Grid (Image Card Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playbookModules.map((module, idx) => {
          const Icon = module.icon;
          return (
            <Card
              key={idx}
              className="overflow-hidden border-border/80 bg-surface/50 transition-all duration-200 hover:border-primary/50"
            >
              {/* Image Preview Banner */}
              <div className="relative h-48 w-full border-b border-border/60 bg-muted/30 overflow-hidden flex items-center justify-center">
                <Image
                  src={module.image}
                  alt={module.title}
                  fill
                  className="object-cover object-top transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-3 left-3 z-10">
                  <div className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="secondary" className="backdrop-blur-md bg-background/80">
                    {module.badge}
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {module.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Access Pass Card */}
      <Card className="max-w-4xl mx-auto overflow-hidden border-primary/50 shadow-xl backdrop-blur-md">
        <div className="relative h-56 w-full border-b border-border/60 bg-muted/30 overflow-hidden flex items-center justify-center">
          <Image
            src="/playbook/playbook-access-banner.png"
            alt="Seven Figure Funded Trader Playbook"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-md tracking-wider backdrop-blur-md">
            Instant Digital Access
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Unlock Full Access to The Seven Figure Funded Trader Playbook
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Get immediate access to institutional strategy guides, trade log CSV automation, private Discord community access, and continuous rule updates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs border-y border-border/60 py-6">
            {[
              "Complete Playbook PDF & Interactive Modules",
              "Automated Trade Log CSV Templates",
              "Exclusive VIP Discord Community Channel",
              "Lifetime Updates & Rule Change Alerts",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>256-Bit SSL Encrypted Whop Checkout</span>
            </div>

            {/* Mobile Responsive & Scrollable Whop Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 px-8 font-semibold shadow-xl">
                  <Lock className="h-4 w-4" /> Get Playbook Access
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl w-[92vw] max-h-[90vh] p-0 overflow-hidden sm:rounded-2xl border-border bg-background flex flex-col">
                <DialogHeader className="p-4 border-b border-border/60 bg-surface/80 backdrop-blur-sm shrink-0 flex flex-row items-center justify-between">
                  <DialogTitle className="flex items-center gap-2 text-xs font-mono text-primary">
                    <ShieldCheck className="h-4 w-4" /> SECURE WHOP CHECKOUT
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
          </div>
        </div>
      </Card>
    </div>
  );
}