import { describe, expect, it } from "vitest";
import { mockBarbers } from "@/entities/barber/mock";
import { mockServices } from "@/entities/service/mock";
import { mockBookingRepository } from "./booking-repository.mock";

describe("mockBookingRepository", () => {
  it("returns bookable services asynchronously", async () => {
    const result = mockBookingRepository.getBookableServices();

    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toEqual(mockServices);
  });

  it("returns bookable barbers asynchronously", async () => {
    const result = mockBookingRepository.getBookableBarbers();

    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toEqual(mockBarbers);
  });

  it("returns shallow copies instead of mutating mock services", async () => {
    const services = await mockBookingRepository.getBookableServices();

    expect(services).not.toBe(mockServices);
    expect(services[0]).not.toBe(mockServices[0]);
  });

  it("returns barber copies with copied serviceIds", async () => {
    const barbers = await mockBookingRepository.getBookableBarbers();

    expect(barbers).not.toBe(mockBarbers);
    expect(barbers[0]).not.toBe(mockBarbers[0]);
    expect(barbers[0]?.serviceIds).not.toBe(mockBarbers[0]?.serviceIds);
  });

  it("keeps returned service models camelCase", async () => {
    const [service] = await mockBookingRepository.getBookableServices();

    expect(service).toEqual(
      expect.objectContaining({
        durationMinutes: expect.any(Number),
        priceByn: expect.any(Number),
      }),
    );
    expect(service).not.toHaveProperty("duration_minutes");
    expect(service).not.toHaveProperty("price_byn");
  });

  it("keeps returned barber models camelCase", async () => {
    const [barber] = await mockBookingRepository.getBookableBarbers();

    expect(barber).toEqual(
      expect.objectContaining({
        serviceIds: expect.any(Array),
        isActive: expect.any(Boolean),
      }),
    );
    expect(barber).not.toHaveProperty("service_ids");
    expect(barber).not.toHaveProperty("is_active");
  });
});
