"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  CandlestickChart,
  DollarSign,
  Globe,
  Coins,
  Activity,
  PieChart,
  ShieldCheck,
  Clock,
  Sparkles,
  Bell,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  LineChart,
  Wallet,
} from "lucide-react";

export default function StayTunedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-background text-foreground relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 pt-20 sm:pt-24 lg:pt-28">
      {/* Background Watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] dark:opacity-[0.08] text-foreground select-none">
        <TrendingUp className="absolute top-12 left-10 h-32 w-32 -rotate-12" />
        <CandlestickChart className="absolute top-1/4 right-12 h-40 w-40 rotate-12" />
        <DollarSign className="absolute bottom-20 left-16 h-36 w-36 rotate-6" />
        <Globe className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64" />
        <Coins className="absolute bottom-1/3 right-1/4 h-28 w-28 -rotate-6" />
        <Activity className="absolute top-16 right-1/3 h-24 w-24" />
        <PieChart className="absolute bottom-12 right-16 h-32 w-32 rotate-45" />
        <LineChart className="absolute top-2/3 left-12 h-36 w-36 -rotate-12" />
        <Wallet className="absolute top-20 left-1/3 h-20 w-20" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Propfident"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-extrabold text-lg tracking-tight text-foreground font-sans">
            PROPFIDENT
          </span>
        </Link>

        <Button variant="outline" size="sm" asChild className="font-mono text-xs gap-2 border-border/80 bg-card hover:bg-accent text-foreground">
          <Link href="/">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Homepage
          </Link>
        </Button>
      </header>

      {/* Main Content */}
      <section className="relative z-10 max-w-2xl w-full mx-auto my-auto py-8 space-y-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-foreground text-xs font-mono font-semibold shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>You're All Set & Registered</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-foreground">
            Welcome to the Future of <br className="hidden sm:inline" />
            <span className="text-primary">Prop Trading</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your membership is confirmed. We are polishing the final edge on our automated drawdown engines, market match indicators, and trader toolkits.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
          <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-foreground">Risk Guard</p>
            <p className="text-[11px] text-muted-foreground leading-normal">
              Automated account drawdown monitoring and instant notifications.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <CandlestickChart className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-foreground">Prop Matcher</p>
            <p className="text-[11px] text-muted-foreground leading-normal">
              Tailored firm selection built to complement your trading style.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-foreground">Trade Intelligence</p>
            <p className="text-[11px] text-muted-foreground leading-normal">
              High-tier insights tailored for disciplined market execution.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-4 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="h-12 w-full sm:w-auto px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold text-xs gap-2 shadow-lg transition-all rounded-xl"
            >
              Launch Trader Dashboard <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 w-full sm:w-auto px-6 border-border/80 bg-card hover:bg-accent text-foreground font-mono font-semibold text-xs rounded-xl"
            >
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>

          <p className="text-[11px] font-mono text-muted-foreground flex items-center justify-center gap-1.5">
            <Bell className="h-3.5 w-3.5 text-primary" />
            <span>Launch alerts will be sent directly to your email address</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-muted-foreground max-w-5xl w-full mx-auto pt-6">
        © {new Date().getFullYear()} Propfident. Secure Trading Systems. All rights reserved.
      </footer>

      {/* Under Development Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/90 dark:bg-white/95 backdrop-blur-md border border-white/40 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in zoom-in-95 duration-200 text-black">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors p-1 rounded-md"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto h-14 w-14 rounded-2xl bg-black/10 text-black border border-black/10 flex items-center justify-center">
              <Clock className="h-7 w-7" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-black font-sans text-black">
                Dashboard Under Fine-Tuning
              </h2>
              <p className="text-xs text-black/80 font-medium leading-relaxed">
                We are completing final performance checks on your live trading terminal and account guard suite. You will receive an immediate notification email as soon as full access opens!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/5 border border-black/10 space-y-2 text-xs font-mono text-black">
              <div className="flex items-center gap-2 text-black font-bold">
                <CheckCircle2 className="h-4 w-4 text-black" />
                <span>Your spot is secured</span>
              </div>
              <p className="text-[11px] text-black/70 leading-normal pl-6 font-medium">
                No further action is required on your part. Sit back while we prepare your terminal.
              </p>
            </div>

            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-semibold rounded-xl"
            >
              Got It, Thank You!
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}