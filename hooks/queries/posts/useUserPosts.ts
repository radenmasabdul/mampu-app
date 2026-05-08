import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "@/lib/api/posts";

export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
  });
}