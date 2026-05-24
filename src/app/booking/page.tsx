"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { mockBarbers } from "@/entities/barber/mock";
import type { BarberProfile } from "@/entities/barber/types";
import { mockServices } from "@/entities/service/mock";
import { mockSlots } from "@/entities/slot/mock";
import { groupSlotsByDate } from "@/entities/slot/lib/group-slots-by-date";
import { getAvailableBarbersForSelection } from "@/features/booking/lib/get-available-barbers";
import { useBookingDraftStore } from "@/features/booking/model/booking-draft-store";
import { SlotSelector } from "@/features/booking/ui/slot-selector";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

const slotGroups = groupSlotsByDate(mockSlots, { limit: 4 });

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
  const selectedSlot = useBookingDraftStore((state) => state.selectedSlot);
  const selectedBarberId = useBookingDraftStore((state) => state.selectedBarberId);
  const selectedServiceId = useBookingDraftStore((state) => state.selectedServiceId);
  const setSlot = useBookingDraftStore((state) => state.setSlot);
  const setBarber = useBookingDraftStore((state) => state.setBarber);
  const setService = useBookingDraftStore((state) => state.setService);
  const selectedService = mockServices.find((service) => service.id === selectedServiceId);

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

  useEffect(() => {
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
  }, [availableBarbers, selectedBarberId, setBarber]);

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
              <span className="text-xs text-muted">цены в BYN</span>
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
                      "min-w-max rounded-2xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
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
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
              Мастера появятся после выбора свободного времени.
            </div>
          )}

          {selectedSlot && availableBarbers.length === 0 && (
            <div className="rounded-3xl border border-dashed border-danger/30 bg-danger/10 p-4 text-sm text-foreground">
              На это время нет доступного мастера. Выбери другой слот.
            </div>
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

        <div className="mt-auto pb-safe-offset-4 pt-5">
          <Card padding="sm" className="rounded-[1.75rem]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted">Выбрано</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {selectedSlot ? `${selectedSlot.startTime} · ${selectedSlot.date}` : "Слот не выбран"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {selectedBarber ? selectedBarber.name : "Мастер не выбран"}
                </p>
              </div>
              <Button size="sm" disabled={!canContinue}>
                Продолжить
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
