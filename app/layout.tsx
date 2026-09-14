import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Propfident — Safe & Scalable Funded Account Management",
  description:
    "The ultimate SaaS for prop firm traders. Protect your funded accounts with real-time drawdown monitoring, risk calculations, and AI trade analytics.",
  keywords: [
    "prop firm",
    "FTMO",
    "FundedNext",
    "drawdown calculator",
    "position sizer",
    "funded trading",
    "risk management",
  ],
  authors: [{ name: "Propfident Team" }],
  openGraph: {
    title: "Propfident — Never Breach Your Funded Account Again",
    description:
      "Protect your funded accounts with real-time drawdown alerts, position sizing, and AI trade analytics.",
    url: "https://propfident.online",
    siteName: "Propfident",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Propfident Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Propfident — Funded Account Guard",
    description:
      "Real-time drawdown protection and AI risk management for prop traders.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}