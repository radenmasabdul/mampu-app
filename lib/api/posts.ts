import { api } from "./client";
import type { Post } from "@/types";

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts");
  return data;
}

export async function fetchUserPosts(userId: number): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts", {
    params: { userId },
  });

  return data;
}