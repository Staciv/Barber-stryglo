"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockServices } from "@/entities/service/mock";
import { useBookingDraftStore } from "@/features/booking/model/booking-draft-store";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

const questions = [
  {
    id: "length",
    title: "Какая длина волос сейчас?",
    options: ["Короткая", "Средняя", "Длинная"],
  },
  {
    id: "style",
    title: "Какой стиль хочешь?",
    options: ["Аккуратный", "Молодёжный", "Классика"],
  },
  {
    id: "styling",
    title: "Сколько времени готов тратить на укладку?",
    options: ["До 2 минут", "5-10 минут", "Не важно"],
  },
  {
    id: "beard",
    title: "Нужна ли борода?",
    options: ["Да", "Нет"],
  },
] as const;

export default function RecommendationPage() {
  const router = useRouter();
  const setService = useBookingDraftStore((state) => state.setService);
  const recommendedService = mockServices.find((service) => service.id === "cut-beard") ?? mockServices[0];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const isComplete = questions.every((question) => answers[question.id]);

  const handleBooking = () => {
    if (recommendedService) {
      setService(recommendedService.id);
    }
    router.push("/booking");
  };

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card"
        >
          <Badge variant="accent">Style match</Badge>
          <h1 className="mt-4 text-3xl font-black text-foreground">Подбор стрижки</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Ответь на четыре вопроса, и STRIGLO предложит mock-рекомендацию без загрузки фото и real AI.
          </p>
        </motion.section>

        <div className="mt-5 space-y-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <h2 className="text-base font-semibold text-foreground">{question.title}</h2>
              <div className="mt-3 grid gap-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                      className={cn(
                        "min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
                        selected
                          ? "border-accent bg-accent/15 text-foreground shadow-glow"
                          : "border-white/10 bg-white/[0.04] text-muted hover:bg-white/[0.08]",
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {isComplete && recommendedService && (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-[2rem] border border-accent/20 surface-panel p-5 shadow-card"
          >
            <Badge variant="success">Рекомендация готова</Badge>
            <h2 className="mt-4 text-2xl font-black text-foreground">Тебе подойдёт: Crop Fade</h2>
            <div className="mt-4 space-y-2 text-sm leading-6 text-muted">
              <p>Почему:</p>
              <p>— легко укладывать;</p>
              <p>— аккуратно выглядит;</p>
              <p>— подходит под частую коррекцию.</p>
            </div>
            <Card padding="sm" className="mt-4 rounded-3xl">
              <p className="text-sm text-muted">Рекомендуемая услуга</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{recommendedService.name}</p>
              <p className="mt-1 text-sm text-muted">
                {recommendedService.priceByn} BYN · {recommendedService.durationMinutes} мин
              </p>
            </Card>
            <Button type="button" className="mt-4 w-full" size="lg" onClick={handleBooking}>
              Записаться с этой рекомендацией
            </Button>
          </motion.section>
        )}
      </div>
    </main>
  );
}
