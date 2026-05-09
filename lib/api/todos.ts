import { api } from "./client";
import type { Todo } from "@/types";

export async function fetchTodos(): Promise<Todo[]> {
  const { data } = await api.get<Todo[]>("/todos");
  return data;
}

export async function fetchUserTodos(userId: number): Promise<Todo[]> {
  const { data } = await api.get<Todo[]>("/todos", {
    params: { userId },
  });

  return data;
}