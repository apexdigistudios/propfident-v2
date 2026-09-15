'use client';

import { useState } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FounderModal({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: "founders-access" }),
      });
    } catch (error) {
      console.error("Failed to capture lead:", error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSubmitted(false);
      setEmail("");
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[92vw] sm:max-w-[540px] max-h-[85vh] overflow-y-auto border-purple-500/20 bg-background text-foreground p-5 sm:p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {submitted ? "Complete Your Order" : "Claim Founder's Lifetime Spot"}
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your primary Gmail address to lock in your lifetime discount and receive trade notifications.
            </p>
            <div>
              <Input
                type="email"
                required
                placeholder="trader@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500 h-11"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-primary-foreground font-semibold h-11">
              {loading ? "Processing..." : "Continue to Checkout"}
            </Button>
          </form>
        ) : (
          <div className="mt-2 min-h-[480px] w-full overflow-hidden">
            <WhopCheckoutEmbed
              planId="plan_HyuVVMrLogZ2Y"
              returnUrl="https://propfident.online/checkout/complete"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}