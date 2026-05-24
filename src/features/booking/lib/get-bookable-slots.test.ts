import { describe, expect, it } from "vitest";
import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import type { Slot } from "@/entities/slot/types";
import { getBookableSlots } from "./get-bookable-slots";

const services: Record<string, Service> = {
  cut: { id: "cut", name: "Стрижка", durationMinutes: 45, priceByn: 45 },
  combo: { id: "combo", name: "Стрижка + борода", durationMinutes: 70, priceByn: 70 },
};

const barbers: BarberProfile[] = [
  { id: "active-cut", name: "Амир", serviceIds: ["cut"], isActive: true },
  { id: "inactive-cut", name: "Макс", serviceIds: ["cut"], isActive: false },
  { id: "combo", name: "Рома", serviceIds: ["combo"], isActive: true },
];

const slots: Slot[] = [
  {
    id: "available-valid",
    date: "2099-01-01",
    startTime: "10:00",
    endTime: "10:45",
    barberId: "active-cut",
    maxDurationMinutes: 45,
    isAvailable: true,
  },
  {
    id: "unavailable",
    date: "2099-01-01",
    startTime: "11:00",
    endTime: "11:45",
    barberId: "active-cut",
    maxDurationMinutes: 45,
    isAvailable: false,
  },
  {
    id: "missing-barber",
    date: "2099-01-01",
    startTime: "12:00",
    endTime: "12:45",
    barberId: "missing",
    maxDurationMinutes: 45,
    isAvailable: true,
  },
  {
    id: "inactive-barber",
    date: "2099-01-01",
    startTime: "13:00",
    endTime: "13:45",
    barberId: "inactive-cut",
    maxDurationMinutes: 45,
    isAvailable: true,
  },
  {
    id: "too-short",
    date: "2099-01-01",
    startTime: "14:00",
    endTime: "14:45",
    barberId: "combo",
    maxDurationMinutes: 45,
    isAvailable: true,
  },
];

describe("getBookableSlots", () => {
  it("hides unavailable, missing-barber and inactive-barber slots", () => {
    expect(getBookableSlots({ slots, service: services.cut, barbers }).map((slot) => slot.id)).toEqual([
      "available-valid",
    ]);
  });

  it("hides slots that are too short for the selected service", () => {
    expect(getBookableSlots({ slots, service: services.combo, barbers })).toEqual([]);
  });
});
