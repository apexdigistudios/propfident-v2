"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle2, Loader2 } from "lucide-react";

interface FounderModalProps {
  children?: React.ReactNode;
}

export function FounderModal({ children }: FounderModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from("waitlist")
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to reserve spot. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button>Claim Lifetime Spot</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="gap-1">
              <Zap className="h-3 w-3 fill-primary" />
              Founder's Access
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold font-sans">
            Reserve Your Lifetime Access Spot
          </DialogTitle>
          <DialogDescription>
            Enter your email to lock in $199 lifetime pricing before public release.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-semibold font-sans">You're on the list!</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              We've reserved your priority spot. Keep an eye on your inbox for launch access instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="email" className="text-xs font-mono text-muted-foreground block mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="trader@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-mono">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Reserving...
                </>
              ) : (
                "Lock In Lifetime Pricing"
              )}
            </Button>

            <p className="text-[10px] text-center text-muted-foreground font-mono">
              Limited to 100 spots. No credit card required today.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}