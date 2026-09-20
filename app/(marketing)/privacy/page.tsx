import Link from "next/link";
import { ArrowLeft, Cookie, Database, Eye, FileKey, Lock, Mail, RefreshCw, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | Propfident",
  description: "How Propfident collects, uses, stores, and protects information for its trading tools and analytics platform.",
};

export default function PrivacyPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <div className="container mx-auto max-w-4xl px-4 py-24 font-sans text-foreground sm:px-6 sm:py-28 lg:px-8">
        <div className="space-y-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <header className="space-y-3 border-b border-border/60 pb-8">
            <Badge variant="outline" className="font-mono text-xs text-primary border-primary/40">LEGAL & COMPLIANCE</Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>
            <p className="text-xs font-mono text-muted-foreground">Last updated: September 20, 2026</p>
          </header>

          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Shield className="h-5 w-5 text-primary" /> 1. Overview</h2><p>Propfident (&quot;Propfident,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates propfident.online and related trading tools, analytics, account features, and educational materials. This Privacy Policy explains what information we collect, why we collect it, how we protect it, and the choices available to you.</p><p>By using Propfident, you acknowledge this policy. Where consent is required, such as for analytics cookies, we request it separately through our consent controls.</p></section>

            <section className="space-y-4"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Database className="h-5 w-5 text-primary" /> 2. Information We Collect</h2><div className="space-y-3"><h3 className="text-base font-semibold text-foreground">A. Google OAuth and Supabase Auth data</h3><p>When you sign in with Google, Google and Supabase may provide identifiers such as your name, email address, profile image, provider user ID, and authentication tokens or session metadata. When you create an account directly, Supabase Auth stores the email address, encrypted credential material, verification state, and account timestamps needed to authenticate you. We do not receive or store your Google password.</p></div><div className="space-y-3"><h3 className="text-base font-semibold text-foreground">B. Trading and tool data</h3><p>Inputs to calculators and tools can include account size, drawdown limits, symbols, risk settings, trade journal records, and uploaded CSV data. We use this information to calculate risk metrics and provide requested features. Where a tool processes information in your browser, the data may remain local unless you submit it to a connected feature.</p></div><div className="space-y-3"><h3 className="text-base font-semibold text-foreground">C. Usage, device, and diagnostic data</h3><p>We may receive browser type, device and operating-system information, approximate location derived from network information, referring pages, timestamps, feature interactions, error reports, and performance data. This information helps us secure, troubleshoot, and improve the service.</p></div></section>

            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Eye className="h-5 w-5 text-primary" /> 3. How We Use Information</h2><ul className="list-disc space-y-2 pl-5"><li>Create and secure accounts, process Google OAuth or Supabase Auth sessions, and provide customer support.</li><li>Deliver calculators, dashboards, trade analysis, notifications, educational content, and purchased entitlements.</li><li>Monitor service reliability, prevent fraud or abuse, diagnose errors, and protect the security of Propfident and its users.</li><li>With consent, analyze anonymized session flow and feature usage through Google Analytics to improve navigation and product decisions.</li><li>Meet legal obligations, enforce agreements, and communicate material service, security, or policy changes.</li></ul></section>

            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Lock className="h-5 w-5 text-primary" /> 4. Data Protection & Storage</h2><p>Authentication and application data may be stored and processed using Supabase infrastructure. Supabase provides managed database, authentication, access-control, encryption-in-transit, and operational security features. We apply reasonable technical and organizational safeguards, including least-privilege access and secure transport, but no online service can guarantee absolute security.</p><p>We retain information only for as long as reasonably necessary for the purposes described here, account administration, dispute handling, security, legal compliance, and legitimate business records. Retention periods may vary by data type and whether an account remains active.</p></section>

            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Cookie className="h-5 w-5 text-primary" /> 5. Cookie Policy</h2><p>Propfident uses essential browser storage and similar technologies to maintain preferences, authentication flows, security, and basic functionality. With your consent, Google Analytics may set analytics cookies or use similar identifiers to measure anonymized sessions, page flow, and product usage. Analytics storage is denied by default until you choose Accept All in the cookie control.</p><p>Your consent choice is stored locally in your browser. You can decline analytics cookies or revisit the cookie control to change your preference. Blocking or deleting cookies may affect some site functionality.</p></section>

            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><FileKey className="h-5 w-5 text-primary" /> 6. Third-Party Services</h2><p>We use service providers that process information on our behalf or provide integrated functionality, including Supabase for authentication and data services, Google for OAuth and consented Analytics, Vercel for hosting and delivery, and Whop for checkout and entitlement processing. These providers may process information under their own terms and privacy policies. We do not sell personal information to data brokers.</p></section>

            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><RefreshCw className="h-5 w-5 text-primary" /> 7. Your Privacy Rights</h2><p>Depending on where you live, you may have rights under laws such as the GDPR or CCPA/CPRA to request access, correction, deletion, portability, restriction, or objection to certain processing. You may also withdraw consent for analytics at any time. We may verify your identity before completing a request and may retain limited information where required by law or needed for security and dispute resolution.</p><p>To exercise a right, contact us using the details below. We do not discriminate against you for exercising applicable privacy rights.</p></section>

            <section className="space-y-3"><h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Mail className="h-5 w-5 text-primary" /> 8. Contact and Updates</h2><p>For privacy questions, data access or deletion requests, security reports, or complaints, email <span className="font-mono font-semibold text-foreground">propfidentceos@gmail.com</span>. We may update this policy as our services, legal obligations, or vendors change. The Last updated date above identifies the current version.</p></section>
          </div>
        </div>
      </div>
    </main>
  );
}
