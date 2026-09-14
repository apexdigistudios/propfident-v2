import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 overflow-hidden">
      {/* Background Ambient Glow (Coss UI FX) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/20 via-emerald-500/10 to-blue-600/20 blur-[120px] pointer-events-none" />

      {/* Main Card Wrapper */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)] transition-all">
        {/* Glowing Accent Border Top */}
        <div
          className={`absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r ${
            isSuccess
              ? "from-transparent via-emerald-400 to-transparent"
              : "from-transparent via-rose-500 to-transparent"
          }`}
        />

        {isSuccess ? (
          <>
            {/* Glowing Icon Aura */}
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
              Welcome to Founder's Lifetime
            </h1>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Your payment was processed successfully. Access details and account activation instructions have been sent to your email.
            </p>

            <div className="mt-8">
              <Button
                asChild
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all gap-2"
              >
                <Link href="/dashboard">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Glowing Icon Aura */}
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                <XCircle className="h-8 w-8" />
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
              Payment Incomplete
            </h1>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              We couldn't process your transaction. Please verify your payment details and try again.
            </p>

            <div className="mt-8">
              <Button
                variant="outline"
                asChild
                className="w-full border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}