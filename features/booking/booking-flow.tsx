"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
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
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.98 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export function BookingFlow({
  openDatePicker = false,
}: {
  openDatePicker?: boolean;
}) {
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

  const [errors, setErrors] = useState<{
    customerName?: string;
    phone?: string;
  }>({});
  const [draftName, setDraftName] = useState(selection.customerName ?? "");
  const [draftPhone, setDraftPhone] = useState(selection.phone ?? "");
  const [isCalendarOpen, setIsCalendarOpen] = useState(openDatePicker);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const currentStep = getNextStep(selection);
  const availableBarbers = useMemo(
    () => getAvailableBarbers(selection.time),
    [selection.time]
  );
  const selectedBarber = barbers.find(
    (barber) => barber.id === selection.barberId
  );
  const selectedService = services.find(
    (service) => service.id === selection.serviceId
  );

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
    const result = validateBookingDetails({
      customerName: draftName,
      phone: draftPhone,
    });

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
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.1),transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-4 pb-6 pt-5">
        <div className="space-y-5">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-elevated overflow-hidden rounded-[32px] p-5"
          >
            <BookingProgress currentStep={currentStep} />

            <div className="mt-5 flex items-start justify-between gap-4">
              <StepHeader step={currentStep} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="shrink-0"
              >
                <ArrowLeft className="mr-1.5 size-4" />
                Назад
              </Button>
            </div>

            {/* Hint Panel */}
            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Sparkles className="size-3.5 text-accent" />
                </div>
                <p className="text-sm text-white/60">
                  {selection.voiceSummary ?? nextStepHint[currentStep]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.section
              key={currentStep}
              {...stepMotion}
              className="glass-panel-elevated rounded-[32px] p-5"
            >
              {currentStep === "day" && (
                <div className="space-y-3">
                  {dayOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      type="button"
                      onClick={() => handleDaySelect(option.id)}
                      aria-label={option.label}
                      className="group flex w-full items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                    >
                      <div>
                        <p className="text-lg font-semibold text-white transition-colors group-hover:text-accent">
                          {option.label}
                        </p>
                        <p className="text-sm text-muted">{option.hint}</p>
                      </div>
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        1 тап
                      </span>
                    </motion.button>
                  ))}

                  {isCalendarOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="rounded-2xl border border-accent/30 bg-accent/[0.08] p-4 shadow-glow"
                    >
                      <label
                        className="block space-y-3"
                        htmlFor="custom-booking-date"
                      >
                        <span className="text-sm font-medium text-white">
                          Выбери дату
                        </span>
                        <input
                          ref={dateInputRef}
                          id="custom-booking-date"
                          type="date"
                          min={getTodayDateValue()}
                          value={selection.customDate ?? ""}
                          onChange={(event) =>
                            handleCustomDateChange(event.target.value)
                          }
                          className="min-h-14 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition-all [color-scheme:dark] focus:border-accent focus:ring-2 focus:ring-accent/30"
                        />
                      </label>
                      <p className="mt-2 text-xs text-white/50">
                        Тапни по полю даты, затем сразу покажем свободное время.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {currentStep === "time" && (
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot, index) => (
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <TimeSlot
                        time={slot}
                        selected={selection.time === slot}
                        onClick={() => setTime(slot)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {currentStep === "barber" && (
                <div className="space-y-3">
                  {availableBarbers.length > 0 ? (
                    availableBarbers.map((barber, index) => (
                      <motion.div
                        key={barber.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <BarberCard
                          barber={barber}
                          selected={selection.barberId === barber.id}
                          onClick={() => setBarber(barber.id)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-muted">
                      На это время нет мастеров. Выбери другой слот.
                    </div>
                  )}
                </div>
              )}

              {currentStep === "service" && (
                <ServiceSelector
                  services={services}
                  selectedServiceId={selection.serviceId}
                  onSelect={setService}
                />
              )}

              {currentStep === "details" && (
                <div className="space-y-5">
                  {/* Booking Summary */}
                  <div className="rounded-2xl border border-accent/20 bg-accent/[0.05] p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-accent">
                      Твоя бронь
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <Check className="size-4 text-accent" />
                        <span>
                          {getDayLabel(selection.day!, selection.customDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="size-4 text-accent" />
                        <span>{selection.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="size-4 text-accent" />
                        <span>{selectedBarber?.name ?? "Барбер не выбран"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="size-4 text-accent" />
                        <span>
                          {selectedService?.name ?? "Услуга не выбрана"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <label className="block space-y-2" htmlFor="booking-name">
                    <span className="text-sm font-medium text-white">Имя</span>
                    <input
                      id="booking-name"
                      value={draftName}
                      onChange={(event) => setDraftName(event.target.value)}
                      placeholder="Как к тебе обращаться?"
                      className={cn(
                        "min-h-14 w-full rounded-xl border bg-white/[0.03] px-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-accent focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/30",
                        errors.customerName
                          ? "border-red-400/60"
                          : "border-white/[0.08]"
                      )}
                    />
                    {errors.customerName && (
                      <span className="text-xs text-red-400">
                        {errors.customerName}
                      </span>
                    )}
                  </label>

                  <label className="block space-y-2" htmlFor="booking-phone">
                    <span className="text-sm font-medium text-white">
                      Телефон
                    </span>
                    <input
                      id="booking-phone"
                      value={draftPhone}
                      onChange={(event) => setDraftPhone(event.target.value)}
                      placeholder="+375 (29) 000-00-00"
                      className={cn(
                        "min-h-14 w-full rounded-xl border bg-white/[0.03] px-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-accent focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/30",
                        errors.phone
                          ? "border-red-400/60"
                          : "border-white/[0.08]"
                      )}
                    />
                    {errors.phone && (
                      <span className="text-xs text-red-400">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                </div>
              )}
            </motion.section>
          </AnimatePresence>

          {/* Bottom Action Bar */}
          <BottomActionBar>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted">Сейчас</span>
                <span className="font-medium text-white">
                  {selection.day
                    ? getDayLabel(selection.day, selection.customDate)
                    : "Выбор дня"}
                  {selection.time ? ` · ${selection.time}` : ""}
                </span>
              </div>
              {currentStep === "details" ? (
                <Button className="w-full" onClick={handleConfirm}>
                  <Check className="mr-2 size-4" />
                  Подтвердить запись
                </Button>
              ) : (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/50">
                  {currentStep === "barber" && availableBarbers.length === 0
                    ? "Нет доступных мастеров для этого времени."
                    : "Бронь идет в одном экране без перезагрузок."}
                </div>
              )}
            </div>
          </BottomActionBar>
        </div>
      </div>
    </main>
  );
}
