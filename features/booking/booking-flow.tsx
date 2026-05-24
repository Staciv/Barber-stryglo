"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarberCard } from "@/components/barber-card";
import { BookingProgress } from "@/components/booking-progress";
import { BottomActionBar } from "@/components/bottom-action-bar";
import { ServiceSelector } from "@/components/service-selector";
import { StepHeader } from "@/components/step-header";
import { TimeSlot } from "@/components/time-slot";
import { barbers, services, timeSlots } from "@/data/mock";
import {
  getAvailableBarbers,
  getDayLabel,
  getNextStep,
  getTodayDateValue,
  validateBookingDetails,
} from "@/lib/booking";
import { useBookingStore } from "@/store/booking-store";
import type { BookingStep, DayOption } from "@/types/booking";
import { cn } from "@/lib/utils";

const dayOptions: { id: DayOption; label: string; hint: string }[] = [
  { id: "today", label: "Сегодня", hint: "Самый быстрый вариант" },
  { id: "tomorrow", label: "Завтра", hint: "Удобно без спешки" },
  { id: "custom", label: "Выбрать дату", hint: "Если нужен другой день" },
];

const stepMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
};

export function BookingFlow({ openDatePicker = false }: { openDatePicker?: boolean }) {
  const router = useRouter();
  const {
    selection,
    setDay,
    setTime,
    setBarber,
    setService,
    setDetails,
    confirmBooking,
  } = useBookingStore();

  const [errors, setErrors] = useState<{ customerName?: string; phone?: string }>({});
  const [draftName, setDraftName] = useState(selection.customerName ?? "");
  const [draftPhone, setDraftPhone] = useState(selection.phone ?? "");
  const [isCalendarOpen, setIsCalendarOpen] = useState(openDatePicker);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const currentStep = getNextStep(selection);
  const availableBarbers = useMemo(() => getAvailableBarbers(selection.time), [selection.time]);
  const selectedBarber = barbers.find((barber) => barber.id === selection.barberId);
  const selectedService = services.find((service) => service.id === selection.serviceId);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    dateInputRef.current?.focus();
  }, [isCalendarOpen]);

  useEffect(() => {
    if (openDatePicker && currentStep === "day") {
      setIsCalendarOpen(true);
    }
  }, [currentStep, openDatePicker]);

  const handleDaySelect = (day: DayOption) => {
    if (day === "custom") {
      setIsCalendarOpen(true);
      return;
    }

    setIsCalendarOpen(false);
    setDay(day);
  };

  const handleCustomDateChange = (customDate: string) => {
    if (!customDate) {
      return;
    }

    setDay("custom", customDate);
    setIsCalendarOpen(false);
  };

  const handleConfirm = () => {
    const result = validateBookingDetails({ customerName: draftName, phone: draftPhone });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        customerName: fieldErrors.customerName?.[0],
        phone: fieldErrors.phone?.[0],
      });
      return;
    }

    setDetails(draftName, draftPhone);
    const booking = confirmBooking();

    if (booking) {
      router.push("/confirmation");
    }
  };

  const nextStepHint: Record<BookingStep, string> = {
    day: "Выбери день, и мы сразу покажем свободные слоты.",
    time: "Показываем только то время, которое реально доступно.",
    barber: "Сначала советуем самый быстрый вариант, чтобы не терять темп.",
    service: "Выбери услугу в одно касание.",
    details: "Осталось подтвердить контакт.",
  };

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-6 pt-5">
      <div className="space-y-5">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-card backdrop-blur-xl">
          <BookingProgress currentStep={currentStep} />
          <div className="mt-5 flex items-start justify-between gap-4">
            <StepHeader step={currentStep} />
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              Назад
            </Button>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            {selection.voiceSummary ?? nextStepHint[currentStep]}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.section key={currentStep} {...stepMotion} className="rounded-[32px] border border-white/10 bg-panel p-4 shadow-card">
            {currentStep === "day" && (
              <div className="space-y-3">
                {dayOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleDaySelect(option.id)}
                    aria-label={option.label}
                    className="flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                  >
                    <div>
                      <p className="text-lg font-semibold text-white">{option.label}</p>
                      <p className="text-sm text-muted">{option.hint}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">1 тап</span>
                  </button>
                ))}

                {isCalendarOpen && (
                  <div className="rounded-3xl border border-accent/30 bg-accent/10 p-4 shadow-glow">
                    <label className="block space-y-2" htmlFor="custom-booking-date">
                      <span className="text-sm font-medium text-white">Выбери дату</span>
                      <input
                        ref={dateInputRef}
                        id="custom-booking-date"
                        type="date"
                        min={getTodayDateValue()}
                        value={selection.customDate ?? ""}
                        onChange={(event) => handleCustomDateChange(event.target.value)}
                        className="min-h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition-all [color-scheme:dark] focus:border-accent focus:ring-2 focus:ring-accent/30"
                      />
                    </label>
                    <p className="mt-2 text-xs text-white/65">Тапни по полю даты, затем сразу покажем свободное время.</p>
                  </div>
                )}
              </div>
            )}

            {currentStep === "time" && (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <TimeSlot
                    key={slot}
                    time={slot}
                    selected={selection.time === slot}
                    onClick={() => setTime(slot)}
                  />
                ))}
              </div>
            )}

            {currentStep === "barber" && (
              <div className="space-y-3">
                {availableBarbers.length > 0 ? (
                  availableBarbers.map((barber) => (
                    <BarberCard
                      key={barber.id}
                      barber={barber}
                      selected={selection.barberId === barber.id}
                      onClick={() => setBarber(barber.id)}
                    />
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-5 text-sm text-muted">
                    На это время нет мастеров. Выбери другой слот.
                  </div>
                )}
              </div>
            )}

            {currentStep === "service" && (
              <ServiceSelector services={services} selectedServiceId={selection.serviceId} onSelect={setService} />
            )}

            {currentStep === "details" && (
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-muted">Твоя бронь</p>
                  <div className="mt-3 grid gap-2 text-sm text-white/80">
                    <p>{getDayLabel(selection.day!, selection.customDate)}</p>
                    <p>{selection.time}</p>
                    <p>{selectedBarber?.name ?? "Барбер не выбран"}</p>
                    <p>{selectedService?.name ?? "Услуга не выбрана"}</p>
                  </div>
                </div>

                <label className="block space-y-2" htmlFor="booking-name">
                  <span className="text-sm text-white">Имя</span>
                  <input
                    id="booking-name"
                    value={draftName}
                    onChange={(event) => setDraftName(event.target.value)}
                    placeholder="Как к тебе обращаться?"
                    className={cn(
                      "min-h-14 w-full rounded-2xl border bg-white/5 px-4 text-white outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                      errors.customerName ? "border-red-400/60" : "border-white/10",
                    )}
                  />
                  {errors.customerName && <span className="text-xs text-red-300">{errors.customerName}</span>}
                </label>

                <label className="block space-y-2" htmlFor="booking-phone">
                  <span className="text-sm text-white">Телефон</span>
                  <input
                    id="booking-phone"
                    value={draftPhone}
                    onChange={(event) => setDraftPhone(event.target.value)}
                    placeholder="+375 (29) 000-00-00"
                    className={cn(
                      "min-h-14 w-full rounded-2xl border bg-white/5 px-4 text-white outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                      errors.phone ? "border-red-400/60" : "border-white/10",
                    )}
                  />
                  {errors.phone && <span className="text-xs text-red-300">{errors.phone}</span>}
                </label>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        <BottomActionBar>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted">Сейчас</span>
              <span className="font-medium text-white">
                {selection.day ? getDayLabel(selection.day, selection.customDate) : "Выбор дня"}
                {selection.time ? ` · ${selection.time}` : ""}
              </span>
            </div>
            {currentStep === "details" ? (
              <Button className="w-full" onClick={handleConfirm}>
                Подтвердить запись
              </Button>
            ) : (
              <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/70">
                {currentStep === "barber" && availableBarbers.length === 0
                  ? "Нет доступных мастеров для этого времени."
                  : "Бронь идет в одном экране без перезагрузок."}
              </div>
            )}
          </div>
        </BottomActionBar>
      </div>
    </main>
  );
}
