"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2, Lock } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const slides = [
  { id: 1, image: "/slides/slide1.png", alt: "Real-Time Drawdown Protection", title: "Real-Time Drawdown Protection" },
  { id: 2, image: "/slides/slide2.png", alt: "Prop Match Matrix Engine", title: "Prop Match Matrix Engine" },
  { id: 3, image: "/slides/slide3.png", alt: "VIP Trader Dashboard", title: "VIP Trader Dashboard" },
  { id: 4, image: "/slides/slide4.png", alt: "Protection Engine", title: "Protection Engine" },
];

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginFormContent() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || loading) return;

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/stay-tuned");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (oauthError) {
        setError("Unable to connect with Google. Please try again.");
        setGoogleLoading(false);
      }
    } catch {
      setError("Unable to initiate Google sign-in.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-background pt-28 sm:pt-32 lg:pt-28">
      {/* Left Column: Login Form */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-16 z-10 min-h-[calc(100vh-7rem)]">
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
            <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sign in to access your trading tools and resources.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              disabled={googleLoading || loading}
              onClick={handleGoogleLogin}
              className="w-full h-11 border-border/60 bg-card hover:bg-accent font-semibold text-xs flex items-center justify-center transition-all"
            >
              {googleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <GoogleIcon /> Continue with Google
                </>
              )}
            </Button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-border/60 w-full" />
              <span className="bg-background px-3 text-[10px] font-mono uppercase text-muted-foreground absolute">
                OR EMAIL
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-xs rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-500 font-mono">
                  {error}
                </div>
              )}

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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold font-mono text-muted-foreground">
                    PASSWORD
                  </label>
                </div>
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
                disabled={loading || googleLoading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-mono text-xs gap-2 shadow-lg shadow-primary/20 transition-all mt-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground pt-2">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground pt-2">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>Protected Session</span>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pb-6 lg:pb-0">
          © {new Date().getFullYear()} Propfident. All rights reserved.
        </div>
      </div>

      {/* Right Column: Visual Feature Showcase */}
      <div className="hidden lg:col-span-6 lg:flex flex-col justify-between p-12 bg-black dark:bg-white text-white dark:text-zinc-900 relative overflow-hidden border-l border-white/10 dark:border-black/10 min-h-screen">
        <div className="relative z-10 flex justify-end">
          <Badge
            variant="outline"
            className="border-white/20 dark:border-black/20 bg-white/10 dark:bg-black/10 text-white dark:text-black font-mono text-xs"
          >
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400 dark:text-emerald-600" /> VERIFIED MEMBER ACCESS
          </Badge>
        </div>

        {/* Slideshow Display */}
        <div className="relative z-10 max-w-lg w-full my-auto mx-auto flex flex-col items-center">
          <div className="relative w-full aspect-[4/3]">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col items-center justify-between transition-opacity duration-700 ease-in-out ${
                  currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="relative w-full h-[85%]">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
                <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90 dark:text-zinc-900/90 text-center pt-2">
                  {slide.title}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "w-8 bg-white dark:bg-black"
                    : "w-2 bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 p-4 rounded-xl border border-white/10 dark:border-black/10 bg-white/5 dark:bg-black/5 backdrop-blur-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 dark:bg-black/10 text-white dark:text-black border border-white/10 dark:border-black/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 dark:text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white dark:text-black">Instant Member Access</p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
              Your resources unlock immediately upon login.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}