import { describe, expect, it } from "vitest";
import {
  extractBelarusNationalPart,
  formatBelarusNationalPart,
  isValidBelarusPhone,
  normalizeBelarusNationalPart,
  normalizeBelarusPhone,
  validateBelarusNationalPart,
} from "./belarus-phone";

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

  it("formats the national part as XX XXX XX XX", () => {
    expect(formatBelarusNationalPart("291234567")).toBe("29 123 45 67");
    expect(formatBelarusNationalPart("+375331112233")).toBe("33 111 22 33");
  });

  it("extracts the national part from supported Belarus formats", () => {
    expect(extractBelarusNationalPart("291234567")).toBe("291234567");
    expect(extractBelarusNationalPart("29 123 45 67")).toBe("291234567");
    expect(extractBelarusNationalPart("+375291234567")).toBe("291234567");
    expect(extractBelarusNationalPart("+375 44 123 45 67")).toBe("441234567");
    expect(extractBelarusNationalPart("80291234567")).toBe("291234567");
  });

  it("normalizes to +375XXXXXXXXX", () => {
    expect(normalizeBelarusNationalPart("29 123 45 67")).toBe("+375291234567");
    expect(normalizeBelarusNationalPart("+375291234567")).toBe("+375291234567");
    expect(normalizeBelarusNationalPart("80291234567")).toBe("+375291234567");
  });

  it("returns an operator-code validation error", () => {
    expect(validateBelarusNationalPart("991234567")).toMatchObject({
      isValid: false,
      error: "Код оператора должен быть 25, 29, 33 или 44",
    });
  });

  it("accepts supported Belarus phone formats", () => {
    expect(isValidBelarusPhone("+375291234567")).toBe(true);
    expect(isValidBelarusPhone("80291234567")).toBe(true);
  });

  it("rejects wrong operator code and short numbers", () => {
    expect(isValidBelarusPhone("+375991234567")).toBe(false);
    expect(isValidBelarusPhone("+37529123")).toBe(false);
  });
});
