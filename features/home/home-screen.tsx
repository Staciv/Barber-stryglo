"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles, Zap, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/voice-button";
import { useBookingActions } from "@/hooks/use-booking-actions";

export function HomeScreen() {
  const { startBookingWithDay, startVoiceBooking } = useBookingActions();
  const [voiceResult, setVoiceResult] = useState<string | null>(null);

  const handleVoiceClick = () => {
    const summary = "Запиши меня завтра вечером";
    startVoiceBooking(summary);
    setVoiceResult("Понял: завтра, вечер, стрижка");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-hero-grid bg-hero-grid">
      {/* Ambient glow effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 pb-8 pt-6">
        {/* Hero Header Card */}
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel-elevated relative overflow-hidden rounded-[32px] p-6"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-accent-cyan/[0.02]" />

          <div className="relative">
            {/* Brand Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#e55a00] shadow-glow">
                  <Zap className="size-5 text-white" />
                </div>
                <p className="text-xl font-bold tracking-[0.2em] text-white">
                  STRIGLO
                </p>
              </div>
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                10 sec booking
              </span>
            </div>

            {/* Hero Content */}
            <div className="mt-10 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.08] px-3 py-1.5 text-xs font-medium text-accent-cyan"
              >
                <Sparkles className="size-3.5" />
                Street Tech Barbershop
              </motion.div>
              <h1 className="max-w-[280px] text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white">
                Когда тебе удобно?
              </h1>
              <p className="max-w-xs text-base text-muted">
                Запишись за 10 секунд. Без звонков, без ожидания.
              </p>
            </div>
          </div>
        </motion.header>

        {/* Quick Booking Actions */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-5 grid gap-3"
        >
          <Button
            className="group w-full justify-between"
            onClick={() => startBookingWithDay("today")}
          >
            <span className="flex items-center gap-3">
              <Clock className="size-4 text-white/70 transition-colors group-hover:text-white" />
              Сегодня
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            className="group w-full justify-between"
            onClick={() => startBookingWithDay("tomorrow")}
          >
            <span className="flex items-center gap-3">
              <Calendar className="size-4 text-white/70 transition-colors group-hover:text-white" />
              Завтра
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="secondary"
            className="group w-full justify-between"
            onClick={() => startBookingWithDay("custom")}
          >
            <span>Выбрать дату</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </motion.section>

        {/* Premium Recommendation Card */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-4"
        >
          <Link
            href="/recommendations"
            className="glass-panel-elevated group relative block overflow-hidden rounded-[28px] p-5 transition-all duration-300 hover:border-accent/20 hover:shadow-card-hover"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.04] to-accent-cyan/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-base font-semibold text-white transition-colors group-hover:text-accent">
                  Подобрать стрижку
                </p>
                <p className="text-sm text-muted">
                  Покажем стиль и сразу отправим в запись
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent shadow-[0_0_15px_rgba(255,107,0,0.15)]">
                  Premium
                </span>
                <ArrowRight className="size-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
            </div>
          </Link>
        </motion.section>

        {/* Voice Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <VoiceButton onClick={handleVoiceClick} active />
        </motion.div>

        {/* Bottom Info Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-auto space-y-4 pt-8"
        >
          {/* Voice Result Panel */}
          <div className="glass-panel rounded-[24px] p-4 text-sm text-white/70">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/10">
                <Sparkles className="size-3.5 text-accent-cyan" />
              </div>
              <p>
                {voiceResult ??
                  "Голосовая бронь распознает день, время и услугу с mocked logic."}
              </p>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: "Без звонков", icon: "off" },
              { label: "1 экран", icon: "screen" },
              { label: "Живые слоты", icon: "live" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="glass-panel group rounded-2xl px-3 py-4 transition-all duration-300 hover:border-white/10"
              >
                <span className="text-white/60 transition-colors group-hover:text-white/80">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
