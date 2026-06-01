import { mockBarbers } from "@/entities/barber/mock";
import { mockServices } from "@/entities/service/mock";
import type { BookingRepository } from "./booking-repository.types";

export const mockBookingRepository: BookingRepository = {
  async getBookableServices() {
    return mockServices.map((service) => ({ ...service }));
  },

  async getBookableBarbers() {
    return mockBarbers.map((barber) => ({
      ...barber,
      serviceIds: [...barber.serviceIds],
    }));
  },
};
