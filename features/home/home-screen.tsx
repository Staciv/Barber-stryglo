"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
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
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-8 pt-5">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[30px] border border-white/10 bg-black/25 p-5 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <p className="text-xl font-extrabold tracking-[0.3em] text-white">STRIGLO</p>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">10 sec booking</span>
          </div>
          <div className="mt-10 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent">
              <Sparkles className="size-3.5" />
              Street + Minimal + Tech
            </div>
            <h1 className="max-w-xs text-4xl font-extrabold leading-tight text-white">Когда тебе удобно?</h1>
            <p className="max-w-xs text-base text-muted">Запишись за 10 секунд</p>
          </div>
        </motion.header>

        <section className="mt-5 grid gap-3">
          <Button className="w-full justify-between" onClick={() => startBookingWithDay("today")}>
            Сегодня
            <ArrowRight className="size-4" />
          </Button>
          <Button className="w-full justify-between" onClick={() => startBookingWithDay("tomorrow")}>
            Завтра
            <ArrowRight className="size-4" />
          </Button>
          <Button variant="secondary" className="w-full justify-between" onClick={() => startBookingWithDay("custom")}>
            Выбрать дату
            <ArrowRight className="size-4" />
          </Button>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-card">
          <Link href="/recommendations" className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-white">Подобрать стрижку</p>
              <p className="text-sm text-muted">Покажем стиль и сразу отправим в запись.</p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">Premium</span>
          </Link>
        </section>

        <div className="mt-7 flex justify-center">
          <VoiceButton onClick={handleVoiceClick} active />
        </div>

        <section className="mt-auto space-y-3 pt-8">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            {voiceResult ?? "Голосовая бронь распознает день, время и услугу с mocked logic."}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-white/60">
            <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-4">Без звонков</div>
            <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-4">1 экран</div>
            <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-4">Живые слоты</div>
          </div>
        </section>
      </div>
    </main>
  );
}
