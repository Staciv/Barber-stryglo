"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { BottomSheet } from "@/shared/ui/bottom-sheet";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { SectionTitle } from "@/shared/ui/section-title";
import { Skeleton } from "@/shared/ui/skeleton";
import { StickyBottomAction } from "@/widgets/bottom-action/sticky-bottom-action";

const previewBadges = [
  { label: "Primary", variant: "accent" as const },
  { label: "Success", variant: "success" as const },
  { label: "Warning", variant: "warning" as const },
  { label: "Danger", variant: "danger" as const },
];

export default function HomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-safe-offset-6">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-inset">
          <div className="min-w-0">
            <p className="text-xs text-muted">Аккаунт</p>
            <p className="truncate text-sm font-semibold text-foreground">
              {isAuthenticated && user ? user.phone : "Гость"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/activity"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white shadow-inset transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Активность
            </Link>
            {isAuthenticated ? (
              <Button variant="secondary" size="sm" onClick={logout}>
                Выйти
              </Button>
            ) : (
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-accent/20 bg-accent px-4 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:bg-[#ff8a36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Войти
              </Link>
            )}
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-border/70 surface-panel p-5 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-accent">STRIGLO design system</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground">
                Premium barber-tech UI foundation
              </h1>
            </div>
            <Badge variant="accent">Mobile first</Badge>
          </div>

          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
            Reusable primitives, dark premium tokens and app-like surfaces prepared for the next
            product tasks.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button size="lg">Primary CTA</Button>
            <Button variant="secondary" size="lg">
              Secondary
            </Button>
            <Button variant="ghost" size="md">
              Ghost
            </Button>
            <Button loading size="md">
              Loading
            </Button>
          </div>
        </motion.section>

        <section className="mt-5 space-y-5">
          <Card variant="elevated">
            <SectionTitle
              title="Tokens and badges"
              subtitle="Burnt orange drives primary actions, cyan supports secondary highlights."
              action={<Badge>Preview</Badge>}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {previewBadges.map((badge) => (
                <Badge key={badge.label} variant={badge.variant}>
                  {badge.label}
                </Badge>
              ))}
            </div>
          </Card>

          <Card interactive>
            <SectionTitle
              title="Surface card"
              subtitle="Reusable layered panel with generous radius, soft border and premium depth."
            />
            <div className="mt-5 flex items-center gap-4">
              <Avatar fallback="ST" size="lg" />
              <div className="space-y-2">
                <p className="text-base font-semibold text-foreground">Barber profile primitive</p>
                <p className="text-sm leading-6 text-muted">
                  Generic avatar, copy hierarchy and badge composition for future screens.
                </p>
              </div>
            </div>
          </Card>

          <Card padding="sm">
            <SectionTitle
              title="Loading state"
              subtitle="Dark-mode skeleton primitives ready for async slots, services and profile content."
            />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-20 w-full rounded-3xl" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </Card>
        </section>

        <div className="mt-5 pb-safe-offset-4">
          <Button variant="secondary" className="w-full" onClick={() => setSheetOpen(true)}>
            Open BottomSheet demo
          </Button>
        </div>

        <StickyBottomAction
          summary="Reusable sticky bottom CTA widget for future booking confirmation and client actions."
          buttonLabel="Sticky bottom action"
          onAction={() => setSheetOpen(true)}
        />
      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="BottomSheet">
        <div className="space-y-4 pb-2">
          <p className="text-sm leading-6 text-muted">
            This is a generic mobile-first bottom sheet with overlay, rounded top corners and
            motion-based transitions.
          </p>
          <Card padding="sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Reusable overlay primitive</p>
                <p className="mt-1 text-sm text-muted">No booking-specific logic attached.</p>
              </div>
              <Badge variant="accent">Framer Motion</Badge>
            </div>
          </Card>
        </div>
      </BottomSheet>
    </main>
  );
}
