import { NextResponse } from "next/server";
import { fetchPosts, fetchTodos, fetchUsers } from "@/lib/api";
import type { EnrichedUser } from "@/types";

export const revalidate = 60;

export async function GET() {
  try {
    const [users, posts, todos] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchTodos(),
    ]);

    const enriched: EnrichedUser[] = users.map((user) => {
      const userPosts = posts.filter((p) => p.userId === user.id);
      const userTodos = todos.filter((t) => t.userId === user.id);
      return {
        ...user,
        activity: {
          userId: user.id,
          totalPosts: userPosts.length,
          completedTodos: userTodos.filter((t) => t.completed).length,
          pendingTodos: userTodos.filter((t) => !t.completed).length,
        },
      };
    });

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("API /users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
