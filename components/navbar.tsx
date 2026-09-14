import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 border border-primary/20 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-foreground">PROPFiDENT</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
            v2
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-mono">
          <Link href="#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#tools" className="hover:text-foreground transition-colors">
            Free Tools
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Lifetime Access
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="default" className="font-mono text-xs">
            Claim Access
          </Button>
        </div>
      </div>
    </header>
  );
}