export const BELARUS_OPERATOR_CODES = ["25", "29", "33", "44"] as const;

export type BelarusPhoneValidation = {
  isValid: boolean;
  error?: string;
};

export function normalizeBelarusPhone(phone: string) {
  return phone.replace(/[\s()-]/g, "");
}

export function extractBelarusNationalPart(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("375")) {
    return digits.slice(3, 12);
  }

  if (digits.startsWith("80")) {
    return digits.slice(2, 11);
  }

  return digits.slice(0, 9);
}

export function formatBelarusNationalPart(value: string) {
  const digits = extractBelarusNationalPart(value);
  const chunks = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);

  return chunks.join(" ");
}

export function normalizeBelarusNationalPart(value: string) {
  const nationalPart = extractBelarusNationalPart(value);
  return nationalPart ? `+375${nationalPart}` : "";
}

export function validateBelarusNationalPart(value: string): BelarusPhoneValidation {
  const nationalPart = extractBelarusNationalPart(value);

  if (nationalPart.length !== 9) {
    return {
      isValid: false,
      error: "Номер должен содержать 9 цифр после +375",
    };
  }

  if (!BELARUS_OPERATOR_CODES.includes(nationalPart.slice(0, 2) as typeof BELARUS_OPERATOR_CODES[number])) {
    return {
      isValid: false,
      error: "Код оператора должен быть 25, 29, 33 или 44",
    };
  }

  return { isValid: true };
}

export function isValidBelarusPhone(phone: string): boolean {
  return validateBelarusNationalPart(phone).isValid;
}
