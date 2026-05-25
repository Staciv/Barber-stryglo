"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/motion";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <FadeIn as="header" className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          STRIGLO
        </p>
        <p className="mt-1 text-sm text-muted">
          {isAuthenticated && user ? user.phone : "Гость"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
          href="/activity"
        >
          Мои записи
        </Link>
        {isAuthenticated ? (
          <Button size="sm" variant="secondary" onClick={logout}>
            Выйти
          </Button>
        ) : (
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Войти
          </Link>
        )}
      </div>
    </FadeIn>
  );
}
