import { beforeEach, describe, expect, it } from "vitest";
import { useAppointmentStore } from "./appointment-store";

describe("appointment store", () => {
  beforeEach(() => {
    localStorage.clear();
    useAppointmentStore.getState().clearAppointments();
  });

  it("creates a confirmed appointment with BYN price and client details", () => {
    const appointment = useAppointmentStore.getState().createAppointment({
      serviceId: "cut",
      serviceName: "Мужская стрижка",
      barberId: "amir",
      barberName: "Амир",
      date: "2099-01-01",
      startTime: "10:00",
      endTime: "10:45",
      clientName: "Иван",
      clientPhone: "+375 29 123 45 67",
      comment: "Коротко по бокам",
      priceByn: 45,
      durationMinutes: 45,
      status: "confirmed",
      type: "salon",
    });

    expect(appointment).toMatchObject({
      serviceName: "Мужская стрижка",
      clientName: "Иван",
      clientPhone: "+375 29 123 45 67",
      priceByn: 45,
      durationMinutes: 45,
      status: "confirmed",
    });
    expect(useAppointmentStore.getState().lastAppointmentId).toBe(appointment.id);
    expect(useAppointmentStore.getState().appointments).toHaveLength(1);
  });

  it("clears appointments", () => {
    useAppointmentStore.getState().createAppointment({
      serviceId: "cut",
      serviceName: "Мужская стрижка",
      barberId: "amir",
      barberName: "Амир",
      date: "2099-01-01",
      startTime: "10:00",
      clientName: "Иван",
      clientPhone: "+375291234567",
      priceByn: 45,
      durationMinutes: 45,
      status: "confirmed",
      type: "salon",
    });

    useAppointmentStore.getState().clearAppointments();

    expect(useAppointmentStore.getState().appointments).toEqual([]);
    expect(useAppointmentStore.getState().lastAppointmentId).toBeUndefined();
  });
});
