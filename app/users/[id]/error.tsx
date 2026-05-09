"use client";

import ErrorDisplay from "@/components/common/ErrorDisplay";

export default function UserDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorDisplay
      error={error}
      reset={reset}
      backHref="/users"
      backLabel="Back to Users"
    />
  );
}
