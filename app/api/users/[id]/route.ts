import { NextResponse } from "next/server";
import { fetchUserPosts, fetchUserById, fetchUserTodos } from "@/lib/api";

export const revalidate = 60;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId < 1 || userId > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const [user, posts, todos] = await Promise.all([
      fetchUserById(userId),
      fetchUserPosts(userId),
      fetchUserTodos(userId),
    ]);

    return NextResponse.json({ user, posts, todos });
  } catch (error) {
    console.error(`API /users/${userId} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
