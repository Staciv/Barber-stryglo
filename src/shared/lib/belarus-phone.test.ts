import { describe, expect, it } from "vitest";
import { isValidBelarusPhone, normalizeBelarusPhone } from "./belarus-phone";

describe("Belarus phone validation", () => {
  it.each([
    "+375291234567",
    "+375 29 123 45 67",
    "375291234567",
    "80291234567",
    "+375 (33) 123-45-67",
  ])("accepts %s", (phone) => {
    expect(isValidBelarusPhone(phone)).toBe(true);
  });

  it.each(["+48123123123", "+375 17 123 45 67", "12345", "+375991234567"])(
    "rejects %s",
    (phone) => {
      expect(isValidBelarusPhone(phone)).toBe(false);
    },
  );

  it("normalizes spaces, dashes and parentheses", () => {
    expect(normalizeBelarusPhone("+375 (29) 123-45-67")).toBe("+375291234567");
  });
});
