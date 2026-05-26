import type { PostgrestError } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/shared/lib/supabase/client";
import type {
  Barber,
  BarberAvailability,
  BarberService,
  Booking,
  BookingStatus,
  CreateBookingInput,
  Service,
} from "@/shared/types/database";

export class BookingApiError extends Error {
  constructor(
    message: string,
    public readonly cause?: PostgrestError,
  ) {
    super(message);
    this.name = "BookingApiError";
  }
}

type GetAvailabilityFilters = {
  barberId?: string;
};

type GetBookingsFilters = {
  userId?: string;
  barberId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: BookingStatus;
};

function throwIfError(error: PostgrestError | null, fallbackMessage: string) {
  if (error) {
    throw new BookingApiError(error.message || fallbackMessage, error);
  }
}

function getConfiguredSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new BookingApiError(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, or keep using the mock booking flow.",
    );
  }

  return getSupabaseBrowserClient();
}

export async function getBarbers(): Promise<Barber[]> {
  const supabase = getConfiguredSupabaseClient();
  const { data, error } = await supabase
    .from("barbers")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  throwIfError(error, "Failed to load barbers.");
  return data ?? [];
}

export async function getServices(): Promise<Service[]> {
  const supabase = getConfiguredSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("title", { ascending: true });

  throwIfError(error, "Failed to load services.");
  return data ?? [];
}

export async function getBarberServices(): Promise<BarberService[]> {
  const supabase = getConfiguredSupabaseClient();
  const { data, error } = await supabase
    .from("barber_services")
    .select("id, barber_id, service_id");

  throwIfError(error, "Failed to load barber service assignments.");
  return data ?? [];
}

export async function getAvailability(
  filters: GetAvailabilityFilters = {},
): Promise<BarberAvailability[]> {
  const supabase = getConfiguredSupabaseClient();
  let query = supabase
    .from("barber_availability")
    .select("*")
    .order("weekday", { ascending: true })
    .order("start_time", { ascending: true });

  if (filters.barberId) {
    query = query.eq("barber_id", filters.barberId);
  }

  const { data, error } = await query;
  throwIfError(error, "Failed to load barber availability.");

  return data ?? [];
}

export async function getBookings(filters: GetBookingsFilters = {}): Promise<Booking[]> {
  const supabase = getConfiguredSupabaseClient();
  let query = supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (filters.userId) {
    query = query.eq("user_id", filters.userId);
  }

  if (filters.barberId) {
    query = query.eq("barber_id", filters.barberId);
  }

  if (filters.dateFrom) {
    query = query.gte("date", filters.dateFrom);
  }

  if (filters.dateTo) {
    query = query.lte("date", filters.dateTo);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  throwIfError(error, "Failed to load bookings.");

  return data ?? [];
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const supabase = getConfiguredSupabaseClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert(input)
    .select("*")
    .single();

  throwIfError(error, "Failed to create booking.");

  if (!data) {
    throw new BookingApiError("Booking was created but no row was returned.");
  }

  return data;
}

export async function cancelBooking(bookingId: string): Promise<Booking> {
  const supabase = getConfiguredSupabaseClient();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .select("*")
    .single();

  throwIfError(error, "Failed to cancel booking.");

  if (!data) {
    throw new BookingApiError("Booking was cancelled but no row was returned.");
  }

  return data;
}

// Future boundary: slot generation should combine barber_availability and bookings
// in a separate, isolated module once real availability rules are defined.
