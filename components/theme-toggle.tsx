"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (theme ?? resolvedTheme ?? "dark") as "light" | "dark";

  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/80" aria-hidden="true" />
    );
  }

  return (
    <AnimatedThemeToggler
      variant="circle"
      duration={500}
      fromCenter
      theme={currentTheme}
      onThemeChange={(next) => setTheme(next)}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/80 text-foreground transition-colors hover:bg-muted"
    />
  );
}