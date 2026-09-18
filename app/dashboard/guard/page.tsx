import { ShieldCheck, AlertTriangle, Lock, RefreshCw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DrawdownGuardPage() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <h1 className="text-xl sm:text-2xl font-black text-foreground">
              Drawdown Guard
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Automated safety controls for your connected trading account.
          </p>
        </div>
        <Button size="sm" className="font-mono text-xs gap-1.5 self-start sm:self-auto">
          <RefreshCw className="h-3.5 w-3.5" /> Sync Account Rules
        </Button>
      </div>

      {/* Main Status & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Meters */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <h2 className="text-sm font-bold text-foreground flex items-center justify-between">
              <span>Daily Loss Limit Tracker</span>
              <span className="text-xs font-mono text-emerald-500 font-semibold">1.12% / 5.00% Used</span>
            </h2>

            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500 w-[22.4%] rounded-full" />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>$0.00 Current Loss</span>
                <span>$5,000.00 Max Limit</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2 text-xs">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Lock className="h-4 w-4 text-primary" />
                <span>Auto Lock Trigger</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                If your daily balance drops below $99,250.00, open positions will be closed automatically and new trades paused for 24 hours.
              </p>
            </div>
          </div>

          {/* Alert History Log */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <h2 className="text-sm font-bold text-foreground">Recent Protection Log</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Protection Active</p>
                    <p className="text-[10px] text-muted-foreground font-mono">FTMO $100k Account Synchronized</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">Today, 08:30 AM</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Approaching Daily Limit</p>
                    <p className="text-[10px] text-muted-foreground font-mono">Floating loss reached 1.0%</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">Yesterday, 02:15 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Panel */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Safety Rules</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <p className="font-bold text-foreground">Max Daily Loss (%)</p>
              <p className="text-[11px] font-mono text-primary font-semibold">5.00% ($5,000.00)</p>
            </div>

            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <p className="font-bold text-foreground">Overall Account Loss (%)</p>
              <p className="text-[11px] font-mono text-primary font-semibold">10.00% ($10,000.00)</p>
            </div>

            <div className="p-3 rounded-xl border border-border bg-background space-y-1">
              <p className="font-bold text-foreground">News Lock Out</p>
              <p className="text-[11px] font-mono text-emerald-500 font-semibold">Active (Pause 5m before news)</p>
            </div>
          </div>

          <Button variant="outline" className="w-full text-xs font-mono font-semibold">
            Edit Safety Thresholds
          </Button>
        </div>
      </div>
    </div>
  );
}