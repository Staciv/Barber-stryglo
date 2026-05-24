"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BottomActionBar } from "@/components/bottom-action-bar";
import { HaircutCard } from "@/components/haircut-card";
import { haircutStyles } from "@/data/mock";
import { useBookingStore } from "@/store/booking-store";

export function HaircutRecommendationFlow() {
  const router = useRouter();
  const { setRecommendedStyle } = useBookingStore();
  const [selectedStyle, setSelectedStyle] = useState(haircutStyles[0].id);

  const handleContinue = () => {
    setRecommendedStyle(selectedStyle);
    router.push("/booking");
  };

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-6 pt-5">
      <div className="space-y-5">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-panel p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">AI style picker</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white">Подобрать стрижку</h1>
          <p className="mt-2 text-sm text-muted">
            Фото можно подключить позже. Сейчас покажем премиальные рекомендации на mocked data.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-white">Selfie input</p>
                <p className="text-sm text-muted">Загрузить фото или сделать селфи</p>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">mocked</div>
            </div>
            <div className="mt-5 h-44 rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.35),transparent_36%),linear-gradient(180deg,#222,#111)]" />
          </motion.div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Рекомендации</h2>
            <span className="text-sm text-muted">Свайпни и выбери</span>
          </div>
          <div className="hide-scrollbar flex snap-x gap-3 overflow-x-auto pb-2">
            {haircutStyles.map((style) => (
              <HaircutCard
                key={style.id}
                style={style}
                selected={selectedStyle === style.id}
                onClick={() => setSelectedStyle(style.id)}
              />
            ))}
          </div>
        </section>

        <BottomActionBar>
          <div className="space-y-3">
            <p className="text-sm text-white/75">Выбранный стиль сразу перенесем в запись, чтобы не повторять шаги.</p>
            <Button className="w-full" onClick={handleContinue}>
              Продолжить с этим стилем
            </Button>
          </div>
        </BottomActionBar>
      </div>
    </main>
  );
}
