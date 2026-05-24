"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="ru">
      <body className="bg-background text-foreground antialiased">
        <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-8">
          <div className="w-full rounded-[2rem] border border-border/70 bg-surface p-6 text-center shadow-card">
            <p className="text-xs uppercase tracking-[0.32em] text-accent">STRIGLO</p>
            <h1 className="mt-3 text-2xl font-bold text-foreground">Critical application error</h1>
            <p className="mt-2 text-sm text-muted">
              The app shell failed before rendering. Retry to recover the screen.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 min-h-14 w-full rounded-2xl bg-accent px-5 font-semibold text-white shadow-glow transition-all hover:bg-[#ff8a36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              Retry
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
