"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  BookOpen,
  Calculator,
  Wand2,
  Building2,
  Wrench,
  Tag,
  Crown,
  Shield,
  Bell,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FounderModal } from "@/components/founder-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/40 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
          : "bg-background/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <Image
            src="/logo.png"
            alt="Propfident"
            width={28}
            height={28}
            className="h-7 w-auto object-contain"
            priority
          />
          <span className="text-foreground">Propfident</span>
        </Link>

        <nav className="hidden items-center gap-4 text-xs font-medium text-muted-foreground md:flex">
          {/* Features Dropdown showing exact 4 engine features */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-foreground focus:outline-none transition-colors">
              <Layers className="h-3.5 w-3.5" />
              <span>Features</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild>
                <Link
                  href="/#features"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span>Drawdown Breach Shield</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/#features"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <Bell className="h-3.5 w-3.5 text-primary" />
                  <span>Multi-Channel Alerts</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/#features"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                  <span>Trade Leak Detector</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/#features"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>Unified Dashboard</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Free Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-foreground focus:outline-none transition-colors">
              <Wrench className="h-3.5 w-3.5" />
              <span>Free Tools</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/position-sizer"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Lot Calculator</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/prop-match"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Prop Match</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/ai-trade-planner"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  <span>Trade Assist</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Standalone Nav Links */}
          <Link
            href="/playbook"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-foreground transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Playbook</span>
          </Link>

          <Link
            href="/#pricing"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-foreground transition-colors"
          >
            <Tag className="h-3.5 w-3.5" />
            <span>Pricing</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <FounderModal>
            <Button
              size="sm"
              className="font-mono text-[10px] uppercase tracking-[0.16em] gap-1.5"
            >
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>Founder&apos;s Access</span>
            </Button>
          </FounderModal>
        </div>
      </div>
    </header>
  );
}