"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { GoRideButton } from "@/features/go-request/ui/go-ride-button";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { FadeIn, MotionCard } from "@/shared/ui/motion";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <FadeIn as="header" className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">STRIGLO</p>
            <p className="mt-1 text-sm text-muted">{isAuthenticated && user ? user.phone : "Гость"}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link className="text-sm font-semibold text-white/80" href="/activity">
              Активность
            </Link>
            {isAuthenticated ? (
              <Button size="sm" variant="secondary" onClick={logout}>
                Выйти
              </Button>
            ) : (
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white"
              >
                Войти
              </Link>
            )}
          </div>
        </FadeIn>

        <FadeIn
          as="section"
          delay={0.04}
          className="mt-6 rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card"
        >
          <Badge variant="accent">Mobile-first booking</Badge>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground">
            Запись к барберу за пару касаний
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            STRIGLO показывает ближайшие свободные слоты, подбирает мастера и ведёт к записи без лишних форм.
          </p>
          <div className="mt-6 grid gap-3">
            <Link
              href="/booking"
              className="inline-flex min-h-16 items-center justify-center rounded-[1.4rem] border border-accent/20 bg-accent px-6 text-base font-semibold text-white shadow-glow transition-transform duration-200 active:scale-[0.98]"
            >
              Записаться
            </Link>
            <GoRideButton />
          </div>
        </FadeIn>

        <section className="mt-5 grid gap-3">
          <MotionCard padding="sm" delay={0.08}>
            <p className="text-sm font-semibold text-foreground">Ближайшие слоты</p>
            <p className="mt-1 text-sm text-muted">Сразу показываем доступное время, без календарного шума.</p>
          </MotionCard>
          <MotionCard padding="sm" delay={0.12}>
            <p className="text-sm font-semibold text-foreground">BYN цены</p>
            <p className="mt-1 text-sm text-muted">MVP ориентирован на русскоговорящих клиентов и белорусский рынок.</p>
          </MotionCard>
          <MotionCard padding="sm" delay={0.16}>
            <p className="text-sm font-semibold text-foreground">Повтор записи</p>
            <p className="mt-1 text-sm text-muted">История визитов помогает быстро записаться снова.</p>
          </MotionCard>
        </section>

      </div>
    </main>
  );
}
