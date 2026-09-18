import Link from "next/link";
import { Shield, ArrowLeft, Lock, Database, Eye, RefreshCw, Mail, Cookie } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | Propfident",
  description: "Comprehensive privacy policy and data protection guidelines for Propfident users.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-xs font-mono text-muted-foreground">
          Last updated: September 15, 2026
        </p>
      </div>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> 1. Overview & Data Philosophy
          </h2>
          <p>
            Propfident (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates <strong className="text-foreground">propfident.online</strong>. We are committed to maintaining the absolute confidentiality, privacy, and security of your personal and trading data. Designed specifically for proprietary firm traders, Propfident operates on a minimal-data collection principle: we gather only the necessary telemetry required to process drawdown alerts, position sizing metrics, trade leak analysis, and account verification.
          </p>
          <p>
            By accessing our site, using our evaluation tools, or purchasing a Founder&apos;s Lifetime Pass, you acknowledge and agree to the practices outlined in this Privacy Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" /> 2. Information We Collect
          </h2>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">A. Authentication & Billing Information</h3>
            <p>
              When you purchase access to Propfident, processing is handled by our merchant partner, Whop. We receive basic transaction metadata including your email address, purchase timestamp, and subscription entitlement status. We do not process, store, or have access to raw payment card numbers or banking credentials.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">B. Trading Telemetry & File Data</h3>
            <p>
              When you utilize tools such as our Prop Match Evaluator, Lot Calculator, or Trade Playbook CSV uploaders, your trade logs, symbol selections, account sizes, and historical execution records are parsed to generate compliance metrics. Where possible, file processing occurs locally in-memory within your browser or securely over transient server connections.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">C. Technical & Diagnostic Logs</h3>
            <p>
              We automatically collect diagnostic technical information when you navigate our platform, including browser type, operating system, IP address, referral URLs, and performance error logs to maintain system stability and optimize execution speed.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" /> 3. How We Use Your Data
          </h2>
          <p>We use collected data strictly for operational, support, and security purposes, including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Calculating daily drawdown buffers, maximum loss thresholds, and trailing equity limits.</li>
            <li>Routing automated risk alerts and trade leak notifications across connected push channels and supported social platforms.</li>
            <li>Verifying entitlement rights and granting lifetime software access via Whop integration.</li>
            <li>Improving risk model accuracy and diagnosing platform performance bugs.</li>
            <li>Communicating crucial technical updates, platform maintenance, and security notices.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" /> 4. Analytics & Cookies
          </h2>
          <p>
            With your consent, Propfident uses Google Analytics to collect anonymized session flow data, such as which pages are visited, how users move through the site, and which features are used. This helps us understand usage patterns and improve the product. Google Analytics may use cookies or similar technologies to provide these aggregated insights; we do not use this data to identify you personally.
          </p>
          <p>
            You can accept or decline analytics cookies using the cookie controls on this site. Your choice is stored locally in your browser and can be changed by opening the cookie settings button.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" /> 5. Data Sharing & Third-Party Vendors
          </h2>
          <p>
            Propfident does not sell, rent, or trade your personal or trading information to advertisers or data brokers. We share data only with essential infrastructure providers:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Whop:</strong> Manages authentication, checkout, and entitlement authorization.</li>
            <li><strong className="text-foreground">Vercel:</strong> Delivers secure cloud hosting, edge functions, and global network routing.</li>
            <li><strong className="text-foreground">Supported Social Platforms:</strong> Enables account verification, community updates, and push notifications when opted into by the user.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" /> 6. Data Retention & Your Rights
          </h2>
          <p>
            You retain complete ownership over your trading strategy and historical trade data. You have the right to request deletion of any personal identifiers or stored telemetry associated with your account at any time. To request data erasure or export, contact our executive team at <span className="font-mono text-foreground font-semibold">propfidentceos@gmail.com</span>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" /> 7. Updates & Contact Information
          </h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in legal standards, software capabilities, or third-party integrations. Continued use of Propfident constitutes acceptance of any modified terms.
          </p>
          <p>
            For privacy inquiries, data deletion requests, or security reports, email us directly at: <span className="font-mono text-foreground font-semibold">propfidentceos@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}