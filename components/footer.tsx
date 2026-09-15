import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      ["Features", "/#features"],
      ["Pricing", "/#pricing"],
      ["Playbook", "/playbook"],
    ],
  },
  {
    title: "Free Tools",
    links: [
      ["Lot Calculator", "/tools/position-sizer"],
      ["Prop Match", "/tools/prop-match"],
      ["Trade Assist", "/tools/ai-trade-planner"],
    ],
  },
  {
    title: "Legal & Meta",
    links: [
      ["Terms of Service", "/terms"],
      ["Privacy Policy", "/privacy"],
      ["Financial Disclaimer", "/disclaimer"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background px-4 py-12 text-foreground sm:px-8 relative z-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <Image
              src="/logo.png"
              alt="Propfident Logo"
              width={28}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <span className="font-mono text-sm font-semibold text-foreground">
              Propfident
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
            Risk management for funded traders.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-primary">
              {column.title}
            </h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {column.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border/40 pt-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <p>© {new Date().getFullYear()} Propfident Inc. Built for funded traders.</p>
        <p className="text-[11px] text-muted-foreground/80">
          Made with ❤️ by the Propfident team, Adjacent.
        </p>
      </div>
    </footer>
  );
}