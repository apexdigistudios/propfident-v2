"use client";

import Image from "next/image";
import { Shield, Bell, AlertTriangle, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Drawdown Breach Shield",
    description:
      "Real-time rule monitoring across max daily drawdown, overall loss limits, and trailing equity buffers before your broker triggers a breach.",
    image: "/card-images/breach-shield.png",
    badge: "Core Shield",
  },
  {
    icon: Bell,
    title: "Multi-Channel Alerts",
    description:
      "Instant push notifications via Telegram, Discord, and SMS when approaching critical risk thresholds or news windows.",
    image: "/card-images/multi-notifications.png",
    badge: "Instant Alerts",
  },
  {
    icon: AlertTriangle,
    title: "Trade Leak Detector",
    description:
      "Automated analysis that catches revenge trading, oversized lots, over-leveraging, and rule violations before they cost you your account.",
    image: "/card-images/trade-leak.png",
    badge: "Analytics",
  },
  {
    icon: Layers,
    title: "Unified Dashboard",
    description:
      "Consolidate multiple MT4, MT5, and prop firm evaluation accounts into a single, high-performance monitoring interface.",
    image: "/card-images/unified-account.png",
    badge: "Multi-Account",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative z-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge
            variant="outline"
            className="font-mono text-xs px-3 py-1 border-primary/40 text-primary"
          >
            PROTECTION ENGINE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Engineered to Keep You Funded
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Eliminate rule-breaching mistakes and protect your equity with real-time risk intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="overflow-hidden border-border/80 bg-surface/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                {/* Preview Image Card Header */}
                <div className="relative h-52 w-full border-b border-border/60 bg-muted/20 overflow-hidden flex items-center justify-center">
                  <Image
                    src={feature.image}
                    alt={feature.title}
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
                      {feature.badge}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg sm:text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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