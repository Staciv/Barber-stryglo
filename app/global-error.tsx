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
      <body className="bg-background font-sans text-foreground antialiased">
        <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-8">
          <div className="w-full rounded-[32px] border border-white/10 bg-panel p-6 text-center shadow-card">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">STRIGLO</p>
            <h1 className="mt-3 text-2xl font-bold text-white">Критическая ошибка</h1>
            <p className="mt-2 text-sm text-muted">
              Приложение словило неожиданный сбой. Можно попробовать восстановить экран.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 min-h-14 w-full rounded-2xl bg-accent px-5 font-semibold text-white shadow-glow transition-all hover:bg-[#ff7c24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
            >
              Перезагрузить экран
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
