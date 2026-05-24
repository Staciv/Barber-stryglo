import { bookingSteps } from "@/lib/booking";
import type { BookingStep } from "@/types/booking";
import { cn } from "@/lib/utils";

export function BookingProgress({ currentStep }: { currentStep: BookingStep }) {
  const currentIndex = bookingSteps.indexOf(currentStep);

  return (
    <div className="grid grid-cols-5 gap-2" aria-label="Прогресс бронирования">
      {bookingSteps.map((step, index) => (
        <div
          key={step}
          className={cn(
            "h-1.5 rounded-full bg-white/8 transition-colors duration-300",
            index <= currentIndex && "bg-accent shadow-[0_0_18px_rgba(255,107,0,0.35)]",
          )}
        />
      ))}
    </div>
  );
}
