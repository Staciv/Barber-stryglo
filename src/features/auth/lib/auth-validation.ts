import { z } from "zod";
import { isValidBelarusPhone } from "@/shared/lib/belarus-phone";

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Введи номер телефона")
  .refine(isValidBelarusPhone, "Введи белорусский номер: +375 29 123 45 67");

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{4}$/, "Код должен состоять из 4 цифр");
