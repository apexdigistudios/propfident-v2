import { Shield, Timer, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.15] bg-grid-pattern pointer-events-none" />

      {/* Navigation */}
      <nav className="z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">Propfident</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="#tools" className="hover:text-foreground transition-colors">Free Tools</a>
          <a href="#playbook" className="hover:text-foreground transition-colors">Playbook</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
          Get Lifetime Access
        </button>
      </nav>

      {/* Hero Section */}
      <section className="z-10 flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-sm text-muted mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          Trusted in dev: 25+ funded accounts protected
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">
          Keep your funded accounts <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            safe and scalable.
          </span>
        </h1>
        
        <p className="text-xl text-muted max-w-2xl mb-10 text-balance">
          The ultimate SaaS for prop firm traders. AI-driven planning, risk management, and lot sizing. Secure your spot before the public launch.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-md text-lg font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            Claim 1 of 100 Lifetime Spots
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-surface hover:bg-border border border-border px-8 py-4 rounded-md text-lg font-medium transition-all">
            Explore Free Tools
          </button>
        </div>

        {/* Launch Timer Banner */}
        <div className="mt-16 flex items-center gap-6 p-6 rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm w-full max-w-2xl text-left">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Timer className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">Founder's Lifetime Launch</h3>
            <p className="text-sm text-muted">Only 100 spots available for lifetime access without recurring fees.</p>
          </div>
          <div className="flex gap-3 text-center hidden sm:flex">
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-mono">14</span>
              <span className="text-xs text-muted uppercase">Days</span>
            </div>
            <span className="text-2xl font-bold text-muted">:</span>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-mono">08</span>
              <span className="text-xs text-muted uppercase">Hrs</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
