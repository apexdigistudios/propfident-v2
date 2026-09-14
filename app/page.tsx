import { Shield, Timer, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Features } from "@/components/features";
import { Tools } from "@/components/tools";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground transition-colors duration-200 font-sans">
      {/* Navigation */}
      <nav className="z-10 flex items-center justify-between px-6 py-4 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-bold text-sm tracking-tight font-sans">Propfident</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary border border-primary/20 font-mono">
            v2
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground font-medium font-sans">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#tools" className="hover:text-foreground transition-colors">Free Tools</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#pricing"
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-3.5 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm font-sans"
          >
            Get Lifetime Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/80 text-xs text-muted-foreground mb-8 font-mono">
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
          Trusted in dev: 25+ funded accounts protected
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-[1.1]">
          Keep your funded accounts <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-purple-300">
            safe and scalable.
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 text-balance font-normal">
          The ultimate SaaS for prop firm traders. AI-driven planning, risk management, and lot sizing. Secure your spot before the public launch.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="#pricing"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-md text-sm font-medium transition-all shadow-sm font-sans"
          >
            Claim 1 of 100 Lifetime Spots
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#tools"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface hover:bg-surface-hover border border-border px-6 py-3 rounded-md text-sm font-medium transition-all text-foreground font-sans"
          >
            Explore Free Tools
          </a>
        </div>

        {/* Launch Timer Banner */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 p-5 rounded-lg border border-border bg-surface/40 backdrop-blur-sm w-full max-w-xl text-left">
          <div className="p-2.5 bg-primary/10 rounded-md text-primary shrink-0 border border-primary/20">
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