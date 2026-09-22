"use client";

import { 
  Timer, 
  ChevronRight,
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
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { ToolPreviewSection } from "@/components/tool-preview-section";
import { Pricing } from "@/components/pricing";
import { FounderModal } from "@/components/founder-modal";
import { Footer } from "@/components/footer";

const avatarUrls = [
  { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "https://avatars.githubusercontent.com/u/16860528" },
  { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "https://avatars.githubusercontent.com/u/20110627" },
  { imageUrl: "https://avatars.githubusercontent.com/u/106103621", profileUrl: "https://avatars.githubusercontent.com/u/106103621" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "https://avatars.githubusercontent.com/u/59228569" },
];

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground transition-colors duration-200 font-sans">
      {/* Hero Section */}
      <section className="relative isolate flex-1 overflow-hidden px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
        
        {/* Ambient Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background pointer-events-none -z-20" />

        {/* Finance & Forex Icon Mesh Background (Opacity: 5%) */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-[0.05]">
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

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Avatar Circles + Heading */}
            <div className="flex flex-col items-start text-left">
              <div className="mb-6 flex items-center gap-2 pointer-events-none">
                <div className="scale-75 sm:scale-85 origin-left shrink-0 -mr-2 sm:-mr-1">
                  <AvatarCircles numPeople={25} avatarUrls={avatarUrls} />
                </div>
                <span className="text-xs font-mono text-muted-foreground leading-tight">
                  25+ funded accounts <strong className="text-foreground font-semibold">protected while in dev</strong>
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-foreground">
                Never Breach Your Prop Firm Account <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-400 block mt-1 sm:mt-2">
                  Again
                </span>
              </h1>
            </div>

            {/* Right Column: Subheading + CTAs + Timer Banner */}
            <div className="flex flex-col items-start text-left">
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed font-normal">
                Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
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
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-xl border border-primary/30 bg-primary/5 w-full text-left">
                <div className="p-2.5 bg-primary/10 rounded-md text-primary shrink-0 border border-primary/30">
                  <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
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

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Sections */}
      <Features />

      {/* Interactive Safari Tools Preview */}
      <section id="tools">
        <ToolPreviewSection />
      </section>

      <Pricing />

      <Footer />
    </main>
  );
}