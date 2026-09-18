"use client";

import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const DISMISSED_KEY = "propfident-pwa-install-dismissed";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone));
}

export function PwaInstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (isStandalone() || window.localStorage.getItem(DISMISSED_KEY) === "true") return;

    const iosDevice = isIos();
    setIos(iosDevice);
    if (iosDevice) setShowBanner(true);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, "true");
    setShowBanner(false);
  }

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") dismiss();
    setInstallPrompt(null);
  }

  if (!showBanner || (!ios && !installPrompt)) return null;

  return (
    <aside
      aria-label="Install Propfident"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-primary/30 bg-background p-4 shadow-2xl"
    >
      <button
        type="button"
        aria-label="Dismiss install banner"
        onClick={dismiss}
        className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-3 pr-5">
        {ios ? <Share className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> : <Download className="mt-0.5 h-5 w-5 shrink-0 text-primary" />}
        <div>
          <h2 className="text-sm font-semibold text-foreground">Install Propfident</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {ios ? "Tap the Share button and select 'Add to Home Screen'." : "Install Propfident for quick access to your trading tools."}
          </p>
        </div>
      </div>
      {!ios && (
        <Button type="button" size="sm" className="mt-3" onClick={installApp}>
          Install App
        </Button>
      )}
    </aside>
  );
}