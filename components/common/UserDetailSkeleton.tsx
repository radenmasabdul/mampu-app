"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function UserDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-28 rounded-md" />
      <Card className="p-6 space-y-6">
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-2/5" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>

        <div className="border-t" />

        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t" />

        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <Skeleton className="h-5 w-24" />

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-md space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </Card>

      <Card className="p-6 space-y-4">
        <Skeleton className="h-5 w-24" />

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 border rounded-md"
          >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </Card>
    </div>
  );
}
