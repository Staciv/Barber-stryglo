"use client";

import { motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { mockBarbers } from "@/entities/barber/mock";
import type { BarberProfile } from "@/entities/barber/types";
import { useAppointmentStore } from "@/entities/booking/appointment-store";
import { mockServices } from "@/entities/service/mock";
import { getMockSlots } from "@/entities/slot/mock";
import { groupSlotsByDate } from "@/entities/slot/lib/group-slots-by-date";
import { otpSchema } from "@/features/auth/lib/auth-validation";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { getAvailableBarbersForSelection } from "@/features/booking/lib/get-available-barbers";
import { getBookableSlots } from "@/features/booking/lib/get-bookable-slots";
import { useBookingDraftStore } from "@/features/booking/model/booking-draft-store";
import { SlotSelector } from "@/features/booking/ui/slot-selector";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { InlineError } from "@/shared/ui/inline-error";
import { isValidBelarusPhone } from "@/shared/lib/belarus-phone";
import { PhoneInput } from "@/shared/ui/phone-input";
import { cn } from "@/shared/lib/utils";

function BarberCard({
  barber,
  selected,
  onSelect,
}: {
  barber: BarberProfile;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-accent bg-accent/15 shadow-glow"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]",
      )}
    >
      <Avatar fallback={barber.name} size="md" />
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold text-foreground">{barber.name}</span>
        <span className="mt-0.5 block truncate text-sm text-muted">
          {barber.specialization ?? barber.bio ?? "Мастер STRIGLO"}
        </span>
      </span>
      <Badge variant={selected ? "accent" : "default"}>
        {selected ? "Выбран" : "Свободен"}
      </Badge>
    </motion.button>
  );
}

