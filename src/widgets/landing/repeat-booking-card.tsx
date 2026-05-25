"use client";

import { motion } from "framer-motion";
import { RotateCcw, User, Scissors } from "lucide-react";

export function RepeatBookingCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6"
    >
      {/* Section label */}
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/70">
        Для постоянных клиентов
      </p>
      
      <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/8 text-accent/80">
            <RotateCcw className="size-4" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              Повторить прошлую запись
            </p>
            <p className="mt-1 text-sm text-muted">
              Если уже был у мастера — запишись снова в пару касаний.
            </p>
          </div>
        </div>

        {/* Mock previous appointment */}
        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-surface text-muted">
              <Scissors className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Мужская стрижка</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <User className="size-3" />
                  Амир
                </span>
                <span className="text-white/20">·</span>
                <span>12 мая · 11:00</span>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            className="shrink-0 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:border-accent/40 active:scale-[0.98]"
          >
            Повторить
          </button>
        </div>
      </div>
    </motion.section>
  );
}
