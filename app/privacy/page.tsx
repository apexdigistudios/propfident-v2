import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | Propfident",
  description: "Privacy policy and data protection guidelines for Propfident users.",
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
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-xs font-mono text-muted-foreground">
          Last updated: September 15, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> 1. Overview & Data Philosophy
          </h2>
          <p>
            Propfident (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates <strong className="text-foreground">propfident.online</strong>. We treat your trading data with strict confidentiality. Propfident is engineered as a risk monitoring utility, meaning we collect only the minimal necessary telemetry required to deliver drawdown calculations, position sizing metrics, and trade analytics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Account & Billing Data:</strong> Managed securely through our payment provider, Whop. We receive your email address and payment status to grant software access. We never store credit card numbers on our servers.
            </li>
            <li>
              <strong className="text-foreground">Trading Telemetry & Logs:</strong> File metadata and trade logs (CSV uploads) processed within tools like the Playbook or Prop Match Evaluator are parsed in memory or encrypted cloud storage to generate performance reports.
            </li>
            <li>
              <strong className="text-foreground">Usage Telemetry:</strong> Anonymized browser information, device type, and error logs to optimize engine execution speeds.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. How We Use Your Data</h2>
          <p>Your data is exclusively used to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Calculate real-time daily and trailing drawdown limits.</li>
            <li>Provide automated rule violation warnings (Discord, Telegram, SMS alerts).</li>
            <li>Authenticate your Founder&apos;s Pass access via Whop integration.</li>
            <li>Continuously refine our AI Trade Leak analytics algorithms.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Third-Party Integrations</h2>
          <p>
            We rely on trusted third-party providers for platform operations:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Whop:</strong> Subscription &amp; checkout infrastructure.</li>
            <li><strong className="text-foreground">Vercel:</strong> Web hosting and edge server infrastructure.</li>
            <li><strong className="text-foreground">Discord:</strong> Community authentication and push alert routing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Data Retention & Deletion</h2>
          <p>
            You retain 100% ownership of your trading records. You may request complete erasure of your account details and imported trading history at any time by contacting support at <span className="font-mono text-foreground">support@propfident.online</span>.
          </p>
        </section>
      </div>
    </div>
  );
}