import { Zap } from "lucide-react";
import type { BookingStep } from "@/types/booking";

const copyMap: Record<BookingStep, { title: string; description: string }> = {
  day: {
    title: "Когда тебе удобно?",
    description: "Выбери день без лишних экранов.",
  },
  time: {
    title: "Выбери слот",
    description: "Показываем только живое время.",
  },
  barber: {
    title: "Кто стрижет?",
    description: "Начни с самого быстрого варианта.",
  },
  service: {
    title: "Что делаем?",
    description: "Минимум выбора, максимум ясности.",
  },
  details: {
    title: "Почти готово",
    description: "Имя и телефон, и бронь у тебя.",
  },
};

export function StepHeader({ step }: { step: BookingStep }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-accent to-[#e55a00]">
          <Zap className="size-3.5 text-white" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          STRIGLO booking
        </p>
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {copyMap[step].title}
      </h1>
      <p className="max-w-sm text-sm text-muted">{copyMap[step].description}</p>
    </div>
  );
}
