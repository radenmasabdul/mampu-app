"use client";

import ErrorDisplay from "@/components/common/ErrorDisplay";

export default function UsersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorDisplay error={error} reset={reset} />;
}
