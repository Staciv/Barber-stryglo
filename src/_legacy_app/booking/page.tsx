import { Suspense } from "react";
import { BookingFlowEntry } from "@/features/booking/booking-flow-entry";

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingFlowEntryFallback />}>
      <BookingFlowEntry />
    </Suspense>
  );
}

function BookingFlowEntryFallback() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-6 pt-5">
      <div className="rounded-[32px] border border-white/10 bg-panel p-6 shadow-card">
        <p className="text-sm text-muted">Загружаем запись...</p>
      </div>
    </main>
  );
}
