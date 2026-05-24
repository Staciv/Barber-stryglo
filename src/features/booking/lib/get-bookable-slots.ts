import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import type { Slot } from "@/entities/slot/types";

export function getBookableSlots({
  slots,
  service,
  barbers,
}: {
  slots: Slot[];
  service?: Service;
  barbers: BarberProfile[];
}) {
  if (!service) {
    return [];
  }

  return slots.filter((slot) => {
    if (!slot.isAvailable || slot.maxDurationMinutes < service.durationMinutes) {
      return false;
    }

    if (!slot.barberId) {
      return barbers.some(
        (barber) => barber.isActive && barber.serviceIds.includes(service.id),
      );
    }

    return barbers.some(
      (barber) =>
        barber.id === slot.barberId &&
        barber.isActive &&
        barber.serviceIds.includes(service.id),
    );
  });
}
