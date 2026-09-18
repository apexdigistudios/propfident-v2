import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { MobileNav } from "@/components/mobile-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col bg-background pb-16 md:pb-0">
        {/* Dashboard Top Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="hidden md:flex" />
            <Separator orientation="vertical" className="h-4 hidden md:block" />
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
              Propfident Terminal
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>

        {/* Mobile iOS Bottom Navigation */}
        <MobileNav />
      </main>
    </SidebarProvider>
  )
}