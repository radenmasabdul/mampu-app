"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DataTableSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border border-border/60 shadow-none">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="h-3 w-24" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-border/60 shadow-none">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Skeleton className="h-9 w-full sm:flex-1" />

            <div className="flex gap-2">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-9 w-36" />
              <Skeleton className="h-9 w-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden py-0 border border-border/60 shadow-none">
        <div className="flex items-center bg-muted/40 border-b border-border/60 px-4 h-10 gap-4">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-4 py-3 border-b border-border/40 ${
              i % 2 === 0 ? "bg-background" : "bg-muted/10"
            }`}
          >
            <div className="flex-1 flex items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex-1">
              <Skeleton className="h-3.5 w-40" />
            </div>

            <div className="flex-1">
              <Skeleton className="h-3.5 w-28" />
            </div>

            <div className="flex-1">
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>

            <div className="flex-1">
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>

            <div className="flex-1">
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 px-4 py-3 bg-muted/20">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-7 w-16 rounded-md" />
            <Separator orientation="vertical" className="h-4" />
            <Skeleton className="h-3.5 w-28" />
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="size-7 rounded-md" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
