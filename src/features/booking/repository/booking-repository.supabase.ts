import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import {
  mapBarberRowsToBarberProfiles,
  mapServiceRowsToServices,
} from "@/features/booking/api/booking-mappers";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase/client";
import type { BarberService } from "@/shared/types/database";
import type { BookingRepository } from "./booking-repository.types";

function assertNoSupabaseError(error: unknown, message: string) {
  if (!error) {
    return;
  }

  const details = error instanceof Error ? error.message : String(error);
  throw new Error(`${message}: ${details}`);
}

function composeBarberServiceIds(
  barbers: BarberProfile[],
  relations: BarberService[],
): BarberProfile[] {
  const serviceIdsByBarberId = new Map<string, string[]>();

  for (const relation of relations) {
    const serviceIds = serviceIdsByBarberId.get(relation.barber_id) ?? [];
    serviceIds.push(relation.service_id);
    serviceIdsByBarberId.set(relation.barber_id, serviceIds);
  }

  return barbers.map((barber) => ({
    ...barber,
    serviceIds: serviceIdsByBarberId.get(barber.id) ?? [],
  }));
}

export const supabaseBookingRepository: BookingRepository = {
  async getBookableServices(): Promise<Service[]> {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("services")
      .select("id,title,description,duration_minutes,price,is_active")
      .eq("is_active", true)
      .order("title", { ascending: true });

    assertNoSupabaseError(error, "Failed to load bookable services");

    return mapServiceRowsToServices(data ?? []);
  },

  async getBookableBarbers(): Promise<BarberProfile[]> {
    const supabase = getSupabaseBrowserClient();
    const [barbersResult, barberServicesResult] = await Promise.all([
      supabase
        .from("barbers")
        .select("id,user_id,name,avatar_url,bio,is_active,created_at")
        .eq("is_active", true)
        .order("name", { ascending: true }),
      supabase
        .from("barber_services")
        .select("id,barber_id,service_id"),
    ]);

    assertNoSupabaseError(barbersResult.error, "Failed to load bookable barbers");
    assertNoSupabaseError(
      barberServicesResult.error,
      "Failed to load barber service assignments",
    );

    return composeBarberServiceIds(
      mapBarberRowsToBarberProfiles(barbersResult.data ?? []),
      barberServicesResult.data ?? [],
    );
  },
};
