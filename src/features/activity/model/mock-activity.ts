export type ActivityBookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type ActivityBooking = {
  id: string;
  barberName: string;
  barberId: string;
  serviceTitle: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ActivityBookingStatus;
  type: "salon" | "go";
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

export const upcomingBookings: ActivityBooking[] = [
  {
    id: "booking-upcoming-1",
    barberName: "Амир",
    barberId: "amir",
    serviceTitle: "Стрижка",
    serviceId: "cut",
    date: dateFromToday(1),
    startTime: "12:00",
    endTime: "12:45",
    status: "confirmed",
    type: "salon",
  },
  {
    id: "booking-upcoming-2",
    barberName: "Макс",
    barberId: "maks",
    serviceTitle: "Стрижка + борода",
    serviceId: "cut-beard",
    date: dateFromToday(3),
    startTime: "19:00",
    endTime: "20:10",
    status: "pending",
    type: "salon",
  },
];

export const pastVisits: ActivityBooking[] = [
  {
    id: "booking-past-1",
    barberName: "Рома",
    barberId: "roma",
    serviceTitle: "Стрижка",
    serviceId: "cut",
    date: dateFromToday(-13),
    startTime: "15:00",
    endTime: "15:45",
    status: "completed",
    type: "salon",
  },
  {
    id: "booking-past-2",
    barberName: "Макс",
    barberId: "maks",
    serviceTitle: "Борода",
    serviceId: "beard",
    date: dateFromToday(-26),
    startTime: "18:30",
    endTime: "19:00",
    status: "completed",
    type: "salon",
  },
];

export const activeGoRequests: GoRequestActivity[] = [
  {
    id: "go-request-1",
    barberName: "Амир",
    serviceTitle: "Стрижка",
    serviceId: "cut",
    address: "ул. Центральная, 14",
    proposedDate: dateFromToday(2),
    proposedTime: "20:00",
    status: "accepted",
  },
  {
    id: "go-request-2",
    barberName: "Макс",
    serviceTitle: "Стрижка + борода",
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
