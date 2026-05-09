"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpAZ, ArrowDownAZ } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
};

interface TableFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  filterOptions: SelectOption[];
  onFilterChange: (value: string) => void;
  sortValue: string;
  sortOptions: SelectOption[];
  onSortChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
};

export default function Filter({
  search,
  onSearchChange,
  filterValue,
  filterOptions,
  onFilterChange,
  sortValue,
  sortOptions,
  onSortChange,
  sortOrder,
  onSortOrderChange
}: TableFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative w-full sm:flex-1 sm:min-w-50">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search…"
          className="pl-9 h-9 bg-background w-full"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Select value={filterValue} onValueChange={onFilterChange}>
          <SelectTrigger className="h-9 w-full sm:w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5">
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={() =>
              onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
            }
            aria-label={
              sortOrder === "asc" ? "Sort descending" : "Sort ascending"
            }
          >
            {sortOrder === "asc" ? (
              <ArrowUpAZ className="size-4" />
            ) : (
              <ArrowDownAZ className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
