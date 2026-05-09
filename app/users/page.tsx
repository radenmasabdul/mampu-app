import { Suspense } from "react";
import type { Metadata } from "next";
import type { EnrichedUser } from "@/types";
import { fetchUsers } from "@/lib/api/users";
import { fetchPosts } from "@/lib/api/posts";
import { fetchTodos } from "@/lib/api/todos";
import DataTable from "@/components/common/DataTable";
import DataTableSkeleton from "@/components/common/DataTableSkeleton";
import BreadcrumbApp from "@/components/common/Breadcrumb";
import PageHeader from "@/components/common/PageHeader";

export const metadata: Metadata = {
  title: "Users",
  description: "Browse all users with activity signals",
};

async function UsersData() {
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

  return <DataTable users={enriched} />;
};

export default function UsersPage() {
  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbApp
        className="mb-6"
        items={[{ label: "Home", href: "/" }, { label: "Users" }]}
      />

      <PageHeader
        title="User Operations"
        description="Manage and monitor user activity signals across posts & todos"
      />

      <Suspense fallback={<DataTableSkeleton />}>
        <UsersData />
      </Suspense>
    </main>
  );
}
