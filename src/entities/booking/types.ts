export type BookingStatus = "draft" | "pending" | "confirmed";

export type BookingDraft = {
  id: string;
  status: BookingStatus;
};
