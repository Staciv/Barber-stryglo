import { beforeEach, describe, expect, it } from "vitest";
import type { Slot } from "@/entities/slot/types";
import { useBookingDraftStore } from "./booking-draft-store";

const slot: Slot = {
  id: "slot-1",
  date: "2026-05-24",
  startTime: "10:00",
  endTime: "10:45",
  barberId: "amir",
  isAvailable: true,
  maxDurationMinutes: 45,
};

describe("booking draft store", () => {
  beforeEach(() => {
    useBookingDraftStore.getState().resetDraft();
  });

  it("starts with default booking draft state", () => {
    expect(useBookingDraftStore.getState()).toMatchObject({
      selectedSlot: undefined,
      selectedBarberId: undefined,
      selectedServiceId: "cut",
      contactPhone: "",
      isContactPhoneVerified: false,
    });
  });

  it("sets service, slot and barber", () => {
    useBookingDraftStore.getState().setService("beard");
    useBookingDraftStore.getState().setSlot(slot);
    useBookingDraftStore.getState().setBarber("amir");

    expect(useBookingDraftStore.getState().selectedServiceId).toBe("beard");
    expect(useBookingDraftStore.getState().selectedSlot).toEqual(slot);
    expect(useBookingDraftStore.getState().selectedBarberId).toBe("amir");
  });

  it("resets invalid slot and barber when service changes", () => {
    useBookingDraftStore.getState().setSlot(slot);
    useBookingDraftStore.getState().setBarber("amir");

    useBookingDraftStore.getState().setService("cut-beard");

    expect(useBookingDraftStore.getState().selectedServiceId).toBe("cut-beard");
    expect(useBookingDraftStore.getState().selectedSlot).toBeUndefined();
    expect(useBookingDraftStore.getState().selectedBarberId).toBeUndefined();
  });

  it("can reset the draft", () => {
    useBookingDraftStore.getState().setService("beard");
    useBookingDraftStore.getState().setSlot(slot);
    useBookingDraftStore.getState().setBarber("amir");

    useBookingDraftStore.getState().resetDraft();

    expect(useBookingDraftStore.getState()).toMatchObject({
      selectedSlot: undefined,
      selectedBarberId: undefined,
      selectedServiceId: "cut",
      contactPhone: "",
      isContactPhoneVerified: false,
    });
  });

  it("stores booking contact phone and verification state", () => {
    useBookingDraftStore.getState().setContactPhone("+375291234567", true);

    expect(useBookingDraftStore.getState()).toMatchObject({
      contactPhone: "+375291234567",
      isContactPhoneVerified: true,
    });

    useBookingDraftStore.getState().setContactPhone("+375331234567");

    expect(useBookingDraftStore.getState()).toMatchObject({
      contactPhone: "+375331234567",
      isContactPhoneVerified: false,
    });
  });
});