export default function BookingPage() {
  const router = useRouter();
  const selectedSlot = useBookingDraftStore((state) => state.selectedSlot);
  const selectedBarberId = useBookingDraftStore((state) => state.selectedBarberId);
  const selectedServiceId = useBookingDraftStore((state) => state.selectedServiceId);
  const contactPhone = useBookingDraftStore((state) => state.contactPhone);
  const isContactPhoneVerified = useBookingDraftStore((state) => state.isContactPhoneVerified);
  const setSlot = useBookingDraftStore((state) => state.setSlot);
  const setBarber = useBookingDraftStore((state) => state.setBarber);
  const setService = useBookingDraftStore((state) => state.setService);
  const setContactPhone = useBookingDraftStore((state) => state.setContactPhone);
  const setContactPhoneVerified = useBookingDraftStore((state) => state.setContactPhoneVerified);
  const clearSlot = useBookingDraftStore((state) => state.clearSlot);
  const resetDraft = useBookingDraftStore((state) => state.resetDraft);
  const createAppointment = useAppointmentStore((state) => state.createAppointment);
  const authPhone = useAuthStore((state) => state.user?.phone);
  const contactRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [comment, setComment] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isChangingPhone, setIsChangingPhone] = useState(false);
  const [errors, setErrors] = useState<{ customerName?: string; phone?: string; phoneOtp?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedService = mockServices.find((service) => service.id === selectedServiceId);
  const bookableSlots = useMemo(
    () =>
      getBookableSlots({
        slots: getMockSlots(),
        service: selectedService,
        barbers: mockBarbers,
      }),
    [selectedService],
  );
  const slotGroups = useMemo(() => groupSlotsByDate(bookableSlots, { limit: 4 }), [bookableSlots]);

  const availableBarbers = useMemo(
    () =>
      getAvailableBarbersForSelection({
        selectedSlot,
        selectedService,
        barbers: mockBarbers,
      }),
    [selectedService, selectedSlot],
  );
  const selectedBarber = availableBarbers.find((barber) => barber.id === selectedBarberId);
  const canContinue = Boolean(selectedSlot && selectedBarber);
  const blockedReason = !selectedSlot
    ? "Сначала выбери свободное время"
    : !selectedBarber
      ? "Выбери доступного мастера"
      : "";

  useEffect(() => {
    if (authPhone && !contactPhone) {
      setContactPhone(authPhone, true);
      setIsChangingPhone(false);
    }
  }, [authPhone, contactPhone, setContactPhone]);

  useEffect(() => {
    if (authPhone && contactPhone === authPhone && !isContactPhoneVerified) {
      setContactPhoneVerified(true);
      setIsChangingPhone(false);
    }
  }, [authPhone, contactPhone, isContactPhoneVerified, setContactPhoneVerified]);

  useEffect(() => {
    if (selectedSlot && !bookableSlots.some((slot) => slot.id === selectedSlot.id)) {
      clearSlot();
      setShowContact(false);
      return;
    }

    if (availableBarbers.length === 1 && selectedBarberId !== availableBarbers[0].id) {
      setBarber(availableBarbers[0].id);
      return;
    }

    if (
      availableBarbers.length !== 1 &&
      selectedBarberId &&
      !availableBarbers.some((barber) => barber.id === selectedBarberId)
    ) {
      setBarber(undefined);
    }
  }, [availableBarbers, bookableSlots, clearSlot, selectedBarberId, selectedSlot, setBarber]);

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    setShowContact(true);
    window.requestAnimationFrame(() => contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const nextErrors = {
      customerName: customerName.trim().length < 2 ? "Введите имя" : undefined,
      phone: !contactPhone.trim()
        ? "Введите телефон"
        : !isValidBelarusPhone(contactPhone)
          ? "Введи белорусский номер: +375 29 123 45 67"
          : !isContactPhoneVerified
            ? "Подтверди телефон SMS-кодом 1111"
          : undefined,
    };
    setErrors(nextErrors);

    if (nextErrors.customerName || nextErrors.phone || !selectedSlot || !selectedBarber || !selectedService) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      createAppointment({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        clientName: customerName.trim(),
        clientPhone: contactPhone.trim(),
        comment: comment.trim() || undefined,
        priceByn: selectedService.priceByn,
        durationMinutes: selectedService.durationMinutes,
        status: "confirmed",
        type: "salon",
      });
      resetDraft();
      router.push("/booking/confirm");
    }, 350);
  };

  const handlePhoneOtpVerify = () => {
    const otpResult = otpSchema.safeParse(phoneOtp);

    if (!otpResult.success) {
      setErrors((current) => ({
        ...current,
        phoneOtp: otpResult.error.errors[0]?.message ?? "Проверь код",
      }));
      return;
    }

    if (phoneOtp !== "1111") {
      setErrors((current) => ({
        ...current,
        phoneOtp: "Неверный код. В демо-версии код подтверждения: 1111",
      }));
      return;
    }

    setContactPhoneVerified(true);
    setIsChangingPhone(false);
    setPhoneOtp("");
    setErrors((current) => ({ ...current, phone: undefined, phoneOtp: undefined }));
  };

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-safe-offset-6">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                STRIGLO booking
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                Выбери свободное время
              </h1>
            </div>
            <Badge variant="accent">Быстро</Badge>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Ближайшие окна без календарного лабиринта. Только доступные слоты.
          </p>
        </motion.header>

        <section className="mt-5">
          <div className="mb-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">Услуга</p>
              <span className="text-xs text-muted">цены в рублях</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mockServices.map((service) => {
                const selected = service.id === selectedServiceId;

                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setService(service.id)}
                    className={cn(
                      "min-w-max rounded-2xl border px-4 py-3 text-left transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
                      selected
                        ? "border-accent bg-accent text-white shadow-glow"
                        : "border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
                    )}
                  >
                    <span className="block text-sm font-semibold">{service.name}</span>
                    <span className={cn("mt-1 block text-xs", selected ? "text-white/85" : "text-muted")}>
                      {service.priceByn} р. · {service.durationMinutes} мин
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <SlotSelector
            groups={slotGroups}
            selectedSlotId={selectedSlot?.id}
            onSelectSlot={setSlot}
          />
        </section>

        <section className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Мастер</p>
              <p className="mt-0.5 text-xs text-muted">
                {selectedSlot ? "Подбираем по выбранному времени" : "Сначала выбери слот"}
              </p>
            </div>
            {availableBarbers.length === 1 && <Badge variant="success">Автовыбор</Badge>}
          </div>

          {!selectedSlot && (
            <EmptyState
              compact
              title="Мастер появится после слота"
              description="Так мы не показываем занятых или неподходящих мастеров."
            />
          )}

          {selectedSlot && availableBarbers.length === 0 && (
            <InlineError>На это время нет доступного мастера. Выбери другой слот.</InlineError>
          )}

          {selectedSlot && availableBarbers.length === 1 && selectedBarber && (
            <Card padding="sm" className="rounded-3xl border-success/20 bg-success/10">
              <div className="flex items-center gap-3">
                <Avatar fallback={selectedBarber.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-foreground">
                    {selectedBarber.name} закреплён за этим временем
                  </p>
                  <p className="mt-1 truncate text-sm text-muted">
                    {selectedBarber.specialization ?? selectedBarber.bio ?? "Мастер STRIGLO"}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {selectedSlot && availableBarbers.length > 1 && (
            <div className="space-y-2">
              {availableBarbers.map((barber) => (
                <BarberCard
                  key={barber.id}
                  barber={barber}
                  selected={barber.id === selectedBarberId}
                  onSelect={() => setBarber(barber.id)}
                />
              ))}
            </div>
          )}
        </section>

        {showContact && (
          <motion.section
            ref={contactRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card"
          >
            <h2 className="text-lg font-semibold text-foreground">Контактные данные</h2>
            <p className="mt-1 text-sm text-muted">Нужны только имя и телефон для подтверждения.</p>
            <form id="booking-contact-form" className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-2" htmlFor="booking-name">
                <span className="text-sm font-medium text-foreground">Имя</span>
                <input
                  id="booking-name"
                  value={customerName}
                  onChange={(event) => {
                    setCustomerName(event.target.value);
                    setErrors((current) => ({ ...current, customerName: undefined }));
                  }}
                  className={cn(
                    "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-foreground outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                    errors.customerName ? "border-danger/60" : "border-white/10",
                  )}
                  placeholder="Как к тебе обращаться?"
                />
                <InlineError>{errors.customerName}</InlineError>
              </label>

              {authPhone && contactPhone === authPhone && isContactPhoneVerified && !isChangingPhone ? (
                <div className="rounded-2xl border border-success/20 bg-success/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted">Проверенный телефон</p>
                      <p className="mt-1 text-base font-semibold text-foreground">{contactPhone}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsChangingPhone(true)}
                    >
                      Изменить
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <PhoneInput
                    id="booking-phone"
                    value={contactPhone}
                    onChange={(nextPhone) => {
                      setContactPhone(nextPhone, Boolean(authPhone && nextPhone === authPhone));
                      setPhoneOtp("");
                      setErrors((current) => ({ ...current, phone: undefined, phoneOtp: undefined }));
                    }}
                    error={errors.phone}
                    description="Если номер отличается от аккаунта, подтверди его кодом 1111."
                  />

                  {contactPhone && isValidBelarusPhone(contactPhone) && !isContactPhoneVerified && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <label className="block space-y-2" htmlFor="booking-phone-otp">
                        <span className="text-sm font-medium text-foreground">SMS-код</span>
                        <span className="block text-xs text-muted">Демо-код: 1111</span>
                        <input
                          id="booking-phone-otp"
                          inputMode="numeric"
                          maxLength={4}
                          value={phoneOtp}
                          onChange={(event) => {
                            setPhoneOtp(event.target.value.replace(/\D/g, "").slice(0, 4));
                            setErrors((current) => ({ ...current, phoneOtp: undefined }));
                          }}
                          placeholder="1111"
                          className={cn(
                            "min-h-12 w-full rounded-xl border bg-black/20 px-4 text-center text-lg font-black tracking-[0.3em] text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30",
                            errors.phoneOtp ? "border-danger/60" : "border-white/10",
                          )}
                        />
                      </label>
                      <InlineError>{errors.phoneOtp}</InlineError>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={handlePhoneOtpVerify}
                      >
                        Подтвердить телефон
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <label className="block space-y-2" htmlFor="booking-comment">
                <span className="text-sm font-medium text-foreground">Комментарий</span>
                <textarea
                  id="booking-comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-foreground outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30"
                  placeholder="Например: коротко по бокам"
                />
              </label>

              <Button type="submit" className="w-full" loading={isSubmitting}>
                {isSubmitting ? "Сохраняем запись" : "Подтвердить запись"}
              </Button>
            </form>
          </motion.section>
        )}

        <div className="mt-auto sticky bottom-0 -mx-4 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-safe-offset-4 pt-5">
          <Card padding="sm" className="rounded-[1.75rem] border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted">Выбрано</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {selectedSlot ? `${selectedSlot.startTime} · ${selectedSlot.date}` : "Слот не выбран"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {selectedBarber ? selectedBarber.name : "Мастер не выбран"}
                </p>
                {!canContinue && <p className="mt-2 text-xs text-warning">{blockedReason}</p>}
              </div>
              <Button
                size="sm"
                disabled={!canContinue || isSubmitting}
                onClick={showContact ? undefined : handleContinue}
                type={showContact ? "submit" : "button"}
                form={showContact ? "booking-contact-form" : undefined}
                loading={showContact && isSubmitting}
              >
                {showContact
                  ? isSubmitting
                    ? "Сохраняем"
                    : "Подтвердить"
                  : "Продолжить"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
