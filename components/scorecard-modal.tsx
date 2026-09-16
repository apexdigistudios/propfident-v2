"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toPng } from "html-to-image";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Coins,
  DollarSign,
  Download,
  Globe,
  LineChart,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ScorecardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  traderName: string;
  setTraderName: (name: string) => void;
  topFirm: {
    name: string;
    logoUrl: string;
    score: number;
  } | null;
  metrics: {
    winRate: number;
    maxDailyDrawdown: number;
    overallDrawdown: number;
    totalTrades: number;
  };
  rankedFirms: Array<{
    id: string;
    name: string;
    score: number;
  }>;
};

export function ScorecardModal({
  isOpen,
  onClose,
  traderName,
  setTraderName,
  topFirm,
  metrics,
  rankedFirms,
}: ScorecardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auto-scale fixed 1200px container to fit screen on mobile devices
  useEffect(() => {
    const handleResize = () => {
      const padding = 32;
      const targetWidth = 1200;
      const availableWidth = window.innerWidth - padding;
      if (availableWidth < targetWidth) {
        setScale(availableWidth / targetWidth);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1200,
        height: 630,
        style: {
          transform: "none", // Reset scale transform during PNG capture
        },
      });

      const anchor = document.createElement("a");
      anchor.download = `propfident-scorecard-${(traderName || "trader")
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;
      anchor.href = dataUrl;
      anchor.click();
    } catch (err) {
      console.error("Failed to generate certificate PNG:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      {/* Top Floating Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl rounded-full px-5 text-xs font-mono"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Generating..." : "Download PNG"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Responsive Wrapper maintaining scaled proportions */}
      <div
        className="flex items-center justify-center transition-transform duration-200"
        style={{
          width: `${1200 * scale}px`,
          height: `${630 * scale}px`,
        }}
      >
        {/* Fixed 1200x630 Card Container */}
        <div
          ref={cardRef}
          style={{
            width: "1200px",
            height: "630px",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          className="relative overflow-hidden rounded-[28px] border-2 border-blue-500/50 bg-[linear-gradient(135deg,#09090b_0%,#0f172a_50%,#09090b_100%)] p-8 shrink-0 text-white select-none shadow-[0_25px_80px_rgba(59,130,246,0.3)]"
        >
          {/* Background Watermarks */}
          <Globe className="absolute top-4 left-6 h-24 w-24 text-blue-500/10 -rotate-12 pointer-events-none" />
          <TrendingUp className="absolute top-6 right-16 h-28 w-28 text-indigo-500/10 rotate-12 pointer-events-none" />
          <BarChart3 className="absolute bottom-10 left-1/3 h-32 w-32 text-purple-500/10 rotate-6 pointer-events-none" />
          <Coins className="absolute bottom-6 right-8 h-24 w-24 text-emerald-500/10 -rotate-45 pointer-events-none" />
          <LineChart className="absolute bottom-4 left-8 h-24 w-24 text-cyan-500/10 rotate-12 pointer-events-none" />
          <Activity className="absolute top-1/2 right-1/4 h-20 w-20 text-blue-400/5 -rotate-12 pointer-events-none" />
          <DollarSign className="absolute top-1/3 left-10 h-20 w-20 text-emerald-400/5 rotate-45 pointer-events-none" />
          <Zap className="absolute bottom-1/3 right-10 h-16 w-16 text-amber-400/5 -rotate-12 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Propfident" width={40} height={40} />
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-blue-400 font-bold uppercase">
                  PROPFIDENT VERIFIED EVALUATION
                </p>
                <p className="text-base font-bold text-white">Certificate of Compliance</p>
              </div>
            </div>
            <Badge className="bg-violet-500/20 text-violet-200 border border-violet-500/40 font-mono text-xs px-3 py-1">
              Verified Scorecard
            </Badge>
          </div>

          {/* Card Body Grid */}
          <div className="relative z-10 mt-6 grid grid-cols-[1fr_320px] gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400">TRADER NAME</p>
              <input
                value={traderName}
                onChange={(e) => setTraderName(e.target.value)}
                placeholder="Enter Trader Name"
                className="mt-1 w-full border-b border-white/20 bg-transparent py-1.5 text-3xl font-bold text-white outline-none focus:border-blue-400 font-sans placeholder:text-zinc-600"
              />

              <p className="mt-6 text-xs uppercase tracking-[0.2em] font-mono text-zinc-400">HIGHEST MATCHED FIRM</p>
              <div className="mt-2 flex items-center gap-3">
                <Image
                  src={topFirm?.logoUrl ?? "/logo.png"}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-xl object-contain bg-white/5 p-1.5 border border-white/10"
                />
                <div>
                  <span className="text-2xl font-bold text-white">{topFirm?.name ?? "N/A"}</span>
                  <p className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Top recommended challenge match
                  </p>
                </div>
              </div>

              {/* Performance Snapshot */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 grid grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px]">WIN RATE</span>
                  <span className="font-bold text-white text-base">{metrics.winRate.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">MAX DAILY DD</span>
                  <span className="font-bold text-white text-base">{metrics.maxDailyDrawdown.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">OVERALL DD</span>
                  <span className="font-bold text-white text-base">{metrics.overallDrawdown.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">TOTAL TRADES</span>
                  <span className="font-bold text-white text-base">{metrics.totalTrades}</span>
                </div>
              </div>
            </div>

            {/* Right Column Matrix */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400 text-right">
                  PASS PROBABILITY
                </p>
                <p className="mt-1 text-7xl font-extrabold text-blue-400 font-mono text-right">
                  {topFirm?.score ?? 0}%
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                  Top 3 Match Matrix
                </p>
                {rankedFirms.slice(0, 3).map((firm, idx) => (
                  <div
                    key={firm.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono"
                  >
                    <span className="text-white truncate">
                      {idx + 1}. {firm.name}
                    </span>
                    <span className="font-bold text-blue-400">{firm.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-zinc-400">
            <span>Verified by Propfident Engine</span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}