"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore, type MockUserRole } from "@/features/auth/model/auth-store";

type RequireAuthProps = {
  children: React.ReactNode;
  allowedRoles?: MockUserRole[];
};

export function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAllowed = !allowedRoles || (user ? allowedRoles.includes(user.role) : false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !isAllowed) {
    return null;
  }

  return <>{children}</>;
}
