"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingStatus, BookingType } from "@/shared/types/database";

export type MockAppointment = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  barberId: string;
  barberName: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  phone: string;
  status: BookingStatus;
  type: BookingType;
  createdAt: string;
};

type AppointmentState = {
  appointments: MockAppointment[];
  lastAppointmentId?: string;
  createAppointment: (input: Omit<MockAppointment, "id" | "createdAt">) => MockAppointment;
  cancelAppointment: (appointmentId: string) => void;
  clearAppointments: () => void;
};

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: [],
      lastAppointmentId: undefined,
      createAppointment: (input) => {
        const appointment: MockAppointment = {
          ...input,
          id: `mock-appointment-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };

        set({
          appointments: [appointment, ...get().appointments],
          lastAppointmentId: appointment.id,
        });

        return appointment;
      },
      cancelAppointment: (appointmentId) =>
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: "cancelled" }
              : appointment,
          ),
        })),
      clearAppointments: () => set({ appointments: [], lastAppointmentId: undefined }),
    }),
    {
      name: "striglo-mock-appointments",
    },
  ),
);
