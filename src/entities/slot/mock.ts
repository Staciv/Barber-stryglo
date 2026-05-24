import type { Slot } from "./types";

function toDateValue(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function dateFromToday(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return toDateValue(date);
}

export function getMockSlots(): Slot[] {
  return [
    {
      id: "slot-today-1000-amir",
      date: dateFromToday(0),
      startTime: "10:00",
      endTime: "10:45",
      barberId: "amir",
      maxDurationMinutes: 45,
      isAvailable: true,
    },
    {
      id: "slot-today-1130-maks",
      date: dateFromToday(0),
      startTime: "11:30",
      endTime: "12:15",
      barberId: "maks",
      maxDurationMinutes: 45,
      isAvailable: false,
    },
    {
      id: "slot-today-1500-flex",
      date: dateFromToday(0),
      startTime: "15:00",
      endTime: "16:10",
      maxDurationMinutes: 70,
      isAvailable: true,
    },
    {
      id: "slot-tomorrow-1200-roma",
      date: dateFromToday(1),
      startTime: "12:00",
      endTime: "12:45",
      barberId: "roma",
      maxDurationMinutes: 45,
      isAvailable: true,
    },
    {
      id: "slot-tomorrow-1730-flex",
      date: dateFromToday(1),
      startTime: "17:30",
      endTime: "18:40",
      maxDurationMinutes: 70,
      isAvailable: true,
    },
    {
      id: "slot-plus-two-1030-amir",
      date: dateFromToday(2),
      startTime: "10:30",
      endTime: "11:15",
      barberId: "amir",
      maxDurationMinutes: 45,
      isAvailable: false,
    },
    {
      id: "slot-plus-three-1300-roma",
      date: dateFromToday(3),
      startTime: "13:00",
      endTime: "13:45",
      barberId: "roma",
      maxDurationMinutes: 45,
      isAvailable: true,
    },
  ];
}

export const mockSlots = getMockSlots();
