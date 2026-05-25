"use client";

import { create } from "zustand";
import type { Slot } from "@/entities/slot/types";

type BookingDraftState = {
  selectedSlot?: Slot;
  selectedBarberId?: string;
  selectedServiceId: string;
  contactPhone: string;
  isContactPhoneVerified: boolean;
  setSlot: (slot: Slot) => void;
  setBarber: (barberId?: string) => void;
  setService: (serviceId: string) => void;
  setContactPhone: (phone: string, verified?: boolean) => void;
  setContactPhoneVerified: (verified: boolean) => void;
  clearSlot: () => void;
  resetDraft: () => void;
};

export const useBookingDraftStore = create<BookingDraftState>((set) => ({
  selectedSlot: undefined,
  selectedBarberId: undefined,
  selectedServiceId: "cut",
  contactPhone: "",
  isContactPhoneVerified: false,
  setSlot: (slot) => set({ selectedSlot: slot, selectedBarberId: undefined }),
  setBarber: (barberId) => set({ selectedBarberId: barberId }),
  setService: (serviceId) =>
    set({ selectedServiceId: serviceId, selectedSlot: undefined, selectedBarberId: undefined }),
  setContactPhone: (phone, verified = false) =>
    set({ contactPhone: phone, isContactPhoneVerified: verified }),
  setContactPhoneVerified: (verified) => set({ isContactPhoneVerified: verified }),
  clearSlot: () => set({ selectedSlot: undefined, selectedBarberId: undefined }),
  resetDraft: () =>
    set({
      selectedSlot: undefined,
      selectedBarberId: undefined,
      selectedServiceId: "cut",
      contactPhone: "",
      isContactPhoneVerified: false,
    }),
}));
