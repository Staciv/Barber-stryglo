"use client";

import { create } from "zustand";
import type { BookingRecord, BookingSelection, DayOption } from "@/types/booking";
import { createBookingRecord, getApproximateTimeSlot, parseVoiceTranscript } from "@/lib/booking";

type BookingStore = {
  selection: BookingSelection;
  completedBooking?: BookingRecord;
  setDay: (day: DayOption, customDate?: string) => void;
  setTime: (time: string) => void;
  setBarber: (barberId: string) => void;
  setService: (serviceId: string) => void;
  setDetails: (customerName: string, phone: string) => void;
  setRecommendedStyle: (styleId: string) => void;
  applyVoiceInput: (transcript: string) => string;
  confirmBooking: () => BookingRecord | null;
  resetSelection: () => void;
};

const initialSelection: BookingSelection = {};

export const useBookingStore = create<BookingStore>((set, get) => ({
  selection: initialSelection,
  completedBooking: undefined,
  setDay: (day, customDate) =>
    set((state) => ({
      selection: {
        ...state.selection,
        day,
        customDate: day === "custom" ? customDate : undefined,
        time: undefined,
        barberId: undefined,
        voiceSummary: undefined,
      },
    })),
  setTime: (time) =>
    set((state) => ({
      selection: {
        ...state.selection,
        time,
        barberId: undefined,
      },
    })),
  setBarber: (barberId) =>
    set((state) => ({
      selection: {
        ...state.selection,
        barberId,
      },
    })),
  setService: (serviceId) =>
    set((state) => ({
      selection: {
        ...state.selection,
        serviceId,
      },
    })),
  setDetails: (customerName, phone) =>
    set((state) => ({
      selection: {
        ...state.selection,
        customerName,
        phone,
      },
    })),
  setRecommendedStyle: (styleId) =>
    set((state) => ({
      selection: {
        ...state.selection,
        recommendedStyleId: styleId,
      },
    })),
  applyVoiceInput: (transcript) => {
    const parsed = parseVoiceTranscript(transcript);
    set((state) => ({
      selection: {
        ...state.selection,
        day: parsed.day,
        time: getApproximateTimeSlot(parsed.timePeriod),
        serviceId: parsed.serviceId,
        voiceSummary: parsed.summary,
      },
    }));
    return parsed.summary;
  },
  confirmBooking: () => {
    const record = createBookingRecord(get().selection);

    if (!record) {
      return null;
    }

    set({
      completedBooking: record,
    });

    return record;
  },
  resetSelection: () =>
    set({
      selection: initialSelection,
      completedBooking: undefined,
    }),
}));
