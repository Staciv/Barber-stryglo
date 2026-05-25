import { describe, expect, it } from "vitest";
import { getBarbers, BookingApiError } from "./booking-api";

describe("booking API Supabase guard", () => {
  it("returns a controlled error when Supabase env is missing", async () => {
    const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const previousKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
      await expect(getBarbers()).rejects.toBeInstanceOf(BookingApiError);
      await expect(getBarbers()).rejects.toThrow(/Supabase is not configured/);
    } finally {
      if (previousUrl) {
        process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
      }
      if (previousKey) {
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previousKey;
      }
    }
  });
});
