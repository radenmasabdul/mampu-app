"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="flex size-20 items-center justify-center rounded-full border bg-muted">
          <TriangleAlert className="size-10 text-destructive" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {error.message || "Failed to load user data."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/users">Back to Users</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
