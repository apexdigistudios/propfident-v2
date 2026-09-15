"use client";

import Image from "next/image";
import { Shield, Bell, AlertTriangle, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featureList = [
  {
    icon: Shield,
    badge: "Core Guard",
    title: "Drawdown Breach Shield",
    description:
      "Monitors daily equity swings and equity curves in real-time to alert you before hitting firm loss limits. Tracks trailing max limits automatically.",
    image: "/features/drawdown-shield.png",
  },
  {
    icon: Bell,
    badge: "Instant Alert",
    title: "Multi-Channel Notifications",
    description:
      "Receive instant push alerts on Discord, Telegram, or SMS when account parameters approach custom warning thresholds.",
    image: "/features/notifications.png",
  },
  {
    icon: AlertTriangle,
    badge: "AI Powered",
    title: "Trade Leak Detector",
    description:
      "Analyzes execution habits to flag emotional over-leveraging, revenge trading, and rule conflicts before capital is lost.",
    image: "/features/leak-detector.png",
  },
  {
    icon: Layers,
    badge: "Multi-Firm",
    title: "Unified Account Dashboard",
    description:
      "Connect unlimited accounts across FTMO, FundedNext, 5%ers, and track total combined metrics from a single pane.",
    image: "/features/dashboard.png",
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
                className="overflow-hidden border-border/80 bg-surface/50 transition-all duration-200 hover:border-primary/50"
              >
                {/* Visual Preview Header */}
                <div className="relative h-48 w-full border-b border-border/60 bg-muted/30 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 z-20">
                    <Badge variant="secondary" className="backdrop-blur-md bg-background/80">
                      {feature.badge}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}