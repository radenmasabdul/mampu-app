"use client";

import Link from "next/link";
import type { User, Post, Todo } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveLeft, CircleCheckBig, Clock3 } from "lucide-react";
import { useUserDetail } from "@/hooks/users/useUserDetail";
import ButtonApp from "./Button";

interface Props {
  user: User;
  posts: Post[];
  todos: Todo[];
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <span className="wrap-break-words text-sm text-foreground">{value}</span>
    </div>
  );
}

export default function UserDetailCard({ user, posts, todos }: Props) {
  const {
    initials,
    backQuery,
    showAllPosts,
    showAllTodos,
    todosFilter,
    completedTodos,
    pendingTodos,
    visiblePosts,
    visibleTodos,
    filteredTodos,
    togglePosts,
    toggleTodos,
    changeTodosFilter,
  } = useUserDetail({
    user,
    posts,
    todos,
  });

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <ButtonApp className="bg-blue-700 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500">
        <Link href={`/users${backQuery}`} className="flex items-center gap-2">
          <MoveLeft className="size-4" />
          <span>Back</span>
        </Link>
      </ButtonApp>

      <Card className="space-y-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 text-xl font-bold text-white">
              {initials}
            </div>

            <div>
              <h1 className="text-xl font-semibold md:text-2xl">{user.name}</h1>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{posts.length} posts</Badge>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              {completedTodos.length} done
            </Badge>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
              {pendingTodos.length} pending
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Phone" value={user.phone} />
          <InfoRow label="Website" value={user.website} />
          <InfoRow label="Username" value={`@${user.username}`} />
        </div>

        <div className="border-t" />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-black uppercase tracking-widest">
            Company
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoRow label="Name" value={user.company.name} />
            <InfoRow label="Catchphrase" value={user.company.catchPhrase} />
            <InfoRow label="Business" value={user.company.bs} />
          </div>
        </div>

        <div className="border-t" />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-black uppercase tracking-widest">
            Address
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoRow label="Street" value={user.address.street} />
            <InfoRow label="Suite" value={user.address.suite} />
            <InfoRow label="City" value={user.address.city} />
            <InfoRow label="Zipcode" value={user.address.zipcode} />
          </div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Posts</h2>

          <span className="text-sm text-muted-foreground">
            {posts.length} total
          </span>
        </div>

        <div className="space-y-3">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="rounded-md border bg-blue-100 p-4 dark:bg-blue-950/30"
            >
              <h3 className="line-clamp-2 text-sm font-semibold">
                {post.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-sm">{post.body}</p>
            </div>
          ))}

          {posts.length > 3 && (
            <Button
              variant="outline"
              onClick={togglePosts}
              className="cursor-pointer"
            >
              {showAllPosts
                ? "Show less"
                : `Show ${posts.length - 3} more posts`}
            </Button>
          )}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Todos</h2>

          <div className="flex flex-wrap gap-2">
            {(["all", "pending", "done"] as const).map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={todosFilter === filter ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => changeTodosFilter(filter)}
              >
                {filter === "all"
                  ? `All (${todos.length})`
                  : filter === "done"
                    ? `Done (${completedTodos.length})`
                    : `Pending (${pendingTodos.length})`}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {visibleTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 rounded-md border p-3 ${
                todo.completed ? "bg-green-50 dark:bg-green-950" : "bg-muted/20"
              }`}
            >
              {todo.completed ? (
                <CircleCheckBig className="size-4 shrink-0 text-green-600" />
              ) : (
                <Clock3 className="size-4 shrink-0 text-amber-500" />
              )}

              <span
                className={`text-sm ${
                  todo.completed
                    ? "text-green-700 line-through"
                    : "text-foreground"
                }`}
              >
                {todo.title}
              </span>
            </div>
          ))}

          {filteredTodos.length > 5 && (
            <Button
              variant="outline"
              onClick={toggleTodos}
              className="cursor-pointer"
            >
              {showAllTodos
                ? "Show less"
                : `Show ${filteredTodos.length - 5} more todos`}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
