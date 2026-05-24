"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-8">
      <div className="w-full rounded-[2rem] border border-border/70 bg-surface p-6 text-center shadow-card">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">STRIGLO</p>
        <h1 className="mt-3 text-2xl font-bold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted">
          The foundation shell hit an unexpected error. You can safely retry.
        </p>
        <Button onClick={reset} className="mt-6 w-full">
          Retry
        </Button>
      </div>
    </main>
  );
}
