import { bookingSteps } from "@/lib/booking";
import type { BookingStep } from "@/types/booking";
import { cn } from "@/lib/utils";

export function BookingProgress({ currentStep }: { currentStep: BookingStep }) {
  const currentIndex = bookingSteps.indexOf(currentStep);

  return (
    <div className="flex items-center gap-2" aria-label="Прогресс бронирования">
      {bookingSteps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step} className="relative flex-1">
            {/* Progress bar */}
            <div
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                isCompleted
                  ? "bg-accent shadow-[0_0_12px_rgba(255,107,0,0.4)]"
                  : isCurrent
                    ? "bg-gradient-to-r from-accent to-accent/50"
                    : "bg-white/[0.06]"
              )}
            />

            {/* Active indicator glow */}
            {isCurrent && (
              <div className="absolute -right-0.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(255,107,0,0.6)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
