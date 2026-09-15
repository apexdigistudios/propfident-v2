import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Service | Propfident",
  description: "Terms and conditions governing the use of Propfident platform and services.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 space-y-10 text-foreground font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="space-y-3 border-b border-border/60 pb-8">
        <Badge variant="outline" className="font-mono text-xs text-primary border-primary/40">
          LEGAL & COMPLIANCE
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-xs font-mono text-muted-foreground">
          Last updated: September 15, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using <strong className="text-foreground">propfident.online</strong>, purchasing the $299 Founder&apos;s Lifetime Pass, or utilizing our free evaluation tools, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Lifetime Pass & Payments</h2>
          <p>
            The Founder&apos;s Tier access grants perpetual lifetime rights to current and future features of Propfident v2 core engine. All transactions are securely processed through Whop.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Price:</strong> $299 USD one-time fee (zero recurring subscriptions).</li>
            <li><strong className="text-foreground">30-Day Money-Back Guarantee:</strong> If Propfident does not improve your account risk clarity within 30 days of purchase, contact <span className="font-mono text-foreground">support@propfident.online</span> for a full refund.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. User Conduct & Abuse</h2>
          <p>
            Propfident accounts are for individual use only. Reverse-engineering the platform analytics, sharing VIP Discord credentials, or attempting automated scraping of proprietary prop firm evaluations will result in immediate termination without refund.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Software Disclaimer & Service Availability</h2>
          <p>
            While we strive for 99.9% engine uptime, Propfident is provided &quot;as is.&quot; We are not liable for system delays, internet disconnects, or third-party prop firm broker feed errors.
          </p>
        </section>
      </div>
    </div>
  );
}