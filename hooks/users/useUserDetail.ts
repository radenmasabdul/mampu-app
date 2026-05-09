"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { User, Post, Todo } from "@/types";

interface Params {
  user: User;
  posts: Post[];
  todos: Todo[];
};

export function useUserDetail({
  user,
  posts,
  todos,
}: Params) {
  const searchParams = useSearchParams();
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showAllTodos, setShowAllTodos] = useState(false);
  const [todosFilter, setTodosFilter] = useState<"all" | "done" | "pending">("all");

  const backQuery = useMemo(() => {
    return searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";
  }, [searchParams]);

  const initials = useMemo(() => {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  }, [user.name]);

  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.completed);
  }, [todos]);

  const pendingTodos = useMemo(() => {
    return todos.filter((t) => !t.completed);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (todosFilter) {
      case "done":
        return completedTodos;

      case "pending":
        return pendingTodos;

      default:
        return todos;
    }
  }, [
    todos,
    todosFilter,
    completedTodos,
    pendingTodos,
  ]);

  const visiblePosts = useMemo(() => {
    return showAllPosts
      ? posts
      : posts.slice(0, 3);
  }, [posts, showAllPosts]);

  const visibleTodos = useMemo(() => {
    return showAllTodos
      ? filteredTodos
      : filteredTodos.slice(0, 5);
  }, [filteredTodos, showAllTodos]);

  const togglePosts = () => {
    setShowAllPosts((prev) => !prev);
  };

  const toggleTodos = () => {
    setShowAllTodos((prev) => !prev);
  };

  const changeTodosFilter = (
    filter: "all" | "done" | "pending",
  ) => {
    setTodosFilter(filter);
    setShowAllTodos(false);
  };

  return {
    initials,
    backQuery,
    showAllPosts,
    setShowAllPosts,
    showAllTodos,
    todosFilter,
    setTodosFilter,
    completedTodos,
    pendingTodos,
    visiblePosts,
    visibleTodos,
    filteredTodos,
    togglePosts,
    toggleTodos,
    changeTodosFilter,
  };
}