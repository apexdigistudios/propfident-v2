"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  BookOpen,
  Wrench,
  Tag,
  Crown,
  Layers,
  Menu,
  X,
  Compass,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();

  const isRoadmapPage = pathname === "/millionaire-roadmap";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dedicated Header when on the Millionaire Roadmap Page
  if (isRoadmapPage) {
    return (
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-primary/20 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 shadow-lg shadow-primary/10 backdrop-blur-xl"
            : "bg-background/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-8 gap-2">
          {/* Left Navigation Group */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
            <Link
              href="/"
              className="flex items-center justify-center text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/60 rounded-lg p-2 sm:px-2.5 sm:py-1.5 bg-card/50 shrink-0"
              aria-label="Back to Propfident"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-1.5">Back to Propfident</span>
            </Link>

            <div className="h-4 w-px bg-border/60 shrink-0 hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 truncate">
              <Compass className="h-4 w-4 text-primary shrink-0" />
              <span className="font-sans font-extrabold text-xs sm:text-sm uppercase tracking-tight text-foreground truncate">
                <span className="sm:hidden">Roadmap</span>
                <span className="hidden sm:inline">Millionaire Roadmap</span>
              </span>
              <Badge
                variant="outline"
                className="hidden md:inline-flex font-mono text-[10px] border-primary/40 bg-primary/10 text-primary px-2 py-0.5 shrink-0"
              >
                TEASER
              </Badge>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
              className="bg-primary hover:bg-primary text-white font-mono text-xs gap-1.5 px-2.5 sm:px-3"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Join Waitlist</span>
              <span className="sm:hidden">Waitlist</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Standard Homepage Header
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
                  <span>Drawdown Breach Shield</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
                  <span>Multi-Channel Alerts</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
                  <span>Trade Leak Detector</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="flex items-center gap-2 w-full cursor-pointer">
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
                  <span>Lot Calculator</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/prop-match" className="flex items-center gap-2 w-full cursor-pointer">
                  <span>Prop Match</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/ai-trade-planner" className="flex items-center gap-2 w-full cursor-pointer">
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

          {/* Roadmap CTA - Positioned Last */}
          <Link
            href="/millionaire-roadmap"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-primary font-semibold hover:text-primary transition-colors"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Roadmap</span>
            <span className="font-mono text-[9px] bg-primary/10 border border-primary/30 px-1.5 py-0.2 rounded text-primary uppercase">
              SOON
            </span>
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
                <span>Lifetime Access</span>
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/98 px-6 py-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Layers className="h-4 w-4 text-primary" />
              <span>Features</span>
            </Link>

            {/* Mobile Nested Menu: Free Tools */}
            <div className="border-y border-border/40 py-1">
              <button
                type="button"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="py-2 text-foreground hover:text-primary transition-colors flex items-center justify-between w-full font-medium"
              >
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  <span>Free Tools</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    mobileToolsOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {mobileToolsOpen && (
                <div className="pl-6 pb-2 pt-1 flex flex-col gap-2.5 text-xs text-muted-foreground">
                  <Link
                    href="/tools/position-sizer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span>Lot Calculator</span>
                  </Link>
                  <Link
                    href="/tools/prop-match"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span>Prop Match</span>
                  </Link>
                  <Link
                    href="/tools/ai-trade-planner"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span>Trade Assist</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/playbook"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Playbook</span>
            </Link>

            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Tag className="h-4 w-4 text-primary" />
              <span>Pricing</span>
            </Link>

            {/* Roadmap CTA - Positioned Last */}
            <Link
              href="/millionaire-roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-primary font-semibold hover:text-primary transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span>Millionaire Roadmap</span>
              </div>
              <span className="font-mono text-[10px] bg-primary/10 border border-primary/30 px-2 py-0.5 rounded text-primary uppercase">
                SOON
              </span>
            </Link>

            <div className="pt-4 border-t border-border/40">
              <FounderModal>
                <Button className="w-full font-mono text-xs uppercase tracking-wider gap-2 py-5 shadow-lg">
                  <Crown className="h-4 w-4 text-amber-400" />
                  <span>Claim Lifetime Access ($299)</span>
                </Button>
              </FounderModal>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}