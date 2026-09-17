"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Loader2, Lock } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const slides = [
  {
    title: "Real-time Drawdown Protection",
    desc: "Monitor max daily and overall drawdowns dynamically across all your active prop accounts.",
    tag: "RISK MANAGEMENT",
    image: "/slides/drawdown-protection.png",
  },
  {
    title: "Prop Match Matrix Engine",
    desc: "Benchmark your statement against dozens of prop firm rules to guarantee compliance.",
    tag: "STATEMENT ANALYTICS",
    image: "/slides/prop-match.png",
  },
  {
    title: "VIP Trader Dashboard",
    desc: "Gain instant access to proprietary tools, journaling, and automated position sizing.",
    tag: "LIFETIME BENEFITS",
    image: "/slides/vip-dashboard.png",
  },
];

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTier = searchParams.get("tier");
  const tierParam = rawTier ? rawTier.toLowerCase() : "free";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || loading) return;

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName,
            tier: tierParam,
          },
        },
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-background pt-24 sm:pt-28 lg:pt-0">
      {/* Left Column: Signup Form */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-16 z-10 min-h-[calc(100vh-6rem)] lg:min-h-screen">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="Propfident" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-extrabold text-lg tracking-tight text-foreground font-sans">
              PROPFIDENT
            </span>
          </Link>
        </div>

        <div className="my-auto py-8 max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className={`font-mono text-xs uppercase px-3 py-1 ${
                tierParam === "lifetime"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                  : "border-primary/30 bg-primary/10 text-primary"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              {tierParam === "lifetime" ? "Claim Lifetime Access" : `${tierParam.toUpperCase()} ACCOUNT`}
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-foreground">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Set up your credentials to get immediate access to Propfident tools and the trader dashboard.
            </p>
          </div>

          {success ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Account Created!</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Check your email inbox to confirm your account. Your account tier (<strong className="text-foreground uppercase">{tierParam}</strong>) is attached to your profile.
              </p>
              <Button onClick={() => router.push("/")} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-2 font-mono text-xs">
                Return to Home
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="p-3 text-xs rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-500 font-mono">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold font-mono text-muted-foreground">
                  FULL NAME
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11 bg-card/60 border-border/60 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold font-mono text-muted-foreground">
                  EMAIL ADDRESS
                </label>
                <Input
                  type="email"
                  required
                  placeholder="trader@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-card/60 border-border/60 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold font-mono text-muted-foreground">
                  PASSWORD
                </label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-card/60 border-border/60 text-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-mono text-xs gap-2 shadow-lg shadow-primary/20 transition-all mt-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Complete Registration <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground pt-2">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>256-Bit Encrypted & Secure Auth</span>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pb-6 lg:pb-0">
          © {new Date().getFullYear()} Propfident. All rights reserved.
        </div>
      </div>

      {/* Right Column: Visual Slideshow Banner */}
      <div className="hidden lg:col-span-6 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 via-card to-background relative overflow-hidden border-l border-border/40 min-h-screen">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex justify-end">
          <Badge variant="outline" className="border-border/60 bg-background/50 font-mono text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> VERIFIED MEMBER ACCESS
          </Badge>
        </div>

        {/* Dynamic Image & Slide Content */}
        <div className="relative z-10 max-w-lg my-auto space-y-6">
          <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-black/40">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover transition-opacity duration-700"
              priority
            />
          </div>

          <div className="space-y-2 transition-all duration-500 ease-in-out">
            <span className="text-[10px] font-mono tracking-widest text-primary uppercase">
              {slides[currentSlide].tag}
            </span>
            <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-foreground">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {slides[currentSlide].desc}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-8 bg-primary" : "w-2 bg-primary/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Automated Tier Synchronization</p>
            <p className="text-[11px] text-muted-foreground">
              Your profile tier is synchronized with Supabase directly upon creation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SignupFormContent />
    </Suspense>
  );
}