import { describe, expect, it, vi } from "vitest";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase/client";
import { bookingRepository } from "./booking-repository";
import { mockBookingRepository } from "./booking-repository.mock";
import { supabaseBookingRepository } from "./booking-repository.supabase";

vi.mock("@/shared/lib/supabase/client", () => ({
  getSupabaseBrowserClient: vi.fn(),
}));

type QueryResult<T> = {
  data: T[] | null;
  error: unknown;
};

function createOrderedQuery<T>(result: QueryResult<T>) {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    order: vi.fn(async () => result),
  };

  return query;
}

function createSelectOnlyQuery<T>(result: QueryResult<T>) {
  return {
    select: vi.fn(async () => result),
  };
}

const mockedGetSupabaseBrowserClient = vi.mocked(getSupabaseBrowserClient);

describe("supabaseBookingRepository", () => {
  it("maps active service rows to Service models", async () => {
    const servicesQuery = createOrderedQuery({
      data: [
        {
          id: "service-1",
          title: "Мужская стрижка",
          description: null,
          duration_minutes: 45,
          price: 4500,
          is_active: true,
        },
      ],
      error: null,
    });
    const from = vi.fn((table: string) => {
      expect(table).toBe("services");
      return servicesQuery;
    });
    mockedGetSupabaseBrowserClient.mockReturnValue({ from } as never);

    const services = await supabaseBookingRepository.getBookableServices();

    expect(servicesQuery.select).toHaveBeenCalledWith(
      "id,title,description,duration_minutes,price,is_active",
    );
    expect(servicesQuery.eq).toHaveBeenCalledWith("is_active", true);
    expect(servicesQuery.order).toHaveBeenCalledWith("title", { ascending: true });
    expect(services).toEqual([
      {
        id: "service-1",
        name: "Мужская стрижка",
        durationMinutes: 45,
        priceByn: 45,
      },
    ]);
    expect(services[0]).not.toHaveProperty("duration_minutes");
    expect(services[0]).not.toHaveProperty("price");
  });

  it("maps active barber rows and composes serviceIds from barber_services", async () => {
    const barbersQuery = createOrderedQuery({
      data: [
        {
          id: "barber-1",
          user_id: null,
          name: "Амир",
          avatar_url: null,
          bio: "Fade / texture",
          is_active: true,
          created_at: "2026-06-01T00:00:00.000Z",
        },
        {
          id: "barber-2",
          user_id: null,
          name: "Макс",
          avatar_url: null,
          bio: null,
          is_active: true,
          created_at: "2026-06-01T00:00:00.000Z",
        },
      ],
      error: null,
    });
    const barberServicesQuery = createSelectOnlyQuery({
      data: [
        { id: "relation-1", barber_id: "barber-1", service_id: "service-1" },
        { id: "relation-2", barber_id: "barber-1", service_id: "service-2" },
      ],
      error: null,
    });
    const from = vi.fn((table: string) => {
      if (table === "barbers") {
        return barbersQuery;
      }

      if (table === "barber_services") {
        return barberServicesQuery;
      }

      throw new Error(`Unexpected table: ${table}`);
    });
    mockedGetSupabaseBrowserClient.mockReturnValue({ from } as never);

    const barbers = await supabaseBookingRepository.getBookableBarbers();

    expect(barbersQuery.select).toHaveBeenCalledWith(
      "id,user_id,name,avatar_url,bio,is_active,created_at",
    );
    expect(barbersQuery.eq).toHaveBeenCalledWith("is_active", true);
    expect(barbersQuery.order).toHaveBeenCalledWith("name", { ascending: true });
    expect(barberServicesQuery.select).toHaveBeenCalledWith("id,barber_id,service_id");
    expect(barbers).toEqual([
      {
        id: "barber-1",
        name: "Амир",
        bio: "Fade / texture",
        specialization: undefined,
        serviceIds: ["service-1", "service-2"],
        isActive: true,
      },
      {
        id: "barber-2",
        name: "Макс",
        bio: undefined,
        specialization: undefined,
        serviceIds: [],
        isActive: true,
      },
    ]);
    expect(barbers[0]).not.toHaveProperty("is_active");
    expect(barbers[0]).not.toHaveProperty("service_ids");
  });

  it("throws a clear error when services query fails", async () => {
    const servicesQuery = createOrderedQuery({
      data: null,
      error: new Error("permission denied"),
    });
    const from = vi.fn(() => servicesQuery);
    mockedGetSupabaseBrowserClient.mockReturnValue({ from } as never);

    await expect(supabaseBookingRepository.getBookableServices()).rejects.toThrow(
      "Failed to load bookable services: permission denied",
    );
  });

  it("throws a clear error when barber_services query fails", async () => {
    const barbersQuery = createOrderedQuery({
      data: [],
      error: null,
    });
    const barberServicesQuery = createSelectOnlyQuery({
      data: null,
      error: new Error("relation unavailable"),
    });
    const from = vi.fn((table: string) =>
      table === "barber_services" ? barberServicesQuery : barbersQuery,
    );
    mockedGetSupabaseBrowserClient.mockReturnValue({ from } as never);

    await expect(supabaseBookingRepository.getBookableBarbers()).rejects.toThrow(
      "Failed to load barber service assignments: relation unavailable",
    );
  });

  it("does not switch the active booking repository away from mock", () => {
    expect(bookingRepository).toBe(mockBookingRepository);
    expect(bookingRepository).not.toBe(supabaseBookingRepository);
  });
});
