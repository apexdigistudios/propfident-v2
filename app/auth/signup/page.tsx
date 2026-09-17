"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  { id: 1, image: "/slides/slide1.png", alt: "Propfident Feature Slide 1" },
  { id: 2, image: "/slides/slide2.png", alt: "Propfident Feature Slide 2" },
  { id: 3, image: "/slides/slide3.png", alt: "Propfident Feature Slide 3" },
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

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTier = searchParams.get("tier");
  const tierParam = rawTier ? rawTier.toLowerCase() : "free";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic header visibility control on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const header = document.querySelector("header") || document.querySelector("nav");
      if (!header) return;

      const currentScrollY = window.scrollY;
      header.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";

      if (currentScrollY <= 10) {
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
      } else if (currentScrollY < lastScrollY) {
        // Hide on scroll upward
        header.style.transform = "translateY(-100%)";
        header.style.opacity = "0";
      } else if (currentScrollY > lastScrollY) {
        // Reveal on scroll downward
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      const header = document.querySelector("header") || document.querySelector("nav");
      if (header) {
        header.style.transform = "";
        header.style.opacity = "";
        header.style.transition = "";
      }
    };
  }, []);

  // Carousel timer
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

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?tier=${tierParam}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        setGoogleLoading(false);
      }
    } catch (err) {
      setError("Failed to initiate Google sign-in.");
      setGoogleLoading(false);
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
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                disabled={googleLoading || loading}
                onClick={handleGoogleSignup}
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
                  disabled={loading || googleLoading}
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
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground pt-2">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>Encrypted & Secure Auth</span>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pb-6 lg:pb-0">
          © {new Date().getFullYear()} Propfident. All rights reserved.
        </div>
      </div>

      {/* Right Column: Pure Image Carousel Card */}
      <div className="hidden lg:col-span-6 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 via-card to-background relative overflow-hidden border-l border-border/40 min-h-screen">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex justify-end">
          <Badge variant="outline" className="border-border/60 bg-background/50 font-mono text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> VERIFIED MEMBER ACCESS
          </Badge>
        </div>

        {/* Carousel Image Display */}
        <div className="relative z-10 max-w-lg w-full my-auto space-y-4">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-black/40">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-contain p-2"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-8 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
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
            <p className="text-xs font-semibold text-foreground">Automated Tier Sync</p>
            <p className="text-[11px] text-muted-foreground">
              Your profile tier is synced directly upon creation.
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