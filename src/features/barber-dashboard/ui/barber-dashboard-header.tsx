"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";

type BarberDashboardHeaderProps = {
  todayCount: number;
  goRequestCount: number;
};

export function BarberDashboardHeader({
  todayCount,
  goRequestCount,
}: BarberDashboardHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            STRIGLO barber
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">
            Рабочий день
          </h1>
        </div>
        <Badge variant="accent">MVP</Badge>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Записи, выездные заявки и расписание без CRM-шума.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-2xl font-black text-foreground">{todayCount}</p>
          <p className="mt-1 text-xs text-muted">сегодня</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-2xl font-black text-foreground">{goRequestCount}</p>
          <p className="mt-1 text-xs text-muted">GO заявок</p>
        </div>
      </div>

      <Link
        href="/"
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white shadow-inset transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Домой
      </Link>
    </motion.header>
  );
}
