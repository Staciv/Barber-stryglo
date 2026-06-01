import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";

export type BookingRepository = {
  getBookableServices: () => Promise<Service[]>;
  getBookableBarbers: () => Promise<BarberProfile[]>;
};
