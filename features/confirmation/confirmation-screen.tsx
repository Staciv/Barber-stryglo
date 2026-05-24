"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Scissors,
  Sparkles,
  User,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { barbers, haircutStyles, services } from "@/data/mock";
import { getDayLabel } from "@/lib/booking";
import { useBookingStore } from "@/store/booking-store";

export function ConfirmationScreen() {
  const { completedBooking, resetSelection } = useBookingStore();

  if (!completedBooking) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.08),transparent_60%)] blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-md items-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-elevated w-full rounded-[32px] p-6 text-center"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Calendar className="size-7 text-muted" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-white">
              Бронь пока не создана
            </h1>
            <p className="mt-2 text-sm text-muted">
              Начни с домашнего экрана и оформи запись в пару касаний.
            </p>
            <Button asChild className="mt-6 w-full">
              <Link href="/">
                На главную
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    );
  }

  const barber = barbers.find((entry) => entry.id === completedBooking.barberId);
  const service = services.find(
    (entry) => entry.id === completedBooking.serviceId
  );
  const style = haircutStyles.find(
    (entry) => entry.id === completedBooking.recommendedStyleId
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-4 py-6">
        {/* Success Card */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel-elevated overflow-hidden rounded-[32px] p-6"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#e55a00] shadow-glow-lg"
          >
            <CheckCircle2 className="size-10 text-white" />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Booking Confirmed
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              Ты записан
            </h1>
            <p className="mt-2 text-sm text-muted">
              Мы сохранили бронь и отправим напоминание ближе ко времени.
            </p>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 space-y-3"
          >
            {/* Time Card - Highlighted */}
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.08] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent/20">
                    <Clock className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Дата и время</p>
                    <p className="text-lg font-bold text-white">
                      {completedBooking.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-accent">
                    {getDayLabel(
                      completedBooking.day,
                      completedBooking.customDate
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Other Details */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="space-y-4">
                {/* Barber */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <Scissors className="size-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Барбер</p>
                    <p className="text-sm font-medium text-white">
                      {barber?.name}
                    </p>
                  </div>
                </div>

                {/* Service */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <Sparkles className="size-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Услуга</p>
                    <p className="text-sm font-medium text-white">
                      {service?.name}
                    </p>
                  </div>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <User className="size-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Имя</p>
                    <p className="text-sm font-medium text-white">
                      {completedBooking.customerName}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <Phone className="size-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Телефон</p>
                    <p className="text-sm font-medium text-white">
                      {completedBooking.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Style (if selected) */}
            {style && (
              <div className="rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent-cyan/20">
                    <Sparkles className="size-5 text-accent-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Рекомендованный стиль</p>
                    <p className="text-sm font-medium text-accent-cyan">
                      {style.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Voice Summary */}
            {completedBooking.voiceSummary && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-xs text-white/40">Голосовой запрос</p>
                <p className="mt-1 text-sm text-white/70">
                  {completedBooking.voiceSummary}
                </p>
              </div>
            )}
          </motion.div>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button
              onClick={() => {
                resetSelection();
              }}
              asChild
              className="w-full"
            >
              <Link href="/">
                Новая запись
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
