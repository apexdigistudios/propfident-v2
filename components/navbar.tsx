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
        className={`fixed inset-x-0 top-0 z-50 border-b border-purple-500/20 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 shadow-lg shadow-purple-950/10 backdrop-blur-xl"
            : "bg-background/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/60 rounded-lg px-2.5 py-1.5 bg-card/50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to Propfident</span>
            </Link>

            <div className="h-4 w-px bg-border/60" />

            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-purple-500" />
              <span className="font-sans font-extrabold text-sm uppercase tracking-tight text-foreground">
                Millionaire Roadmap
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[10px] border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5"
              >
                TEASER
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Join Waitlist</span>
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

          {/* New Millionaire Roadmap Navigation Link */}
          <Link
            href="/millionaire-roadmap"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-500 transition-colors"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Roadmap</span>
            <span className="font-mono text-[9px] bg-purple-500/10 border border-purple-500/30 px-1.5 py-0.2 rounded text-purple-600 dark:text-purple-400 uppercase">
              SOON
            </span>
          </Link>

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
          <div className="flex flex-col gap-4 text-sm font-medium">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Layers className="h-4 w-4 text-primary" />
              <span>Features</span>
            </Link>

            <Link
              href="/millionaire-roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-500 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span>Millionaire Roadmap</span>
              </div>
              <span className="font-mono text-[10px] bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded text-purple-600 dark:text-purple-400 uppercase">
                SOON
              </span>
            </Link>

            <Link
              href="/tools/position-sizer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Wrench className="h-4 w-4 text-primary" />
              <span>Free Tools</span>
            </Link>

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