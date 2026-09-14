"use client";

import { Shield, Bell, AlertTriangle, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featureList = [
  {
    icon: Shield,
    badge: "Core Guard",
    title: "Drawdown Breach Shield",
    description: "Monitors daily equity swings and equity curves in real-time to alert you before hitting firm loss limits.",
  },
  {
    icon: Bell,
    badge: "Instant Alert",
    title: "Multi-Channel Notifications",
    description: "Receive instant push alerts on Discord, Telegram, or SMS when account parameters approach warning thresholds.",
  },
  {
    icon: AlertTriangle,
    badge: "AI Powered",
    title: "Trade Leak Detector",
    description: "Analyzes execution habits to flag emotional over-leveraging, revenge trading, and rule conflicts.",
  },
  {
    icon: Layers,
    badge: "Multi-Firm",
    title: "Unified Account Dashboard",
    description: "Connect unlimited accounts across FTMO, FundedNext, 5%ers, and track total metrics from a single pane.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-border/40 relative z-10 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="default" className="mb-3">
            Engine Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Built specifically to protect funded capital.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Eliminate rule breaches caused by panic, slippage, or miscalculated position sizing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="p-6 transition-all duration-200 hover:border-primary/50 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}