"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { barbers, haircutStyles, services } from "@/data/mock";
import { getDayLabel } from "@/lib/booking";
import { useBookingStore } from "@/store/booking-store";

export function ConfirmationScreen() {
  const { completedBooking, resetSelection } = useBookingStore();

  if (!completedBooking) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-8">
        <div className="w-full rounded-[32px] border border-white/10 bg-panel p-6 text-center shadow-card">
          <h1 className="text-2xl font-bold text-white">Бронь пока не создана</h1>
          <p className="mt-2 text-sm text-muted">Начни с домашнего экрана и оформи запись в пару касаний.</p>
          <Button asChild className="mt-6 w-full">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </main>
    );
  }

  const barber = barbers.find((entry) => entry.id === completedBooking.barberId);
  const service = services.find((entry) => entry.id === completedBooking.serviceId);
  const style = haircutStyles.find((entry) => entry.id === completedBooking.recommendedStyleId);

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-6">
      <section className="rounded-[32px] border border-white/10 bg-panel p-6 shadow-card">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">Booking confirmed</p>
        <h1 className="mt-3 text-3xl font-extrabold text-white">Ты записан</h1>
        <p className="mt-2 text-sm text-muted">Мы сохранили бронь и отправим напоминание ближе ко времени.</p>

        <div className="mt-6 space-y-3 rounded-[28px] border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-white/80">{getDayLabel(completedBooking.day, completedBooking.customDate)}</p>
          <p className="text-xl font-bold text-white">{completedBooking.time}</p>
          <p className="text-sm text-white/80">{barber?.name}</p>
          <p className="text-sm text-white/80">{service?.name}</p>
          <p className="text-sm text-white/80">{completedBooking.customerName}</p>
          <p className="text-sm text-white/80">{completedBooking.phone}</p>
          {style && <p className="text-sm text-accent">Стиль: {style.name}</p>}
          {completedBooking.voiceSummary && <p className="text-sm text-white/60">{completedBooking.voiceSummary}</p>}
        </div>

        <div className="mt-6 grid gap-3">
          <Button
            onClick={() => {
              resetSelection();
            }}
            asChild
          >
            <Link href="/">Новая запись</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
