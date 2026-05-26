import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Barber, BarberService, Service } from "@/shared/types/database";
import { getBarbers, getBarberServices, getServices } from "./booking-api";
import { getBookableBarbers, getBookableServices } from "./booking-repository";

vi.mock("./booking-api", () => ({
  getBarbers: vi.fn(),
  getBarberServices: vi.fn(),
  getServices: vi.fn(),
}));

const getServicesMock = vi.mocked(getServices);
const getBarbersMock = vi.mocked(getBarbers);
const getBarberServicesMock = vi.mocked(getBarberServices);

const serviceRow: Service = {
  id: "service-1",
  title: "Мужская стрижка",
  description: "Форма, укладка и финиш.",
  duration_minutes: 45,
  price: 4500,
  is_active: true,
};

const barberRow: Barber = {
  id: "barber-1",
  user_id: "user-1",
  name: "Амир",
  avatar_url: null,
  bio: "Fade / texture. Чёткие линии и спокойный темп.",
  is_active: true,
  created_at: "2026-05-26T10:00:00.000Z",
};

const barberServiceRows: BarberService[] = [
  {
    id: "assignment-1",
    barber_id: "barber-1",
    service_id: "service-1",
  },
  {
    id: "assignment-2",
    barber_id: "barber-1",
    service_id: "service-2",
  },
];

describe("booking repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads services through the API and returns mapped UI services", async () => {
    getServicesMock.mockResolvedValue([serviceRow]);

    await expect(getBookableServices()).resolves.toEqual([
      {
        id: "service-1",
        name: "Мужская стрижка",
        durationMinutes: 45,
        priceByn: 45,
      },
    ]);
    expect(getServicesMock).toHaveBeenCalledOnce();
  });

  it("does not expose snake_case service fields", async () => {
    getServicesMock.mockResolvedValue([serviceRow]);

    const [service] = await getBookableServices();

    expect(service).not.toHaveProperty("duration_minutes");
    expect(service).not.toHaveProperty("is_active");
    expect(service).not.toHaveProperty("title");
  });

  it("loads barbers through the API and returns mapped UI barbers", async () => {
    getBarbersMock.mockResolvedValue([barberRow]);
    getBarberServicesMock.mockResolvedValue(barberServiceRows);

    await expect(getBookableBarbers()).resolves.toEqual([
      {
        id: "barber-1",
        name: "Амир",
        bio: "Fade / texture. Чёткие линии и спокойный темп.",
        specialization: undefined,
        serviceIds: ["service-1", "service-2"],
        isActive: true,
      },
    ]);
    expect(getBarbersMock).toHaveBeenCalledOnce();
    expect(getBarberServicesMock).toHaveBeenCalledOnce();
  });

  it("returns empty serviceIds for barbers without relations", async () => {
    getBarbersMock.mockResolvedValue([{ ...barberRow, id: "barber-without-services" }]);
    getBarberServicesMock.mockResolvedValue(barberServiceRows);

    const [barber] = await getBookableBarbers();

    expect(barber.serviceIds).toEqual([]);
  });

  it("does not expose snake_case barber fields", async () => {
    getBarbersMock.mockResolvedValue([barberRow]);
    getBarberServicesMock.mockResolvedValue(barberServiceRows);

    const [barber] = await getBookableBarbers();

    expect(barber).not.toHaveProperty("is_active");
    expect(barber).not.toHaveProperty("avatar_url");
    expect(barber).not.toHaveProperty("user_id");
    expect(barber).not.toHaveProperty("barber_id");
    expect(barber).not.toHaveProperty("service_id");
  });

  it("propagates API errors", async () => {
    const error = new Error("Supabase is not configured.");
    getServicesMock.mockRejectedValue(error);

    await expect(getBookableServices()).rejects.toThrow("Supabase is not configured.");
  });

  it("propagates barber_services API errors", async () => {
    const error = new Error("Failed to load barber service assignments.");
    getBarbersMock.mockResolvedValue([barberRow]);
    getBarberServicesMock.mockRejectedValue(error);

    await expect(getBookableBarbers()).rejects.toThrow(
      "Failed to load barber service assignments.",
    );
  });
});
