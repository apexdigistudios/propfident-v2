"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FounderModal } from "@/components/founder-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openOnHover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAccessOpen(true);
  };

  const closeAfterHover = () => {
    closeTimer.current = setTimeout(() => setAccessOpen(false), 120);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-border/40 transition-all duration-300 ${scrolled ? "bg-background/70 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl" : "bg-background/85 backdrop-blur-md"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <Image src="/logo.png" alt="Propfident" width={28} height={28} className="h-7 w-auto object-contain" priority />
          <span className="text-foreground">Propfident</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">v2</span>
        </Link>

        <nav className="hidden items-center gap-4 text-xs font-medium text-muted-foreground md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 hover:text-foreground focus:outline-none">Features <ChevronDown className="h-3.5 w-3.5" /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Risk & Planning</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild><Link href="/tools/position-sizer">Position Sizer</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/tools/ai-trade-planner">AI Trade Planner</Link></DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Firm Matching</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild><Link href="/tools/prop-match">Prop Match Auditor</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="#features">Challenge Readiness</Link></DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 hover:text-foreground focus:outline-none">Free Tools <ChevronDown className="h-3.5 w-3.5" /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild><Link href="/tools/position-sizer">Position Sizer</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/tools/prop-match">Prop Match Auditor</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/tools/ai-trade-planner">AI Trade Planner</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/#pricing" className="rounded-md px-2 py-1.5 hover:text-foreground">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div onMouseEnter={openOnHover} onMouseLeave={closeAfterHover}>
            <DropdownMenu open={accessOpen} onOpenChange={setAccessOpen}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]">Get Access <ChevronDown className="h-3.5 w-3.5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72" onPointerEnter={openOnHover} onPointerLeave={closeAfterHover}>
                <DropdownMenuItem asChild>
                  <FounderModal>
                    <button type="button" className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-surface-hover">Founder&apos;s Lifetime ($299) <ChevronRight className="h-4 w-4 text-primary" /></button>
                  </FounderModal>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/tools/position-sizer">Position Sizer Utility</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/tools/prop-match">Prop Match Auditor</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/tools/ai-trade-planner">AI Trade Planner</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}