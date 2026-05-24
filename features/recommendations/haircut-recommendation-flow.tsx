"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Sparkles, Wand2 } from "lucide-react";
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
    <main className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-4 pb-6 pt-5">
        <div className="space-y-5">
          {/* Header Section */}
          <motion.section
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-elevated overflow-hidden rounded-[32px] p-5"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-[#e55a00]">
                <Wand2 className="size-4 text-white" />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                AI Style Picker
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
              Подобрать стрижку
            </h1>
            <p className="mt-2 text-sm text-muted">
              Фото можно подключить позже. Сейчас покажем премиальные
              рекомендации на mocked data.
            </p>

            {/* Selfie Upload Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05] text-white/50">
                    <Camera className="size-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">
                      Selfie input
                    </p>
                    <p className="text-sm text-muted">
                      Загрузить фото или сделать селфи
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
                  mocked
                </span>
              </div>

              {/* Preview Area */}
              <div className="relative mt-5 h-44 overflow-hidden rounded-2xl">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-panel-light via-panel to-black" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Glow Effect */}
                <div className="absolute left-1/2 top-0 h-full w-3/4 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.2),transparent_60%)]" />

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                    <Camera className="size-6 text-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Recommendations Section */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                <h2 className="text-lg font-semibold text-white">
                  Рекомендации
                </h2>
              </div>
              <span className="text-sm text-muted">Свайпни и выбери</span>
            </div>

            <div className="hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
              {haircutStyles.map((style, index) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.08 }}
                >
                  <HaircutCard
                    style={style}
                    selected={selectedStyle === style.id}
                    onClick={() => setSelectedStyle(style.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Bottom Action Bar */}
          <BottomActionBar>
            <div className="space-y-3">
              <p className="text-sm text-white/60">
                Выбранный стиль сразу перенесем в запись, чтобы не повторять
                шаги.
              </p>
              <Button className="group w-full" onClick={handleContinue}>
                Продолжить с этим стилем
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </BottomActionBar>
        </div>
      </div>
    </main>
  );
}
