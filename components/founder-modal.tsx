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
      <DialogContent className="sm:max-w-[500px] border-purple-500/20 bg-slate-950 text-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {submitted ? "Complete Your Order" : "Claim Founder's Lifetime Spot"}
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-sm text-slate-400">
              Enter your primary Gmail address to lock in your lifetime discount and receive trade notifications.
            </p>
            <div>
              <Input
                type="email"
                required
                placeholder="trader@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:border-purple-500"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
              {loading ? "Processing..." : "Continue to Checkout"}
            </Button>
          </form>
        ) : (
          <div className="mt-2 min-h-[400px]">
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