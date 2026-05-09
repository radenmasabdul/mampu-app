import { useQuery } from "@tanstack/react-query";
import { fetchUserTodos } from "@/lib/api/todos";

export function useUserTodos(userId: number) {
  return useQuery({
    queryKey: ["todos", userId],
    queryFn: () => fetchUserTodos(userId),
    enabled: !!userId,
  });
}