"use client";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/booking-store";
import type { DayOption } from "@/types/booking";

export function useBookingActions() {
  const router = useRouter();
  const setDay = useBookingStore((state) => state.setDay);
  const setRecommendedStyle = useBookingStore((state) => state.setRecommendedStyle);
  const applyVoiceInput = useBookingStore((state) => state.applyVoiceInput);
  const resetSelection = useBookingStore((state) => state.resetSelection);

  const startBookingWithDay = (day: DayOption) => {
    if (day === "custom") {
      resetSelection();
      router.push("/booking?pickDate=1");
      return;
    }

    setDay(day);
    router.push("/booking");
  };

  const startBookingWithStyle = (styleId: string) => {
    setRecommendedStyle(styleId);
    router.push("/booking");
  };

  const startVoiceBooking = (transcript: string) => {
    applyVoiceInput(transcript);
    router.push("/booking");
  };

  return {
    startBookingWithDay,
    startBookingWithStyle,
    startVoiceBooking,
  };
}
