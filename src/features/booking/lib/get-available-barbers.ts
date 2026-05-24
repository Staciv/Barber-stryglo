import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import type { Slot } from "@/entities/slot/types";

type GetAvailableBarbersParams = {
  selectedSlot?: Slot;
  selectedService?: Service;
  barbers: BarberProfile[];
};

function supportsService(barber: BarberProfile, selectedService?: Service) {
  if (!selectedService) {
    return true;
  }

  return barber.serviceIds.includes(selectedService.id);
}

export function getAvailableBarbersForSelection({
  selectedSlot,
  selectedService,
  barbers,
}: GetAvailableBarbersParams) {
  if (!selectedSlot) {
    return [];
  }

  if (selectedSlot.barberId) {
    return barbers.filter(
      (barber) =>
        barber.id === selectedSlot.barberId &&
        barber.isActive &&
        supportsService(barber, selectedService),
    );
  }

  return barbers.filter(
    (barber) => barber.isActive && supportsService(barber, selectedService),
  );
}
