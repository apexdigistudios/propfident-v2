import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, XCircle, ArrowRight, Mail, ShieldCheck, Download, Terminal, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6 pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/15 via-emerald-500/10 to-indigo-600/15 blur-[140px] pointer-events-none -z-10" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card/80 p-6 sm:p-10 text-center backdrop-blur-2xl shadow-2xl">
        {/* Glowing Top Border */}
        <div
          className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${
            isSuccess
              ? "from-emerald-500/20 via-emerald-400 to-emerald-500/20"
              : "from-rose-500/20 via-rose-500 to-rose-500/20"
          }`}
        />

        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image src="/logo.png" alt="Propfident" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-extrabold text-lg tracking-tight text-foreground font-sans uppercase">
            PROPFIDENT
          </span>
        </div>

        {isSuccess ? (
          <>
            {/* Status Pill */}
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider mb-6 inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> ACCESS GRANTED
            </Badge>

            {/* Glowing Success Icon */}
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-sans uppercase tracking-tight text-foreground">
              Order Verified & Unlocked
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Your payment has been processed successfully. Your trader playbook and resources are unlocked below.
            </p>

            {/* Product Summary Box */}
            <div className="mt-6 p-4 rounded-xl border border-border/60 bg-background/60 text-left space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-border/40">
                <span className="text-muted-foreground uppercase">Fulfilled Item</span>
                <span className="text-foreground font-bold flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-primary" /> Playbook PDF
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground uppercase">Status</span>
                <span className="text-emerald-400 font-semibold uppercase flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Ready for Download
                </span>
              </div>
            </div>

            {/* Whop Delivery Card */}
            <div className="mt-4 p-3.5 rounded-xl border border-primary/20 bg-primary/5 text-left space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-bold font-mono text-primary uppercase">
                <Mail className="h-3.5 w-3.5" />
                <span>Receipt & Whop Confirmation</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A copy of your access pass and invoice has been dispatched to your email address via Whop.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <Button
                asChild
                className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all gap-2"
              >
                <a href="/api/download/playbook" download>
                  <Download className="h-4 w-4" /> Download Playbook PDF
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full h-11 border-border/80 bg-card hover:bg-accent text-foreground font-mono text-xs uppercase tracking-wider gap-2"
              >
                <Link href="/">
                  Return to Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Status Pill */}
            <Badge
              variant="outline"
              className="border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider mb-6 inline-flex items-center gap-1.5"
            >
              <Terminal className="h-3.5 w-3.5" /> TRANSACTION ABORTED
            </Badge>

            {/* Glowing Error Icon */}
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <XCircle className="h-8 w-8" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-sans uppercase tracking-tight text-foreground">
              Payment Incomplete
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              We were unable to finalize your transaction with Whop. Your account has not been charged.
            </p>

            <div className="mt-8 space-y-3">
              <Button
                variant="outline"
                asChild
                className="w-full h-11 border-border bg-card hover:bg-accent text-foreground font-mono text-xs uppercase tracking-wider gap-2"
              >
                <Link href="/">
                  Return to Homepage <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}

        {/* Security Footer */}
        <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Fulfilled securely via Whop Checkout Engine</span>
        </div>
      </div>
    </main>
  );
}