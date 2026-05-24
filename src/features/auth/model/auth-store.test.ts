import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "./auth-store";

describe("auth store", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      user: undefined,
      pendingPhone: undefined,
      isAuthenticated: false,
    });
  });

  it("does not authenticate with wrong OTP", () => {
    useAuthStore.getState().loginWithPhone("+375291234567");

    const result = useAuthStore.getState().verifyOtp("2222");

    expect(result.success).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeUndefined();
  });

  it("authenticates with OTP 1111", () => {
    useAuthStore.getState().loginWithPhone("+375291234567");

    const result = useAuthStore.getState().verifyOtp("1111");

    expect(result.success).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user).toMatchObject({
      phone: "+375291234567",
      role: "client",
    });
  });

  it("clears session on logout", () => {
    useAuthStore.getState().loginWithPhone("+375291234567");
    useAuthStore.getState().verifyOtp("1111");

    useAuthStore.getState().logout();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeUndefined();
  });
});
