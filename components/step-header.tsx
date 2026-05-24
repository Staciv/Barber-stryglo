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
      <p className="text-xs uppercase tracking-[0.28em] text-accent">STRIGLO booking</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-white">{copyMap[step].title}</h1>
      <p className="max-w-sm text-sm text-muted">{copyMap[step].description}</p>
    </div>
  );
}
