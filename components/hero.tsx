"use client";

import { useEffect, useState } from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  LineChart, 
  CandlestickChart, 
  DollarSign, 
  Percent, 
  Activity, 
  BarChart3, 
  ArrowUpRight, 
  Wallet, 
  PieChart, 
  Coins 
} from "lucide-react";
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
    <section className="relative w-full border-b border-border/40 bg-background pt-12 pb-16 sm:pt-24 sm:pb-24 overflow-hidden">
      
      {/* Background Gradient Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background pointer-events-none z-0" />

      {/* Finance & Forex Icon Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-20">
        {/* Left Side Cluster */}
        <div className="absolute top-[5%] left-[5%] text-primary"><TrendingUp className="w-12 h-12 md:w-16 md:h-16 rotate-12" /></div>
        <div className="absolute top-[20%] left-[15%] text-primary"><LineChart className="w-10 h-10 md:w-14 md:h-14 rotate-45" /></div>
        <div className="absolute top-[40%] left-[8%] text-primary"><Percent className="w-12 h-12 md:w-16 md:h-16 rotate-12" /></div>
        <div className="absolute top-[65%] left-[12%] text-primary"><Activity className="w-16 h-16 md:w-24 md:h-24 rotate-6" /></div>
        <div className="absolute bottom-[10%] left-[5%] text-primary"><Wallet className="w-14 h-14 md:w-20 md:h-20 -rotate-12" /></div>
        <div className="absolute bottom-[25%] left-[25%] text-primary"><CandlestickChart className="w-10 h-10 md:w-14 md:h-14 rotate-90" /></div>
        
        {/* Center/Mid Cluster */}
        <div className="absolute top-[15%] left-[45%] text-primary"><DollarSign className="w-12 h-12 md:w-16 md:h-16 -rotate-12" /></div>
        <div className="absolute top-[35%] left-[35%] text-primary"><BarChart3 className="w-10 h-10 md:w-12 md:h-12 rotate-12" /></div>
        <div className="absolute top-[55%] left-[50%] text-primary"><Activity className="w-10 h-10 md:w-14 md:h-14 -rotate-45" /></div>
        <div className="absolute bottom-[35%] left-[40%] text-primary"><LineChart className="w-12 h-12 md:w-16 md:h-16 -rotate-12" /></div>
        <div className="absolute bottom-[15%] left-[55%] text-primary"><Coins className="w-8 h-8 md:w-12 md:h-12 rotate-12" /></div>

        {/* Right Side Cluster */}
        <div className="absolute top-[10%] right-[10%] text-primary"><CandlestickChart className="w-14 h-14 md:w-20 md:h-20 -rotate-12" /></div>
        <div className="absolute top-[25%] right-[25%] text-primary"><DollarSign className="w-10 h-10 md:w-14 md:h-14 -rotate-45" /></div>
        <div className="absolute top-[45%] right-[15%] text-primary"><BarChart3 className="w-14 h-14 md:w-20 md:h-20 -rotate-12" /></div>
        <div className="absolute top-[60%] right-[30%] text-primary"><Wallet className="w-10 h-10 md:w-14 md:h-14 rotate-6" /></div>
        <div className="absolute bottom-[20%] right-[10%] text-primary"><ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 rotate-45" /></div>
        <div className="absolute bottom-[5%] right-[25%] text-primary"><PieChart className="w-10 h-10 md:w-14 md:h-14 rotate-12" /></div>
        <div className="absolute top-[30%] right-[8%] text-primary"><Coins className="w-12 h-12 md:w-16 md:h-16 rotate-45" /></div>
        <div className="absolute bottom-[40%] right-[5%] text-primary"><TrendingUp className="w-10 h-10 md:w-12 md:h-12 -rotate-6" /></div>
        <div className="absolute top-[75%] right-[20%] text-primary"><Percent className="w-10 h-10 md:w-14 md:h-14 rotate-45" /></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Badge */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] sm:text-xs font-mono text-primary mb-6">
              <Zap className="h-3.5 w-3.5 fill-primary shrink-0" />
              <span className="truncate">LIFETIME ACCESS: ONLY 14 SPOTS LEFT (FIRST 100 USERS)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Never Breach Your Prop Firm Account{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-400 block mt-1 sm:mt-2">
                Again
              </span>
            </h1>
          </div>

          {/* Right Column: Subheading, CTA & Timer */}
          <div className="flex flex-col items-start text-left lg:pt-8">
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <FounderModal>
                <Button size="lg" className="w-full sm:w-auto font-mono text-xs sm:text-sm gap-2 h-12 px-6">
                  Claim Lifetime Access <ArrowRight className="h-4 w-4" />
                </Button>
              </FounderModal>
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-mono text-xs sm:text-sm h-12 px-6">
                Explore Free Tools
              </Button>
            </div>

            <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>25+ Funded Accounts Protected</span>
              </div>
              <div className="flex items-center gap-2.5 bg-card/80 px-3.5 py-2 rounded-md border border-border/50 shadow-sm w-full sm:w-auto">
                <span>Offer Closes In:</span>
                <span className="text-foreground font-semibold tracking-wider">
                  {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}