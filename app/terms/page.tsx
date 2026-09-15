import Link from "next/link";
import { FileText, ArrowLeft, ShieldAlert, CreditCard, Scale, Lock, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Service | Propfident",
  description: "Terms and conditions governing access, payment, and software usage for Propfident.",
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
          LEGAL AGREEMENT
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-xs font-mono text-muted-foreground">
          Last updated: September 15, 2026
        </p>
      </div>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> 1. Acceptance of Terms & Eligibility
          </h2>
          <p>
            These Terms of Service (&quot;Agreement&quot;) constitute a legally binding agreement between you and Propfident governing your access to and use of <strong className="text-foreground">propfident.online</strong>, including our web application, free trading utilities, Playbook modules, and risk management systems.
          </p>
          <p>
            By accessing the platform or purchasing a pass, you represent that you are at least 18 years of age, have full legal capacity to enter into binding contracts, and agree to abide by all terms contained herein.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" /> 2. Founder&apos;s Access, Pricing & Final Sales
          </h2>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">A. Lifetime Access & Scope</h3>
            <p>
              Purchasing the Founder&apos;s Pass provides lifetime license access to Propfident core software, trade leak analytics, risk models, and all future core updates without recurring subscription fees.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">B. Pricing & Payment Processing</h3>
            <p>
              The current price for Founder&apos;s Access is a fixed one-time payment of <strong className="text-foreground">$299 USD</strong>. All transactions are securely processed through Whop. You agree to provide valid billing information during checkout.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">C. Final Sale & No-Refund Policy</h3>
            <p>
              Due to the immediate digital delivery of proprietary intellectual property, downloadable trade models, automated calculators, and instant access to proprietary risk metrics upon purchase, <strong className="text-foreground">all sales are final and non-refundable</strong>. Please evaluate our free tools and documentation before completing your purchase.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" /> 3. License Grant & Authorized Use
          </h2>
          <p>
            Upon successful payment, Propfident grants you a limited, non-exclusive, non-transferable, revocable license to access and use the platform for individual trading risk management. You explicitly agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sublicense, resell, rent, lease, or redistribute software access, CSV templates, or Playbook contents.</li>
            <li>Reverse-engineer, decompile, or extract the source code or risk algorithms of Propfident.</li>
            <li>Automate unauthorized web scraping or data harvesting against our APIs or tools.</li>
            <li>Share account credentials, license keys, or access links on public forums or supported social platforms.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" /> 4. Financial & Prop Firm Disclaimer
          </h2>
          <p>
            <strong className="text-foreground">Propfident is a risk calculation software tool and does not provide investment or financial advice.</strong> We are not a broker-dealer, financial advisor, or proprietary trading firm. 
          </p>
          <p>
            Users are solely responsible for verifying their trades, lot sizes, and daily drawdown parameters against their individual proprietary firm rulesets. Propfident is not responsible for trading losses, account evaluation failures, or firm rule breaches resulting from market slippage, broker lag, or user miscalculation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" /> 5. Limitation of Liability & Warranties
          </h2>
          <p>
            Propfident is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. In no event shall Propfident, its founders, or affiliates be liable for any indirect, incidental, consequential, or loss-of-profit damages arising out of your use or inability to use the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" /> 6. Termination & Inquiries
          </h2>
          <p>
            We reserve the right to suspend or terminate software access immediately without prior notice if a user violates these Terms of Service or engages in fraudulent activity.
          </p>
          <p>
            For questions regarding these terms, contact our executive team directly at: <span className="font-mono text-foreground font-semibold">propfidentceos@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}