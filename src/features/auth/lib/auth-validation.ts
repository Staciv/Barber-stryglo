import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .min(6, "Введи номер телефона");

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{4}$/, "Код должен состоять из 4 цифр");
