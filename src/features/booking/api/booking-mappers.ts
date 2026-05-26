import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import type { Barber as BarberRow, Service as ServiceRow } from "@/shared/types/database";

export function mapServiceRowToService(row: Partial<ServiceRow>): Service {
  return {
    id: row.id ?? "",
    name: row.title ?? "Service",
    durationMinutes: row.duration_minutes ?? 0,
    priceByn: (row.price ?? 0) / 100,
  };
}

export function mapServiceRowsToServices(rows: Partial<ServiceRow>[]): Service[] {
  return rows.map(mapServiceRowToService);
}

export function mapBarberRowToBarberProfile(row: Partial<BarberRow>): BarberProfile {
  return {
    id: row.id ?? "",
    name: row.name ?? "Barber",
    bio: row.bio ?? undefined,
    specialization: undefined,
    // serviceIds are composed from barber_services in the repository layer later.
    serviceIds: [],
    isActive: row.is_active ?? false,
  };
}

export function mapBarberRowsToBarberProfiles(rows: Partial<BarberRow>[]): BarberProfile[] {
  return rows.map(mapBarberRowToBarberProfile);
}
