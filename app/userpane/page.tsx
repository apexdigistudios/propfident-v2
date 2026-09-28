import { Suspense } from "react";
import UserpaneClient from "./userpane-client";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default function UserpanePage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <UserpaneClient />
    </Suspense>
  );
}

function OverviewSkeleton() {
  return (
    <div className="p-2 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6">
      <Skeleton className="w-full h-32 md:h-48 rounded-2xl md:rounded-3xl" />
      <div className="space-y-2 md:space-y-3">
        <Skeleton className="h-3 w-20 md:h-4 md:w-28 rounded-md" />
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <Skeleton className="h-28 md:h-48 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-28 md:h-48 rounded-2xl md:rounded-3xl" />
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        <Skeleton className="h-3 w-20 md:h-4 md:w-24 rounded-md" />
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <Skeleton className="h-24 md:h-32 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-24 md:h-32 rounded-2xl md:rounded-3xl" />
          <Skeleton className="h-24 md:h-32 rounded-2xl md:rounded-3xl" />
        </div>
      </div>
    </div>
  );
}