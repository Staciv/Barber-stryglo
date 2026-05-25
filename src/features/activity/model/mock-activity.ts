export type ActivityBookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type ActivityBooking = {
  id: string;
  barberName: string;
  barberId: string;
  serviceName: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime?: string;
  status: ActivityBookingStatus;
  type: "salon" | "go";
  priceByn: number;
  durationMinutes: number;
  address?: string;
};

export type GoRequestActivityStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "proposed_new_time"
  | "cancelled";

export type GoRequestActivity = {
  id: string;
  barberName?: string;
  serviceTitle: string;
  serviceId: string;
  address: string;
  proposedDate: string;
  proposedTime: string;
  status: GoRequestActivityStatus;
  barberMessage?: string;
};

function toDateValue(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function dateFromToday(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return toDateValue(date);
}

export const upcomingBookings: ActivityBooking[] = [];

export const pastVisits: ActivityBooking[] = [];

export const activeGoRequests: GoRequestActivity[] = [
  {
    id: "go-request-1",
    barberName: "Амир",
    serviceTitle: "Мужская стрижка",
    serviceId: "cut",
    address: "ул. Центральная, 14",
    proposedDate: dateFromToday(2),
    proposedTime: "20:00",
    status: "accepted",
  },
  {
    id: "go-request-2",
    barberName: "Макс",
    serviceTitle: "Мужская стрижка + борода",
    serviceId: "cut-beard",
    address: "ул. Парковая, 8",
    proposedDate: dateFromToday(4),
    proposedTime: "19:30",
    status: "proposed_new_time",
    barberMessage: "Могу приехать в 20:15 вместо 19:30.",
  },
  {
    id: "go-request-3",
    serviceTitle: "Борода",
    serviceId: "beard",
    address: "пр-т Молодёжный, 3",
    proposedDate: dateFromToday(5),
    proposedTime: "18:00",
    status: "pending",
  },
];
