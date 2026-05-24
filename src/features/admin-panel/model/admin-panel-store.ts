"use client";

import { create } from "zustand";
import {
  mockAdminAssignments,
  mockAdminAvailability,
  mockAdminBarbers,
  mockAdminBookings,
  mockAdminServices,
} from "./mock-admin-data";
import { hasDuplicateAssignment } from "../lib/admin-validation";
import type {
  AdminAvailability,
  AdminBarber,
  AdminBarberService,
  AdminBooking,
  AdminService,
  CreateAdminAvailabilityInput,
  CreateAdminBarberInput,
  CreateAdminServiceInput,
} from "./types";

type AssignmentResult = {
  ok: boolean;
  error?: string;
};

type AdminPanelState = {
  barbers: AdminBarber[];
  services: AdminService[];
  assignments: AdminBarberService[];
  availability: AdminAvailability[];
  bookings: AdminBooking[];
  createBarber: (input: CreateAdminBarberInput) => void;
  createService: (input: CreateAdminServiceInput) => void;
  assignServiceToBarber: (barberId: string, serviceId: string) => AssignmentResult;
  createAvailability: (input: CreateAdminAvailabilityInput) => void;
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export const useAdminPanelStore = create<AdminPanelState>()((set, get) => ({
  barbers: mockAdminBarbers,
  services: mockAdminServices,
  assignments: mockAdminAssignments,
  availability: mockAdminAvailability,
  bookings: mockAdminBookings,
  createBarber: (input) =>
    set((state) => ({
      barbers: [
        {
          ...input,
          id: createId("barber"),
        },
        ...state.barbers,
      ],
    })),
  createService: (input) =>
    set((state) => ({
      services: [
        {
          ...input,
          id: createId("service"),
        },
        ...state.services,
      ],
    })),
  assignServiceToBarber: (barberId, serviceId) => {
    const { assignments, barbers, services } = get();

    if (!barbers.some((barber) => barber.id === barberId)) {
      return { ok: false, error: "Выбери существующего мастера" };
    }

    if (!services.some((service) => service.id === serviceId)) {
      return { ok: false, error: "Выбери существующую услугу" };
    }

    if (hasDuplicateAssignment(assignments, barberId, serviceId)) {
      return { ok: false, error: "Эта услуга уже назначена мастеру" };
    }

    set((state) => ({
      assignments: [
        {
          id: createId("assignment"),
          barberId,
          serviceId,
        },
        ...state.assignments,
      ],
    }));

    return { ok: true };
  },
  createAvailability: (input) =>
    set((state) => ({
      availability: [
        {
          ...input,
          id: createId("availability"),
        },
        ...state.availability,
      ],
    })),
}));
