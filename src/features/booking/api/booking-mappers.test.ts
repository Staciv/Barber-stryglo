import { describe, expect, it } from "vitest";
import type { Barber as BarberRow, Service as ServiceRow } from "@/shared/types/database";
import {
  mapBarberRowsToBarberProfiles,
  mapBarberRowToBarberProfile,
  mapServiceRowsToServices,
  mapServiceRowToService,
} from "./booking-mappers";

const serviceRow: ServiceRow = {
  id: "service-1",
  title: "Мужская стрижка",
  description: "Форма, укладка и финиш.",
  duration_minutes: 45,
  price: 4500,
  is_active: true,
};

const barberRow: BarberRow = {
  id: "barber-1",
  user_id: "user-1",
  name: "Амир",
  avatar_url: null,
  bio: "Fade / texture. Чёткие линии и спокойный темп.",
  is_active: true,
  created_at: "2026-05-26T10:00:00.000Z",
};

describe("booking service mappers", () => {
  it("maps a Supabase service row to the UI Service shape", () => {
    expect(mapServiceRowToService(serviceRow)).toEqual({
      id: "service-1",
      name: "Мужская стрижка",
      durationMinutes: 45,
      priceByn: 45,
    });
  });

  it("converts price from kopecks to rubles", () => {
    expect(mapServiceRowToService({ ...serviceRow, price: 7000 }).priceByn).toBe(70);
  });

  it("maps an array of service rows", () => {
    expect(
      mapServiceRowsToServices([
        serviceRow,
        {
          ...serviceRow,
          id: "service-2",
          title: "Борода",
          duration_minutes: 30,
          price: 3000,
        },
      ]),
    ).toEqual([
      {
        id: "service-1",
        name: "Мужская стрижка",
        durationMinutes: 45,
        priceByn: 45,
      },
      {
        id: "service-2",
        name: "Борода",
        durationMinutes: 30,
        priceByn: 30,
      },
    ]);
  });

  it("uses safe fallbacks for partial rows", () => {
    expect(mapServiceRowToService({})).toEqual({
      id: "",
      name: "Service",
      durationMinutes: 0,
      priceByn: 0,
    });
  });
});

describe("booking barber mappers", () => {
  it("maps a Supabase barber row to the UI BarberProfile shape", () => {
    expect(mapBarberRowToBarberProfile(barberRow)).toEqual({
      id: "barber-1",
      name: "Амир",
      bio: "Fade / texture. Чёткие линии и спокойный темп.",
      specialization: undefined,
      serviceIds: [],
      isActive: true,
    });
  });

  it("maps is_active to isActive", () => {
    expect(mapBarberRowToBarberProfile({ ...barberRow, is_active: false }).isActive).toBe(false);
  });

  it("sets serviceIds to an empty array until repository composition is added", () => {
    expect(mapBarberRowToBarberProfile(barberRow).serviceIds).toEqual([]);
  });

  it("maps an array of barber rows", () => {
    expect(
      mapBarberRowsToBarberProfiles([
        barberRow,
        {
          ...barberRow,
          id: "barber-2",
          name: "Макс",
          bio: null,
          is_active: false,
        },
      ]),
    ).toEqual([
      {
        id: "barber-1",
        name: "Амир",
        bio: "Fade / texture. Чёткие линии и спокойный темп.",
        specialization: undefined,
        serviceIds: [],
        isActive: true,
      },
      {
        id: "barber-2",
        name: "Макс",
        bio: undefined,
        specialization: undefined,
        serviceIds: [],
        isActive: false,
      },
    ]);
  });

  it("uses safe fallbacks for partial barber rows", () => {
    expect(mapBarberRowToBarberProfile({})).toEqual({
      id: "",
      name: "Barber",
      bio: undefined,
      specialization: undefined,
      serviceIds: [],
      isActive: false,
    });
  });
});
