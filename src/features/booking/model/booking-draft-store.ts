"use client";

import { create } from "zustand";
import type { Slot } from "@/entities/slot/types";

type BookingDraftState = {
  selectedSlot?: Slot;
  selectedBarberId?: string;
  selectedServiceId: string;
  setSlot: (slot: Slot) => void;
  setBarber: (barberId?: string) => void;
  setService: (serviceId: string) => void;
  clearSlot: () => void;
  resetDraft: () => void;
};

export const useBookingDraftStore = create<BookingDraftState>((set) => ({
  selectedSlot: undefined,
  selectedBarberId: undefined,
  selectedServiceId: "cut",
  setSlot: (slot) => set({ selectedSlot: slot, selectedBarberId: undefined }),
  setBarber: (barberId) => set({ selectedBarberId: barberId }),
  setService: (serviceId) =>
    set({ selectedServiceId: serviceId, selectedSlot: undefined, selectedBarberId: undefined }),
  clearSlot: () => set({ selectedSlot: undefined, selectedBarberId: undefined }),
  resetDraft: () =>
    set({ selectedSlot: undefined, selectedBarberId: undefined, selectedServiceId: "cut" }),
}));
