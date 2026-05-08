import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/lib/api/todos";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}