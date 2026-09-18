"use client";

import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "propfident-cookie-consent";
const ANALYTICS_ID = "G-HX04Z0TKWB";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });

  if (granted) {
    window.gtag("config", ANALYTICS_ID);
  }
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(CONSENT_KEY);
    if (choice === "accepted" || choice === "declined") {
      updateAnalyticsConsent(choice === "accepted");
    } else {
      setIsOpen(true);
    }
  }, []);

  function handleClose(choice?: "accepted" | "declined") {
    setIsClosing(true);
    if (choice) {
      window.localStorage.setItem(CONSENT_KEY, choice);
      updateAnalyticsConsent(choice === "accepted");
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Cookie settings"
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            handleClose();
          } else {
            setIsOpen(true);
          }
        }}
        className="fixed bottom-4 left-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-lg transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Cookie className="h-5 w-5" />
      </button>

      {isOpen && (
        <aside
          aria-label="Cookie consent"
          aria-live="polite"
          className={`fixed bottom-20 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm origin-bottom-left rounded-xl border border-border bg-background p-5 text-left shadow-2xl transition-all duration-300 ease-out sm:left-20 ${
            isClosing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <button
            type="button"
            aria-label="Close cookie settings"
            onClick={() => handleClose()}
            className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="pr-6 text-sm font-semibold text-foreground">Cookies & analytics</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            We use Google Analytics cookies to understand anonymized user sessions, page flow, and product usage so we can improve Propfident. Read our{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <Button type="button" size="sm" onClick={() => handleClose("accepted")}>
              Accept All
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => handleClose("declined")}>
              Decline
            </Button>
          </div>
        </aside>
      )}
    </>
  );
}