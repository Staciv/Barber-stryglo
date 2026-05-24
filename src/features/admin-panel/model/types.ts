import type { BookingStatus, BookingType } from "@/shared/types/database";

export type AdminBarber = {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  isActive: boolean;
};

export type AdminService = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceByn: number;
  isActive: boolean;
};

export type AdminBarberService = {
  id: string;
  barberId: string;
  serviceId: string;
};

export type AdminAvailability = {
  id: string;
  barberId: string;
  weekday: number;
  startTime: string;
  endTime: string;
  isGoAvailable: boolean;
};

export type AdminBooking = {
  id: string;
  userName: string;
  barberId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  type: BookingType;
};

export type CreateAdminBarberInput = Omit<AdminBarber, "id">;
export type CreateAdminServiceInput = Omit<AdminService, "id">;
export type CreateAdminAvailabilityInput = Omit<AdminAvailability, "id">;
