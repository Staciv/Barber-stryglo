import { barbers, mockedVoiceResults, services } from "@/data/mock";
import type {
  Barber,
  BookingRecord,
  BookingSelection,
  BookingStep,
  DayOption,
  TimePeriod,
  VoiceParseResult,
} from "@/types/booking";
import { z } from "zod";

export const bookingSteps: BookingStep[] = ["day", "time", "barber", "service", "details"];
const russianDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

export const bookingDetailsSchema = z.object({
  customerName: z.string().trim().min(2, "Введите имя"),
  phone: z
    .string()
    .trim()
    .min(8, "Введите телефон")
    .regex(/^[+\d\s()-]+$/, "Неверный формат телефона"),
});

export function toDateInputValue(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

export function getTodayDateValue() {
  return toDateInputValue(new Date());
}

export function getTomorrowDateValue() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toDateInputValue(tomorrow);
}

export function formatHumanDate(dateValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return russianDateFormatter.format(parsedDate);
}

export function getNextStep(selection: BookingSelection): BookingStep {
  if (!selection.day) {
    return "day";
  }

  if (!selection.time) {
    return "time";
  }

  const availableBarbers = getAvailableBarbers(selection.time);

  if (!selection.barberId || !availableBarbers.some((barber) => barber.id === selection.barberId)) {
    return "barber";
  }

  if (!selection.serviceId || !services.some((service) => service.id === selection.serviceId)) {
    return "service";
  }

  return "details";
}

export function getAvailableBarbers(time?: string): Barber[] {
  if (!time) {
    return [];
  }

  return barbers.filter((barber) => barber.availableSlots.includes(time));
}

export function getTimeLabel(time: string) {
  return `${time} · свободно`;
}

export function getDayLabel(day: DayOption, customDate?: string) {
  if (day === "today") {
    return `Сегодня · ${formatHumanDate(getTodayDateValue())}`;
  }

  if (day === "tomorrow") {
    return `Завтра · ${formatHumanDate(getTomorrowDateValue())}`;
  }

  return customDate ? `Дата · ${formatHumanDate(customDate)}` : "Своя дата";
}

export function getApproximateTimeSlot(period?: TimePeriod) {
  if (period === "morning") {
    return "10:00";
  }

  if (period === "day") {
    return "13:30";
  }

  if (period === "evening") {
    return "18:00";
  }

  return undefined;
}

export function parseVoiceTranscript(transcript: string): VoiceParseResult {
  const normalized = transcript.toLowerCase();
  const directMatch = mockedVoiceResults.find(
    (entry) => entry.transcript.toLowerCase() === normalized.trim(),
  );

  if (directMatch) {
    return directMatch;
  }

  const day: DayOption = normalized.includes("завтра") ? "tomorrow" : "today";
  const timePeriod: TimePeriod | undefined = normalized.includes("веч")
    ? "evening"
    : normalized.includes("утр")
      ? "morning"
      : normalized.includes("дн")
        ? "day"
        : undefined;
  const serviceId = normalized.includes("бород") && normalized.includes("стриж")
    ? "cut-beard"
    : normalized.includes("бород")
      ? "beard"
      : "cut";

  const serviceName = services.find((service) => service.id === serviceId)?.name.toLowerCase() ?? "стрижка";
  const periodLabel =
    timePeriod === "morning" ? "утро" : timePeriod === "day" ? "день" : timePeriod === "evening" ? "вечер" : "любое время";

  return {
    transcript,
    day,
    timePeriod,
    serviceId,
    summary: `Понял: ${day === "tomorrow" ? "завтра" : "сегодня"}, ${periodLabel}, ${serviceName}`,
  };
}

export function validateBookingDetails(input: Pick<BookingSelection, "customerName" | "phone">) {
  return bookingDetailsSchema.safeParse(input);
}

export function createBookingRecord(selection: BookingSelection): BookingRecord | null {
  if (
    !selection.day ||
    !selection.time ||
    !selection.barberId ||
    !selection.serviceId ||
    !selection.customerName ||
    !selection.phone
  ) {
    return null;
  }

  if (selection.day === "custom" && !selection.customDate) {
    return null;
  }

  if (!getAvailableBarbers(selection.time).some((barber) => barber.id === selection.barberId)) {
    return null;
  }

  if (!services.some((service) => service.id === selection.serviceId)) {
    return null;
  }

  return {
    day: selection.day,
    customDate: selection.customDate,
    time: selection.time,
    barberId: selection.barberId,
    serviceId: selection.serviceId,
    customerName: selection.customerName,
    phone: selection.phone,
    recommendedStyleId: selection.recommendedStyleId,
    voiceSummary: selection.voiceSummary,
    createdAt: new Date().toISOString(),
  };
}
