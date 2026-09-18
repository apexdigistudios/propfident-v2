export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card shadow-sm">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-72 rounded-lg bg-muted/60" />
        </div>
        <div className="h-9 w-36 rounded-lg bg-muted" />
      </div>

      {/* Primary Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-muted/60" />
              <div className="h-4 w-4 rounded bg-muted" />
            </div>
            <div className="h-8 w-32 rounded-lg bg-muted" />
            <div className="h-3 w-20 rounded bg-muted/60" />
          </div>
        ))}
      </div>

      {/* Main Feature Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 rounded bg-muted" />
              <div className="h-5 w-24 rounded bg-muted/60" />
            </div>
            <div className="h-12 w-full rounded-lg bg-muted/40" />
            <div className="h-9 w-full rounded-lg bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}