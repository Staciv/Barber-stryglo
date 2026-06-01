import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import { bookingRepository } from "@/features/booking/repository/booking-repository";
import { useBookingCatalog } from "./use-booking-catalog";

vi.mock("@/features/booking/repository/booking-repository", () => ({
  bookingRepository: {
    getBookableServices: vi.fn(),
    getBookableBarbers: vi.fn(),
  },
}));

const services: Service[] = [
  {
    id: "cut",
    name: "Мужская стрижка",
    durationMinutes: 45,
    priceByn: 45,
  },
];

const barbers: BarberProfile[] = [
  {
    id: "amir",
    name: "Амир",
    specialization: "Fade / texture",
    serviceIds: ["cut"],
    isActive: true,
  },
];

const mockedRepository = vi.mocked(bookingRepository);

describe("useBookingCatalog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedRepository.getBookableServices.mockResolvedValue(services);
    mockedRepository.getBookableBarbers.mockResolvedValue(barbers);
  });

  it("loads services and barbers through the booking repository", async () => {
    const { result } = renderHook(() => useBookingCatalog());

    expect(result.current).toMatchObject({
      services: [],
      barbers: [],
      isLoading: true,
      error: null,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedRepository.getBookableServices).toHaveBeenCalledTimes(1);
    expect(mockedRepository.getBookableBarbers).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      services,
      barbers,
      isLoading: false,
      error: null,
    });
  });

  it("returns camelCase domain models without snake_case fields", async () => {
    const { result } = renderHook(() => useBookingCatalog());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.services[0]).toEqual(
      expect.objectContaining({
        durationMinutes: 45,
        priceByn: 45,
      }),
    );
    expect(result.current.services[0]).not.toHaveProperty("duration_minutes");
    expect(result.current.services[0]).not.toHaveProperty("price_byn");
    expect(result.current.barbers[0]).toEqual(
      expect.objectContaining({
        serviceIds: ["cut"],
        isActive: true,
      }),
    );
    expect(result.current.barbers[0]).not.toHaveProperty("service_ids");
    expect(result.current.barbers[0]).not.toHaveProperty("is_active");
  });

  it("exposes an error state when repository loading fails", async () => {
    mockedRepository.getBookableServices.mockRejectedValueOnce(new Error("Catalog unavailable"));

    const { result } = renderHook(() => useBookingCatalog());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current).toEqual({
      services: [],
      barbers: [],
      isLoading: false,
      error: "Catalog unavailable",
    });
  });

  it("does not update state after unmount", async () => {
    let resolveServices: (value: Service[]) => void = () => undefined;
    let resolveBarbers: (value: BarberProfile[]) => void = () => undefined;
    mockedRepository.getBookableServices.mockReturnValueOnce(
      new Promise<Service[]>((resolve) => {
        resolveServices = resolve;
      }),
    );
    mockedRepository.getBookableBarbers.mockReturnValueOnce(
      new Promise<BarberProfile[]>((resolve) => {
        resolveBarbers = resolve;
      }),
    );

    const { unmount } = renderHook(() => useBookingCatalog());
    unmount();

    resolveServices(services);
    resolveBarbers(barbers);

    await Promise.resolve();

    expect(mockedRepository.getBookableServices).toHaveBeenCalledTimes(1);
    expect(mockedRepository.getBookableBarbers).toHaveBeenCalledTimes(1);
  });
});
