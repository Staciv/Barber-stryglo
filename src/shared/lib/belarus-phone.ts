export function normalizeBelarusPhone(phone: string) {
  return phone.replace(/[\s()-]/g, "");
}

export function isValidBelarusPhone(phone: string): boolean {
  const normalized = normalizeBelarusPhone(phone);

  return /^(\+375|375|80)(25|29|33|44)\d{7}$/.test(normalized);
}
