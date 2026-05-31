"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAppointmentStore } from "@/entities/booking/appointment-store";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { useHydratedStore } from "@/shared/lib/use-hydrated-store";
import { FadeIn, MotionCard } from "@/shared/ui/motion";

export default function BookingConfirmPage() {
  const appointments = useHydratedStore(useAppointmentStore, (state) => state.appointments) ?? [];
  const lastAppointmentId = useHydratedStore(useAppointmentStore, (state) => state.lastAppointmentId);
  const appointment =
    appointments.find((item) => item.id === lastAppointmentId) ??
    appointments[0];
  const statusLabel = appointment?.status === "pending"
    ? "Ожидает подтверждения"
    : appointment?.status === "cancelled"
      ? "Отменена"
      : "Подтверждена";

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <FadeIn
          as="section"
          className="rounded-[2rem] border border-success/20 surface-panel p-5 shadow-card"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex size-12 items-center justify-center rounded-full border border-success/20 bg-success/12 text-success shadow-glow"
            aria-hidden="true"
          >
            ✓
          </motion.div>
          <Badge variant="success">Запись подтверждена</Badge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground">Готово</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Мы сохранили запись в mock-истории. Детали доступны в активности.
          </p>
        </FadeIn>

        {appointment ? (
          <MotionCard className="mt-5" delay={0.06}>
            <p className="text-sm text-muted">Твоя запись</p>
            <div className="mt-4 space-y-3 text-sm text-foreground">
              <p className="text-xl font-black">{appointment.serviceName}</p>
              <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                <p><span className="text-muted">Мастер:</span> {appointment.barberName}</p>
                <p><span className="text-muted">Дата:</span> {appointment.date}</p>
                <p>
                  <span className="text-muted">Время:</span> {appointment.startTime}
                  {appointment.endTime ? `-${appointment.endTime}` : ""}
                </p>
                <p><span className="text-muted">Длительность:</span> {appointment.durationMinutes} мин</p>
                <p><span className="text-muted">Цена:</span> {appointment.priceByn} р.</p>
                <p><span className="text-muted">Клиент:</span> {appointment.clientName}</p>
                <p><span className="text-muted">Телефон:</span> {appointment.clientPhone}</p>
                {appointment.comment && (
                  <p><span className="text-muted">Комментарий:</span> {appointment.comment}</p>
                )}
                <p><span className="text-muted">Статус:</span> {statusLabel}</p>
              </div>
            </div>
          </MotionCard>
        ) : (
          <div className="mt-5">
            <EmptyState title="Запись не найдена" description="Создай новую запись, и детали появятся здесь." />
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button asChild>
            <Link href="/activity">Активность</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/booking">Новая запись</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
