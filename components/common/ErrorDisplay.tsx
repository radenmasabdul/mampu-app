"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: Error & { digest?: string };
  reset: () => void;
  backHref?: string;
  backLabel?: string;
}

function getFriendlyMessage(error: Error): string {
  const msg = error.message.toLowerCase();

  if (
    msg.includes("enotfound") ||
    msg.includes("network") ||
    msg.includes("fetch")
  )
    return "Tidak dapat terhubung ke server. Periksa koneksi internetmu.";

  if (msg.includes("timeout"))
    return "Server terlalu lama merespons. Coba lagi beberapa saat.";

  if (msg.includes("404")) return "Data yang diminta tidak ditemukan.";

  if (msg.includes("500") || msg.includes("internal"))
    return "Server sedang bermasalah. Coba lagi nanti.";

  return "Terjadi kesalahan yang tidak terduga. Coba lagi.";
}

export default function ErrorDisplay({
  error,
  reset,
  backHref,
  backLabel = "Kembali",
}: ErrorDisplayProps) {
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
          {getFriendlyMessage(error)}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          {backHref && (
            <Button asChild variant="outline" size="lg">
              <Link href={backHref}>{backLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
