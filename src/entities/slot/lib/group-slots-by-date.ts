import type { Slot, SlotsByDate } from "../types";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

function toSortableDate(value: string) {
  const timestamp = new Date(`${value}T00:00:00`).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

function formatDateLabel(value: string) {
  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return dateFormatter.format(parsedDate).replace(".", "");
}

type GroupSlotsOptions = {
  limit?: number;
  availableOnly?: boolean;
};

export function groupSlotsByDate(
  slots: Slot[],
  { limit = 4, availableOnly = false }: GroupSlotsOptions = {},
): SlotsByDate[] {
  const slotsByDate = new Map<string, Slot[]>();
  const filteredSlots = availableOnly ? slots.filter((slot) => slot.isAvailable) : slots;

  for (const slot of filteredSlots) {
    const daySlots = slotsByDate.get(slot.date) ?? [];
    daySlots.push(slot);
    slotsByDate.set(slot.date, daySlots);
  }

  return Array.from(slotsByDate.entries())
    .sort(([dateA], [dateB]) => toSortableDate(dateA) - toSortableDate(dateB))
    .slice(0, limit)
    .map(([date, daySlots]) => ({
      date,
      label: formatDateLabel(date),
      slots: daySlots
        .slice()
        .sort((slotA, slotB) => slotA.startTime.localeCompare(slotB.startTime)),
    }));
}
