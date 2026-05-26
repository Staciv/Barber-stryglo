import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import { getBarbers, getBarberServices, getServices } from "./booking-api";
import { mapBarberRowsToBarberProfiles, mapServiceRowsToServices } from "./booking-mappers";

export async function getBookableServices(): Promise<Service[]> {
  const rows = await getServices();
  return mapServiceRowsToServices(rows);
}

export async function getBookableBarbers(): Promise<BarberProfile[]> {
  const [barberRows, barberServiceRows] = await Promise.all([
    getBarbers(),
    getBarberServices(),
  ]);
  const serviceIdsByBarberId = new Map<string, string[]>();

  for (const relation of barberServiceRows) {
    const currentServiceIds = serviceIdsByBarberId.get(relation.barber_id) ?? [];
    currentServiceIds.push(relation.service_id);
    serviceIdsByBarberId.set(relation.barber_id, currentServiceIds);
  }

  return mapBarberRowsToBarberProfiles(barberRows).map((barber) => ({
    ...barber,
    serviceIds: serviceIdsByBarberId.get(barber.id) ?? [],
  }));
}
