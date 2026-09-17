import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background text-foreground p-4 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/20 via-emerald-500/10 to-blue-600/20 blur-[120px] pointer-events-none" />

      {/* Main Card Wrapper */}
      <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/90 p-8 text-center backdrop-blur-2xl shadow-2xl transition-all">
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

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
              Payment Successful!
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Thank you for your purchase. Your account activation and access details are on their way.
            </p>

            {/* Email Delivery Notification */}
            <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5 text-left space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-primary">
                <Mail className="h-4 w-4" />
                <span>CHECK YOUR INBOX</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your digital product access and receipt have been emailed to you via Whop. Please check your spam folder if it doesn't arrive within a few minutes.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                asChild
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-primary-foreground font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all gap-2"
              >
                <Link href="/">
                  Return to Home <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Fulfilled securely via Whop</span>
              </div>
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

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
              Payment Incomplete
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              We couldn't process your transaction. Please verify your payment details and try again.
            </p>

            <div className="mt-8">
              <Button
                variant="outline"
                asChild
                className="w-full border-border bg-card text-foreground hover:bg-surface-hover hover:text-foreground"
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