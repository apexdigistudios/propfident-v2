"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Newspaper,
  RefreshCw,
  Search,
  Flame,
  Globe2,
  Calendar,
  AlertCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export interface ForexNewsEvent {
  id: string;
  title: string;
  country: string;
  date: string;
  impact: "High" | "Medium" | "Low" | "Holiday" | string;
  forecast: string;
  previous: string;
  actual: string;
}

interface MarketNewsProps {
  onChangeView?: (view: any) => void;
}

const CURRENCIES = ["ALL", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"];

export function MarketNews({ onChangeView }: MarketNewsProps) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<ForexNewsEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("ALL");
  const [impactFilter, setImpactFilter] = useState<"ALL" | "HIGH_ONLY" | "MED_HIGH">("MED_HIGH");

  useEffect(() => {
    fetchMarketNews();
  }, []);

  const fetchMarketNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/market-news");
      const data = await res.json();

      if (data.success && data.events) {
        setEvents(data.events);
      } else {
        setError("Unable to load live Forex Factory news. Retrying feed...");
      }
    } catch (err) {
      console.error("Error fetching market news:", err);
      setError("Network error connecting to Forex Factory feed.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered dataset
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCurrency =
        selectedCurrency === "ALL" || event.country.toUpperCase() === selectedCurrency;

      const matchesImpact =
        impactFilter === "ALL"
          ? true
          : impactFilter === "HIGH_ONLY"
          ? event.impact?.toLowerCase() === "high"
          : event.impact?.toLowerCase() === "high" || event.impact?.toLowerCase() === "medium";

      return matchesSearch && matchesCurrency && matchesImpact;
    });
  }, [events, searchQuery, selectedCurrency, impactFilter]);

  // High Impact Count for Badge
  const highImpactCount = events.filter((e) => e.impact?.toLowerCase() === "high").length;

  if (loading) {
    return <MarketNewsSkeleton />;
  }

  return (
    <div className="space-y-4 font-sans text-foreground">
      {/* 1. TOP CONTROL BAR */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-100/90 dark:bg-zinc-900/90 p-3.5 md:p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-2xl bg-amber-500/15 text-amber-500 shrink-0">
            <Newspaper className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm md:text-base font-extrabold tracking-tight">Forex Factory Terminal Feed</h3>
              <Badge className="bg-red-500/15 text-red-500 border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="size-3 fill-red-500" />
                {highImpactCount} High Impact
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Real-time economic calendar & volatility events</p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-44">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter event or currency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-background border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            />
          </div>

          {/* Impact Filter Pills */}
          <div className="flex items-center bg-background border border-slate-200 dark:border-zinc-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setImpactFilter("ALL")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                impactFilter === "ALL" ? "bg-slate-200 dark:bg-zinc-800 text-foreground font-bold" : "text-muted-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setImpactFilter("MED_HIGH")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                impactFilter === "MED_HIGH" ? "bg-amber-500/20 text-amber-500 font-bold" : "text-muted-foreground"
              }`}
            >
              Med & High
            </button>
            <button
              onClick={() => setImpactFilter("HIGH_ONLY")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                impactFilter === "HIGH_ONLY" ? "bg-red-500/20 text-red-500 font-bold" : "text-muted-foreground"
              }`}
            >
              High Only
            </button>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={fetchMarketNews}
            className="size-8 rounded-xl shrink-0"
            title="Refresh Forex Factory Feed"
          >
            <RefreshCw className="size-3.5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* 2. CURRENCY SELECTOR STRIP */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1 shrink-0">
          <Globe2 className="size-3.5" /> Currency:
        </span>
        {CURRENCIES.map((curr) => (
          <button
            key={curr}
            onClick={() => setSelectedCurrency(curr)}
            className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all shrink-0 border ${
              selectedCurrency === curr
                ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-sm"
                : "bg-slate-100/80 dark:bg-zinc-900/80 border-slate-200/80 dark:border-zinc-800/80 text-muted-foreground hover:bg-slate-200/60 dark:hover:bg-zinc-800"
            }`}
          >
            {curr}
          </button>
        ))}
      </div>

      {/* 3. CALENDAR TABLE */}
      <Card className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-100/60 dark:bg-zinc-900/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-200/50 dark:bg-zinc-800/50 text-muted-foreground font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Time / Date</th>
                <th className="py-3.5 px-4">Currency</th>
                <th className="py-3.5 px-4">Impact</th>
                <th className="py-3.5 px-4">Event Title</th>
                <th className="py-3.5 px-4 text-center">Forecast</th>
                <th className="py-3.5 px-4 text-center">Previous</th>
                <th className="py-3.5 px-4 text-right">Actual</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/60 dark:divide-zinc-800/60 font-medium">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  const impactLower = event.impact?.toLowerCase();
                  const isHigh = impactLower === "high";
                  const isMed = impactLower === "medium";

                  return (
                    <tr
                      key={event.id}
                      className={`hover:bg-slate-200/40 dark:hover:bg-zinc-800/40 transition-colors ${
                        isHigh ? "bg-red-500/5 dark:bg-red-500/10" : ""
                      }`}
                    >
                      {/* Time / Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5 font-bold text-foreground">
                          <Clock className="size-3.5 text-muted-foreground" />
                          <span>{event.date ? new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "All Day"}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {event.date ? new Date(event.date).toLocaleDateString([], { month: "short", day: "numeric" }) : ""}
                        </span>
                      </td>

                      {/* Currency */}
                      <td className="py-3.5 px-4 font-extrabold text-sm text-foreground">
                        <Badge variant="outline" className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-lg">
                          {event.country || "USD"}
                        </Badge>
                      </td>

                      {/* Impact Badge */}
                      <td className="py-3.5 px-4">
                        <Badge
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border-none ${
                            isHigh
                              ? "bg-red-500 text-white shadow-sm"
                              : isMed
                              ? "bg-amber-500 text-black shadow-sm"
                              : "bg-slate-200 dark:bg-zinc-800 text-muted-foreground"
                          }`}
                        >
                          {isHigh ? "HIGH" : isMed ? "MED" : "LOW"}
                        </Badge>
                      </td>

                      {/* Event Title */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-zinc-100 text-sm max-w-xs md:max-w-md truncate">
                        {event.title}
                      </td>

                      {/* Forecast */}
                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-muted-foreground">
                        {event.forecast || "—"}
                      </td>

                      {/* Previous */}
                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-muted-foreground">
                        {event.previous || "—"}
                      </td>

                      {/* Actual */}
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-foreground">
                        <span className={event.actual !== "—" ? "text-emerald-500 font-bold" : ""}>
                          {event.actual || "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <AlertCircle className="size-8 text-muted-foreground/40" />
                      <p className="text-sm font-semibold">No Forex Factory events match your current filter</p>
                      <p className="text-xs text-muted-foreground/70">Try adjusting the currency or impact filter above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function MarketNewsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}