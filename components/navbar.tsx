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
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-background/95 shadow-md backdrop-blur-xl"
          : "bg-background/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight shrink-0"
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 text-xs font-medium text-muted-foreground md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-foreground focus:outline-none transition-colors">
              <Layers className="h-3.5 w-3.5" />
              <span>Features</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span>Drawdown Breach Shield</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
                  <Bell className="h-3.5 w-3.5 text-primary" />
                  <span>Multi-Channel Alerts</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
                  <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                  <span>Trade Leak Detector</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>Unified Dashboard</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-foreground focus:outline-none transition-colors">
              <Wrench className="h-3.5 w-3.5" />
              <span>Free Tools</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild>
                <Link href="/tools/position-sizer" className="flex items-center gap-2 w-full cursor-pointer">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Lot Calculator</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/prop-match" className="flex items-center gap-2 w-full cursor-pointer">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Prop Match</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/ai-trade-planner" className="flex items-center gap-2 w-full cursor-pointer">
                  <Wand2 className="h-3.5 w-3.5" />
                  <span>Trade Assist</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          
          <div className="hidden sm:block">
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

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer (Clean menu only, no CTA) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/98 px-4 py-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-5 text-sm font-medium">
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-primary" /> Platform Features
              </p>
              <div className="grid grid-cols-1 gap-1 pl-2 font-sans text-xs">
                <Link
                  href="/#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground"
                >
                  Drawdown Breach Shield
                </Link>
                <Link
                  href="/#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground"
                >
                  Multi-Channel Alerts
                </Link>
                <Link
                  href="/#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground"
                >
                  Trade Leak Detector
                </Link>
                <Link
                  href="/#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground"
                >
                  Unified Dashboard
                </Link>
              </div>
            </div>

            <div className="space-y-2 border-t border-border/40 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-primary" /> Free Trading Tools
              </p>
              <div className="grid grid-cols-1 gap-1 pl-2 font-sans text-xs">
                <Link
                  href="/tools/position-sizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground flex items-center gap-2"
                >
                  <Calculator className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Lot Calculator</span>
                </Link>
                <Link
                  href="/tools/prop-match"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground flex items-center gap-2"
                >
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Prop Match Evaluator</span>
                </Link>
                <Link
                  href="/tools/ai-trade-planner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-foreground/90 hover:text-foreground flex items-center gap-2"
                >
                  <Wand2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Trade Assist</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2 border-t border-border/40 pt-4 flex flex-col gap-2 font-sans text-xs">
              <Link
                href="/playbook"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-foreground flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="font-semibold">Traders Playbook</span>
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-foreground flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-primary" />
                <span className="font-semibold">Pricing & Founder Pass</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}