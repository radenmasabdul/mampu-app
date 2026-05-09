import { Suspense } from "react"
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchUserById } from "@/lib/api/users";
import { fetchUserPosts } from "@/lib/api/posts";
import { fetchUserTodos } from "@/lib/api/todos";
import UserDetailCard from "@/components/common/UserDetailCard";
import UserDetailSkeleton from "@/components/common/UserDetailSkeleton";

interface Props {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const userId = Number(id);
  if (isNaN(userId) || userId < 1 || userId > 10) {
    return { title: "User Not Found" };
  }
  try {
    const user = await fetchUserById(userId);
    return {
      title: user.name,
      description: `${user.name} — ${user.company.name}. ${user.company.catchPhrase}`,
    };
  } catch {
    return { title: "User Not Found" };
  }
};

async function UserData({ id }: { id: string }) {
  const userId = Number(id);

  if (isNaN(userId) || userId < 1 || userId > 10) {
    notFound();
  }

  const [user, posts, todos] = await Promise.all([
    fetchUserById(userId),
    fetchUserPosts(userId),
    fetchUserTodos(userId),
  ]);

  return <UserDetailCard user={user} posts={posts} todos={todos} />;
}

export default async function userDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      <Suspense fallback={<UserDetailSkeleton />}>
        <UserData id={id} />
      </Suspense>
    </main>
  );
}
