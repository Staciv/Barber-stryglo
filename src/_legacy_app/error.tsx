"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="w-full rounded-[32px] border border-white/10 bg-panel p-6 text-center shadow-card">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">STRIGLO</p>
        <h1 className="mt-3 text-2xl font-bold text-white">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-muted">
          Экран можно безопасно перезагрузить и продолжить запись.
        </p>
        <div className="mt-6 grid gap-3">
          <Button onClick={reset} className="w-full">
            Попробовать снова
          </Button>
        </div>
      </div>
    </main>
  );
}
