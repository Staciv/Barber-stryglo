"use client";

import { useSearchParams } from "next/navigation";
import { BookingFlow } from "@/features/booking/booking-flow";

export function BookingFlowEntry() {
  const searchParams = useSearchParams();
  const pickDateValue = searchParams.getAll("pickDate");
  const openDatePicker = pickDateValue.includes("1");

  return <BookingFlow openDatePicker={openDatePicker} />;
}
