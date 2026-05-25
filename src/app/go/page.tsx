"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { mockBarbers } from "@/entities/barber/mock";
import { useAppointmentStore } from "@/entities/booking/appointment-store";
import { mockServices } from "@/entities/service/mock";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { InlineError } from "@/shared/ui/inline-error";
import { isValidBelarusPhone } from "@/shared/lib/belarus-phone";
import { PhoneInput } from "@/shared/ui/phone-input";
import { cn } from "@/shared/lib/utils";

type GoWindow = {
  id: string;
  label: string;
  date: string;
  time: string;
};

type GoErrors = {
  address?: string;
  customerName?: string;
  phone?: string;
  customDate?: string;
  customTime?: string;
};

const goWindows: GoWindow[] = [
  { id: "evening-today", label: "Сегодня вечером", date: "сегодня", time: "19:30" },
  { id: "tomorrow-day", label: "Завтра днём", date: "завтра", time: "14:00" },
  { id: "tomorrow-evening", label: "Завтра вечером", date: "завтра", time: "20:00" },
];

function toDateValue(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function dateFromToday(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return toDateValue(date);
}

function formatGoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("ru-BY", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function getRelativeDateLabel(value: string) {
  if (value === dateFromToday(0)) {
    return `Сегодня, ${formatGoDate(value)}`;
  }

  if (value === dateFromToday(1)) {
    return `Завтра, ${formatGoDate(value)}`;
  }

  return formatGoDate(value);
}

function getGoWindowDate(windowId: string) {
  return windowId === "evening-today" ? dateFromToday(0) : dateFromToday(1);
}

export default function GoPage() {
  const userPhone = useAuthStore((state) => state.user?.phone);
  const createAppointment = useAppointmentStore((state) => state.createAppointment);
  const [selectedWindowId, setSelectedWindowId] = useState(goWindows[0].id);
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customDate, setCustomDate] = useState(dateFromToday(0));
  const [customTime, setCustomTime] = useState("18:30");
  const [address, setAddress] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(mockServices[0]?.id ?? "");
  const [selectedBarberId, setSelectedBarberId] = useState(mockBarbers[0]?.id ?? "");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<GoErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedService = mockServices.find((service) => service.id === selectedServiceId);
  const availableBarbers = useMemo(
    () =>
      mockBarbers.filter(
        (barber) => barber.isActive && (!selectedServiceId || barber.serviceIds.includes(selectedServiceId)),
      ),
    [selectedServiceId],
  );
  const selectedBarber = availableBarbers.find((barber) => barber.id === selectedBarberId);
  const selectedWindow = goWindows.find((window) => window.id === selectedWindowId) ?? goWindows[0];
  const dateOptions = useMemo(
    () => [0, 1, 2, 3].map((offset) => {
      const value = dateFromToday(offset);
      return {
        value,
        label: getRelativeDateLabel(value),
      };
    }),
    [],
  );
  const selectedGoDate = useCustomTime ? customDate : getGoWindowDate(selectedWindow.id);
  const selectedGoTime = useCustomTime ? customTime : selectedWindow.time;
  const selectedGoDateLabel = selectedGoDate ? getRelativeDateLabel(selectedGoDate) : "";
  const goSummary = `${selectedGoDateLabel} · ${selectedGoTime || "время не выбрано"}`;

  useEffect(() => {
    if (userPhone && !phone) {
      setPhone(userPhone);
    }
  }, [phone, userPhone]);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const nextBarbers = mockBarbers.filter(
      (barber) => barber.isActive && barber.serviceIds.includes(serviceId),
    );
    setSelectedBarberId(nextBarbers[0]?.id ?? "");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const nextErrors: GoErrors = {
      address: address.trim().length < 5 ? "Укажи адрес выезда" : undefined,
      customerName: customerName.trim().length < 2 ? "Укажи имя" : undefined,
      phone: !phone.trim()
        ? "Укажи номер телефона"
        : !isValidBelarusPhone(phone)
          ? "Введи белорусский номер: +375 29 123 45 67"
          : undefined,
      customDate: useCustomTime && !customDate ? "Выбери дату выезда" : undefined,
      customTime: useCustomTime && !customTime ? "Выбери время выезда" : undefined,
    };

    setErrors(nextErrors);

    if (
      nextErrors.address ||
      nextErrors.customerName ||
      nextErrors.phone ||
      nextErrors.customDate ||
      nextErrors.customTime ||
      !selectedService ||
      !selectedBarber
    ) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      createAppointment({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        date: selectedGoDate,
        startTime: selectedGoTime,
        clientName: customerName.trim(),
        clientPhone: phone.trim(),
        comment: address.trim(),
        priceByn: selectedService.priceByn,
        durationMinutes: selectedService.durationMinutes,
        status: "pending",
        type: "go",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 220);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-striglo-grid">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-accent/20 surface-panel p-5 shadow-card"
          >
            <Badge variant="success">GO-заявка отправлена</Badge>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground">Заявка у мастера</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              Это mock-заявка. В реальной версии мастер сможет подтвердить время или предложить другое.
            </p>
          </motion.section>

          <Card className="mt-5">
            <p className="text-sm text-muted">Детали</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{selectedService?.name}</p>
            <p className="mt-1 text-sm text-muted">{selectedBarber?.name ?? "Мастер STRIGLO"}</p>
            {selectedService && (
              <p className="mt-1 text-sm text-muted">
                {selectedService.priceByn} BYN · {selectedService.durationMinutes} мин
              </p>
            )}
            <p className="mt-3 text-sm text-muted">
              Выезд: {goSummary}
            </p>
            <p className="mt-1 text-sm text-muted">{address}</p>
            <p className="mt-1 text-sm text-muted">
              {customerName} · {phone}
            </p>
          </Card>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button asChild variant="secondary">
              <Link href="/">Домой</Link>
            </Button>
            <Button asChild>
              <Link href="/activity">Активность</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card"
        >
          <Badge variant="accent">STRIGLO GO</Badge>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground">Выездная стрижка</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Premium-заявка на выезд мастера. Выбери окно, услугу и адрес без лишней CRM-формы.
          </p>
        </motion.section>

        <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Выбери дату и время выезда</h2>
                <p className="mt-1 text-sm text-muted">Выбери готовый вариант или предложи своё время</p>
              </div>
              <Badge variant="warning">Mock</Badge>
            </div>

            <div className="mt-4 grid gap-2">
              {goWindows.map((window) => {
                const selected = !useCustomTime && selectedWindowId === window.id;

                return (
                  <button
                    key={window.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setUseCustomTime(false);
                      setSelectedWindowId(window.id);
                    }}
                    className={cn(
                      "min-h-14 rounded-2xl border px-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
                      selected
                        ? "border-[rgba(255,106,0,0.9)] bg-accent text-white shadow-[0_0_0_1px_rgba(255,106,0,0.2)]"
                        : "border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
                    )}
                  >
                    <span className="block text-sm font-semibold">{window.label}</span>
                    <span className={cn("mt-1 block text-xs", selected ? "text-white/85" : "text-muted")}>
                      {window.date} · {window.time}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-pressed={useCustomTime}
              onClick={() => setUseCustomTime(true)}
              className={cn(
                "mt-3 min-h-14 w-full rounded-2xl border px-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
                useCustomTime
                  ? "border-[rgba(255,106,0,0.9)] bg-accent/15 text-foreground shadow-[0_0_0_1px_rgba(255,106,0,0.2)]"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
              )}
            >
              <span className="block text-sm font-semibold">Предложить своё время</span>
              <span className="mt-1 block text-xs text-muted">Мастер подтвердит или предложит другое время</span>
            </button>

            {useCustomTime && (
              <div className="mt-3 grid gap-3">
                <label className="block space-y-2" htmlFor="go-custom-date">
                  <span className="text-sm font-medium text-foreground">Дата</span>
                  <select
                    id="go-custom-date"
                    value={customDate}
                    onChange={(event) => {
                      setCustomDate(event.target.value);
                      setErrors((current) => ({ ...current, customDate: undefined }));
                    }}
                    className={cn(
                      "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30",
                      errors.customDate ? "border-danger/60" : "border-white/10",
                    )}
                  >
                    {dateOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-background text-foreground">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <InlineError>{errors.customDate}</InlineError>
                </label>

                <label className="block space-y-2" htmlFor="go-custom-time">
                  <span className="text-sm font-medium text-foreground">Время</span>
                  <input
                    id="go-custom-time"
                    type="time"
                    value={customTime}
                    onChange={(event) => {
                      setCustomTime(event.target.value);
                      setErrors((current) => ({ ...current, customTime: undefined }));
                    }}
                    className={cn(
                      "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30",
                      errors.customTime ? "border-danger/60" : "border-white/10",
                    )}
                  />
                  <InlineError>{errors.customTime}</InlineError>
                </label>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-foreground">Услуга</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mockServices.map((service) => {
                const selected = service.id === selectedServiceId;

                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleServiceChange(service.id)}
                    className={cn(
                      "min-w-max rounded-2xl border px-4 py-3 text-left transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
                      selected
                        ? "border-[rgba(255,106,0,0.9)] bg-accent text-white shadow-[0_0_0_1px_rgba(255,106,0,0.2)]"
                        : "border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
                    )}
                  >
                    <span className="block text-sm font-semibold">{service.name}</span>
                    <span className={cn("mt-1 block text-xs", selected ? "text-white/85" : "text-muted")}>
                      {service.priceByn} BYN · {service.durationMinutes} мин
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-foreground">Мастер</h2>
            <div className="mt-4 space-y-2">
              {availableBarbers.length === 0 ? (
                <EmptyState
                  compact
                  title="Нет мастеров для услуги"
                  description="Выбери другую услугу или предложи время позже."
                />
              ) : availableBarbers.map((barber) => {
                const selected = barber.id === selectedBarberId;

                return (
                  <button
                    key={barber.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedBarberId(barber.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
                      selected
                        ? "border-[rgba(255,106,0,0.9)] bg-accent/15 shadow-[0_0_0_1px_rgba(255,106,0,0.2)]"
                        : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
                    )}
                  >
                    <Avatar fallback={barber.name} size="md" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">{barber.name}</span>
                      <span className="mt-1 block truncate text-sm text-muted">
                        {barber.specialization ?? barber.bio ?? "Мастер STRIGLO"}
                      </span>
                    </span>
                    <Badge variant={selected ? "accent" : "default"}>
                      {selected ? "Выбран" : "Свободен"}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-foreground">Контакты и адрес</h2>
            <div className="mt-4 space-y-4">
              <label className="block space-y-2" htmlFor="go-address">
                <span className="text-sm font-medium text-foreground">Адрес</span>
                <input
                  id="go-address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                    setErrors((current) => ({ ...current, address: undefined }));
                  }}
                  placeholder="ул. Центральная, 14"
                  className={cn(
                    "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-foreground outline-none placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                    errors.address ? "border-danger/60" : "border-white/10",
                  )}
                />
                <InlineError>{errors.address}</InlineError>
              </label>

              <label className="block space-y-2" htmlFor="go-name">
                <span className="text-sm font-medium text-foreground">Имя</span>
                <input
                  id="go-name"
                  value={customerName}
                  onChange={(event) => {
                    setCustomerName(event.target.value);
                    setErrors((current) => ({ ...current, customerName: undefined }));
                  }}
                  placeholder="Как к тебе обращаться?"
                  className={cn(
                    "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-foreground outline-none placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                    errors.customerName ? "border-danger/60" : "border-white/10",
                  )}
                />
                <InlineError>{errors.customerName}</InlineError>
              </label>

              <PhoneInput
                id="go-phone"
                value={phone}
                onChange={(nextPhone) => {
                  setPhone(nextPhone);
                  setErrors((current) => ({ ...current, phone: undefined }));
                }}
                error={errors.phone}
                description="На этот номер мастер свяжется для подтверждения."
              />
            </div>
          </Card>

          <Card padding="sm" className="rounded-[1.75rem]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-foreground">Заявка</h2>
                <p className="mt-1 text-sm text-muted">Проверь детали перед отправкой.</p>
              </div>
              <Badge variant="accent">GO</Badge>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <p className="text-foreground"><span className="text-muted">Выезд:</span> {goSummary}</p>
              <p className="text-foreground"><span className="text-muted">Услуга:</span> {selectedService?.name ?? "Не выбрана"}</p>
              <p className="text-foreground"><span className="text-muted">Мастер:</span> {selectedBarber?.name ?? "Не выбран"}</p>
              <p className="text-foreground"><span className="text-muted">Адрес:</span> {address.trim() || "Не указан"}</p>
              <p className="text-foreground"><span className="text-muted">Имя:</span> {customerName.trim() || "Не указано"}</p>
              <p className="text-foreground"><span className="text-muted">Телефон:</span> {phone.trim() || "Не указан"}</p>
            </div>
          </Card>

          <div className="sticky bottom-0 -mx-4 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-safe-offset-4 pt-4">
            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              {isSubmitting ? "Отправляем заявку" : "Отправить GO-заявку"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
