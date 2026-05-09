import { api } from "./client";
import type { User } from "@/types";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function fetchUserById(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}