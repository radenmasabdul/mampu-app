"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type {
  EnrichedUser,
  SortField,
  SortOrder,
  FilterType,
} from "@/types";
import ColumnData from "@/components/common/ColumnData";

interface Params {
  users: EnrichedUser[];
};

export function useUserTable({ users }: Params) {
  const pageSizeOptions = [5, 10, 20];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const processedData = useMemo(() => {
    let result = [...users];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      );
    };

    switch (filter) {
      case "hasPending":
        result = result.filter((u) => u.activity.pendingTodos > 0);
        break;
      case "noCompleted":
        result = result.filter((u) => u.activity.completedTodos === 0);
        break;
      case "mostPosts": {
        const max = Math.max(...users.map((u) => u.activity.totalPosts));
        result = result.filter(
          (u) => u.activity.totalPosts >= max * 0.7,
        );
        break;
      }
      default:
        break;
    };

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "totalPosts":
          aValue = a.activity.totalPosts;
          bValue = b.activity.totalPosts;
          break;
        case "pendingTodos":
          aValue = a.activity.pendingTodos;
          bValue = b.activity.pendingTodos;
          break;
        case "completedTodos":
          aValue = a.activity.completedTodos;
          bValue = b.activity.completedTodos;
          break;
      }

      const compare =
        typeof aValue === "string"
          ? aValue.localeCompare(bValue as string)
          : (aValue as number) - (bValue as number);

      return sortOrder === "asc" ? compare : -compare;
    });

    return result;
  }, [users, search, filter, sortField, sortOrder]);

  const stats = useMemo(() => {
    const totalPosts = users.reduce(
      (sum, u) => sum + u.activity.totalPosts,
      0,
    );

    const totalCompleted = users.reduce(
      (sum, u) => sum + u.activity.completedTodos,
      0,
    );

    const totalPending = users.reduce(
      (sum, u) => sum + u.activity.pendingTodos,
      0,
    );

    const totalUsers = processedData.length;

    return {
      totalPosts,
      totalCompleted,
      totalPending,
      totalUsers,
    };
  }, [users, processedData]);

  const table = useReactTable({
    data: processedData,
    columns: ColumnData(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = processedData.length;
  const pageCount = table.getPageCount();

  const rowStart = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const rowEnd = Math.min((pageIndex + 1) * pageSize, totalRows);

  const pageNumbers = useMemo(() => {
    if (pageCount <= 5)
      return Array.from({ length: pageCount }, (_, i) => i);
    if (pageIndex <= 2) return [0, 1, 2, 3, 4];
    if (pageIndex >= pageCount - 3)
      return [
        pageCount - 5,
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
      ];
    return [
      pageIndex - 2,
      pageIndex - 1,
      pageIndex,
      pageIndex + 1,
      pageIndex + 2,
    ];
  }, [pageIndex, pageCount]);

  return {
    search,
    setSearch,
    filter,
    setFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    processedData,
    stats,
    table,
    pageIndex,
    pageSize,
    totalRows,
    pageCount,
    rowStart,
    rowEnd,
    pageNumbers,
    pageSizeOptions,
  };
}