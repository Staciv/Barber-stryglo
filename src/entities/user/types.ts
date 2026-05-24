export type UserRole = "client" | "barber" | "admin";

export type UserProfile = {
  id: string;
  role: UserRole;
  displayName: string;
};
