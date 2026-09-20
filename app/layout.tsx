import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { PwaInstallBanner } from "@/components/pwa-install-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propfident.online"),
  title: {
    default: "Propfident | Never Breach Your Prop Firm Account Again",
    template: "%s | Propfident",
  },
  description:
    "Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.",
  alternates: { canonical: "./" },
  keywords: [
    "prop firm",
    "prop firm trading risk",
    "prop firm challenge",
    "FTMO",
    "FundedNext",
    "Funding Pips",
    "The 5%ers",
    "drawdown calculator",
    "position sizer",
    "funded trading",
    "risk management",
    "AI trade planner",
  ],
  authors: [{ name: "Propfident Team" }],
  creator: "Propfident",
  publisher: "Propfident",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Propfident | Never Breach Your Prop Firm Account Again",
    description:
      "Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.",
    url: "https://propfident.online/",
    siteName: "Propfident",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Propfident prop firm trading risk suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Propfident | Never Breach Your Prop Firm Account Again",
    description:
      "Protect your prop firm account with real-time drawdown monitoring, dynamic position sizing, trade journaling, and MT4/MT5 analytics. Start free.",
    images: ["/hero-bg.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full max-w-full overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground w-full max-w-full overflow-x-hidden`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HX04Z0TKWB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('js', new Date());
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    name: "Propfident",
                    url: "https://propfident.online",
                    logo: "https://propfident.online/logo.png",
                  },
                  {
                    "@type": "SoftwareApplication",
                    name: "Propfident",
                    applicationCategory: "FinanceApplication",
                    operatingSystem: "Web",
                    url: "https://propfident.online",
                    description: metadata.description,
                    offers: {
                      "@type": "Offer",
                      price: "0",
                      priceCurrency: "USD",
                    },
                  },
                ],
              }),
            }}
          />
          {children}
          <CookieConsent />
          <PwaInstallBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}