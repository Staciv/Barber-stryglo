"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EmptyState as SharedEmptyState } from "@/shared/ui/empty-state";
import { cn } from "@/shared/lib/utils";
import type { Slot, SlotsByDate } from "@/entities/slot/types";

export type SlotSelectorProps = {
  groups: SlotsByDate[];
  selectedSlotId?: string;
  onSelectSlot: (slot: Slot) => void;
  className?: string;
};

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <SharedEmptyState compact title={String(children)} description="Проверь другую услугу или вернись чуть позже." />
  );
}

export function SlotSelector({
  groups,
  selectedSlotId,
  onSelectSlot,
  className,
}: SlotSelectorProps) {
  const visibleGroups = groups.slice(0, 4);
  const hasAnyAvailableSlot = visibleGroups.some((group) =>
    group.slots.some((slot) => slot.isAvailable),
  );

  if (visibleGroups.length === 0) {
    return (
      <div className={cn("space-y-3", className)}>
        <EmptyState>Свободных слотов нет</EmptyState>
      </div>
    );
  }

  if (!hasAnyAvailableSlot) {
    return (
      <div className={cn("space-y-3", className)}>
        <EmptyState>Свободных слотов нет</EmptyState>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visibleGroups.map((group) => {
          const availableSlots = group.slots.filter((slot) => slot.isAvailable);

          return (
            <section
              key={group.date}
              aria-labelledby={`slot-day-${group.date}`}
              className="min-w-[78%] snap-start rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-inset sm:min-w-[15rem]"
            >
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <h2 id={`slot-day-${group.date}`} className="text-sm font-semibold text-foreground">
                    {group.label}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">
                    {availableSlots.length > 0 ? `${availableSlots.length} свободно` : "Нет мест"}
                  </p>
                </div>
                <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent">
                  {group.date.slice(5)}
                </span>
              </div>

              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => {
                    const selected = slot.id === selectedSlotId;

                    return (
                      <motion.button
                        key={slot.id}
                        type="button"
                        aria-pressed={selected}
                        aria-label={`Выбрать слот ${slot.startTime} на ${group.label}`}
                        whileTap={{ scale: 0.97 }}
                        layout
                        onClick={() => onSelectSlot(slot)}
                        className={cn(
                          "relative min-h-16 rounded-2xl border px-3 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          selected
                            ? "border-accent bg-accent text-white shadow-glow after:absolute after:right-3 after:top-3 after:size-2 after:rounded-full after:bg-white"
                            : "border-white/10 bg-black/20 text-foreground hover:border-white/20 hover:bg-white/10",
                        )}
                      >
                        <span className="block text-lg font-black leading-none">
                          {slot.startTime}
                        </span>
                        <span className={cn("mt-1 block text-xs", selected ? "text-white/85" : "text-muted")}>
                          {selected ? "Выбрано" : `до ${slot.endTime}`}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <EmptyState>На этот день свободных слотов нет</EmptyState>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
