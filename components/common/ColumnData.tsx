"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { EnrichedUser } from "@/types";
import type { CellContext } from "@tanstack/react-table";

export default function ColumnData() {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }: CellContext<EnrichedUser, string>) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
            {getValue()
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <span className="font-medium text-foreground">{getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }: CellContext<EnrichedUser, string>) => (
        <span className="text-muted-foreground text-sm">{getValue()}</span>
      ),
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ getValue }: CellContext<EnrichedUser, string>) => (
        <a
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          href={`https://${getValue()}`}
          target="_blank"
          rel="noreferrer"
        >
          {getValue()}
        </a>
      ),
    },
    {
      accessorKey: "activity.totalPosts",
      header: "Posts",
      cell: ({ getValue }: CellContext<EnrichedUser, number>) => (
        <Badge variant="secondary" className="font-mono">
          {getValue()}
        </Badge>
      ),
    },
    {
      accessorKey: "activity.completedTodos",
      header: "Completed",
      cell: ({ getValue }: CellContext<EnrichedUser, number>) => (
        <Badge className="bg-emerald-100 text-emerald-700 border-0">
          ✓ {getValue()}
        </Badge>
      ),
    },
    {
      accessorKey: "activity.pendingTodos",
      header: "Pending",
      cell: ({ getValue }: CellContext<EnrichedUser, number>) => {
        const val = getValue();
        return (
          <Badge
            className={
              val > 0
                ? "bg-amber-100 text-amber-700 border-0"
                : "bg-muted text-muted-foreground border-0"
            }
          >
            {val > 0 ? (
              <>
                <Clock className="w-3.5 h-3.5" />
                <span>{val}</span>
              </>
            ) : (
              <>— {val}</>
            )}
          </Badge>
        );
      },
    },
  ];
}
