import Link from "next/link";
import Image from "next/image";
import { Check, X, ArrowRight, Download, ShieldCheck, Mail, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 sm:p-8 text-center shadow-sm">
        {/* Header / Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image src="/logo.png" alt="Propfident" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="font-bold text-base tracking-tight text-foreground uppercase">
            PROPFIDENT
          </span>
        </div>

        {isSuccess ? (
          <>
            {/* Success Icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Check className="h-6 w-6 stroke-[2.5]" />
            </div>

            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Order Confirmed
            </h1>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Your payment was processed successfully. Your access pass and resources are ready below.
            </p>

            {/* Order Summary */}
            <div className="mt-6 rounded-lg border border-border bg-muted/40 p-3.5 text-left text-xs space-y-2.5 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Item</span>
                <span className="font-medium text-foreground flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary" /> Playbook PDF
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready for Download</span>
              </div>
            </div>

            {/* Email Note */}
            <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-border bg-background p-3 text-left text-xs">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                A receipt and Whop confirmation email have been sent to your address.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2">
              <a
                href="/api/download/playbook"
                download
                className={cn(
                  buttonVariants({ size: "default" }),
                  "w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium text-xs gap-2"
                )}
              >
                <Download className="h-3.5 w-3.5" /> Download Playbook PDF
              </a>

              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full text-xs font-medium gap-2"
                )}
              >
                Return Home <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Aborted Icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <X className="h-6 w-6 stroke-[2.5]" />
            </div>

            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Payment Incomplete
            </h1>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              We couldn't finalize your transaction with Whop. Your account has not been charged.
            </p>

            <div className="mt-6">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full text-xs font-medium gap-2"
                )}
              >
                Return Home <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </>
        )}

        {/* Security Footer */}
        <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Fulfilled securely via Whop</span>
        </div>
      </div>
    </main>
  );
}