"use client";

import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { EnrichedUser, SortField, FilterType } from "@/types";
import { FileText, CircleCheck, Clock } from "lucide-react";
import StatsCard from "./StatsCard";
import Filter from "./Filter";
import { useUserTable } from "@/hooks/users/useUserTable";

interface Props {
  users: EnrichedUser[];
}

export default function DataTable({ users }: Props) {
  const {
    search,
    setSearch,
    filter,
    setFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    processedData,
    table,
    pageIndex,
    pageSize,
    totalRows,
    pageCount,
    rowStart,
    rowEnd,
    pageNumbers,
    pageSizeOptions,
  } = useUserTable({ users });

  return (
    <main className="space-y-6">
      <StatsCard
        stats={[
          {
            label: "Total Posts",
            value: processedData.reduce(
              (sum, u) => sum + u.activity.totalPosts,
              0,
            ),
            description: "Posts published across all users",
            icon: <FileText className="size-4" />,
            iconClassName:
              "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
          },
          {
            label: "Completed Todos",
            value: processedData.reduce(
              (sum, u) => sum + u.activity.completedTodos,
              0,
            ),
            description: "Tasks successfully finished",
            valueClassName: "text-emerald-600",
            icon: <CircleCheck className="size-4" />,
            iconClassName:
              "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
          },
          {
            label: "Pending Todos",
            value: processedData.reduce(
              (sum, u) => sum + u.activity.pendingTodos,
              0,
            ),
            description: "Tasks still waiting to be done",
            valueClassName: "text-amber-600",
            icon: <Clock className="size-4" />,
            iconClassName:
              "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
          },
        ]}
      />

      <Filter
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          table.setPageIndex(0);
        }}
        filterValue={filter}
        filterOptions={[
          { label: "All Users", value: "all" },
          { label: "Has Pending", value: "hasPending" },
          { label: "No Completed", value: "noCompleted" },
          { label: "Most Posts", value: "mostPosts" },
        ]}
        onFilterChange={(v) => {
          setFilter(v as FilterType);
          table.setPageIndex(0);
        }}
        sortValue={sortField}
        sortOptions={[
          { label: "Name", value: "name" },
          { label: "Posts", value: "totalPosts" },
          { label: "Pending", value: "pendingTodos" },
          { label: "Completed", value: "completedTodos" },
        ]}
        onSortChange={(v) => {
          setSortField(v as SortField);
          table.setPageIndex(0);
        }}
        sortOrder={sortOrder}
        onSortOrderChange={(v) => {
          setSortOrder(v);
          table.setPageIndex(0);
        }}
      />

      <Card className="overflow-hidden py-0">
        <Table>
          <TableHeader className="bg-sky-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/40 hover:bg-muted/40 border-b border-border/60"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-semibold uppercase tracking-wider text-black h-10 px-4"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={`
                    border-b border-border/40 transition-colors hover:bg-muted/30
                    ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <svg
                      className="size-8 opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-sm font-medium">No users found</p>
                    <p className="text-xs">
                      Try adjusting your search or filter
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {totalRows > 0 && (
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 border-t border-border/60 px-4 py-3 bg-muted/20">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Rows per page
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  table.setPageSize(Number(v));
                  table.setPageIndex(0);
                }}
              >
                <SelectTrigger className="h-7 w-16 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((s) => (
                    <SelectItem key={s} value={String(s)} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-4" />

              <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                {rowStart}-{rowEnd} of {totalRows} Users
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="First page"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7M18 19l-7-7 7-7"
                  />
                </svg>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>

              {pageNumbers.map((p) => (
                <Button
                  key={p}
                  variant={p === pageIndex ? "default" : "outline"}
                  size="icon"
                  className={`size-7 text-xs tabular-nums ${
                    p === pageIndex
                      ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white"
                      : ""
                  }`}
                  onClick={() => table.setPageIndex(p)}
                  aria-label={`Page ${p + 1}`}
                  aria-current={p === pageIndex ? "page" : undefined}
                >
                  {p + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Last page"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M6 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
