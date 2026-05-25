"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { mockBarbers } from "@/entities/barber/mock";
import { mockServices } from "@/entities/service/mock";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { InlineError } from "@/shared/ui/inline-error";
import { isValidBelarusPhone } from "@/shared/lib/belarus-phone";
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
  customTime?: string;
};

const goWindows: GoWindow[] = [
  { id: "evening-today", label: "Сегодня вечером", date: "сегодня", time: "19:30" },
  { id: "tomorrow-day", label: "Завтра днём", date: "завтра", time: "14:00" },
  { id: "tomorrow-evening", label: "Завтра вечером", date: "завтра", time: "20:00" },
];

export default function GoPage() {
  const [selectedWindowId, setSelectedWindowId] = useState(goWindows[0].id);
  const [useCustomTime, setUseCustomTime] = useState(false);
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
      customerName: customerName.trim().length < 2 ? "Введите имя" : undefined,
      phone: !phone.trim()
        ? "Введите телефон"
        : !isValidBelarusPhone(phone)
          ? "Введи белорусский номер: +375 29 123 45 67"
          : undefined,
      customTime: useCustomTime && !customTime ? "Выбери время" : undefined,
    };

    setErrors(nextErrors);

    if (nextErrors.address || nextErrors.customerName || nextErrors.phone || nextErrors.customTime) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
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
              {useCustomTime ? "Своё время" : selectedWindow.label} · {useCustomTime ? customTime : selectedWindow.time}
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
                <h2 className="text-lg font-semibold text-foreground">Окно выезда</h2>
                <p className="mt-1 text-sm text-muted">Плановое окно или своё время.</p>
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
                        ? "border-accent bg-accent text-white shadow-glow"
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
                  ? "border-accent bg-accent/15 text-foreground shadow-glow"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
              )}
            >
              <span className="block text-sm font-semibold">Предложить своё время</span>
              <span className="mt-1 block text-xs text-muted">Мастер подтвердит или предложит другое.</span>
            </button>

            {useCustomTime && (
              <label className="mt-3 block space-y-2" htmlFor="go-custom-time">
                <span className="text-sm font-medium text-foreground">Своё время</span>
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
                        ? "border-accent bg-accent text-white shadow-glow"
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
                        ? "border-accent bg-accent/15 shadow-glow"
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

              <label className="block space-y-2" htmlFor="go-phone">
                <span className="text-sm font-medium text-foreground">Телефон</span>
                <input
                  id="go-phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setErrors((current) => ({ ...current, phone: undefined }));
                  }}
                  placeholder="+375 29 123 45 67"
                  className={cn(
                    "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-foreground outline-none placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                    errors.phone ? "border-danger/60" : "border-white/10",
                  )}
                />
                <InlineError>{errors.phone}</InlineError>
              </label>
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
