"use client";

import Link from "next/link";
import { BookOpen, ShieldCheck, ChevronDown, Calculator, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          PROPFIDENT
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {/* Direct Link */}
            <NavigationMenuItem>
              <Link href="/" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Nested Menu Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/playbook"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <BookOpen className="h-4 w-4" /> VIP Playbook
                        </div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                          Institutional rulesets, execution guides, & Whop checkout.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/evaluator"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calculator className="h-4 w-4" /> Prop Matcher
                        </div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                          Compare drawdown models & rules for evaluation firms.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}