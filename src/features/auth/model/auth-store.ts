"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { normalizeBelarusNationalPart } from "@/shared/lib/belarus-phone";

export type MockUserRole = "client" | "barber" | "admin";

export type MockUser = {
  id: string;
  phone: string;
  name?: string;
  role: MockUserRole;
};

type VerifyOtpResult = {
  success: boolean;
  error?: string;
};

type AuthState = {
  user?: MockUser;
  pendingPhone?: string;
  isAuthenticated: boolean;
  loginWithPhone: (phone: string) => void;
  verifyOtp: (code: string) => VerifyOtpResult;
  logout: () => void;
};

function createMockUser(phone: string): MockUser {
  const normalizedPhone = normalizeBelarusNationalPart(phone);

  return {
    id: `mock-client-${normalizedPhone.replace(/\D/g, "") || "phone"}`,
    phone: normalizedPhone,
    role: "client",
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: undefined,
      pendingPhone: undefined,
      isAuthenticated: false,
      loginWithPhone: (phone) =>
        set({
          pendingPhone: normalizeBelarusNationalPart(phone),
        }),
      verifyOtp: (code) => {
        const pendingPhone = get().pendingPhone;

        if (!pendingPhone) {
          return {
            success: false,
            error: "Сначала введи номер телефона",
          };
        }

        if (code !== "1111") {
          return {
            success: false,
            error: "Неверный код. Для MVP используй 1111",
          };
        }

        const user = createMockUser(pendingPhone);
        set({
          user,
          pendingPhone: undefined,
          isAuthenticated: true,
        });

        return { success: true };
      },
      logout: () =>
        set({
          user: undefined,
          pendingPhone: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: "striglo-mock-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: Boolean(state.user),
      }),
    },
  ),
);
