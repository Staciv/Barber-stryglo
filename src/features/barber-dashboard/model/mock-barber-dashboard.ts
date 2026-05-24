export type BarberDashboardBookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type BarberDashboardBooking = {
  id: string;
  clientName: string;
  clientPhone?: string;
  serviceTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BarberDashboardBookingStatus;
  type: "salon" | "go";
  address?: string;
};

export type BarberGoRequestStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "proposed_new_time"
  | "cancelled";

export type BarberGoRequest = {
  id: string;
  clientName: string;
  clientPhone?: string;
  serviceTitle: string;
  address: string;
  proposedDate: string;
  proposedTime: string;
  status: BarberGoRequestStatus;
  clientMessage?: string;
};

export type BarberScheduleItem = {
  id: string;
  weekday: string;
  startTime: string;
  endTime: string;
  isGoAvailable: boolean;
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

export const todayBookings: BarberDashboardBooking[] = [
  {
    id: "today-1",
    clientName: "Илья",
    clientPhone: "+375 29 111-22-33",
    serviceTitle: "Стрижка",
    date: dateFromToday(0),
    startTime: "10:00",
    endTime: "10:45",
    status: "confirmed",
    type: "salon",
  },
  {
    id: "today-2",
    clientName: "Данила",
    clientPhone: "+375 33 444-55-66",
    serviceTitle: "Стрижка + борода",
    date: dateFromToday(0),
    startTime: "15:00",
    endTime: "16:10",
    status: "pending",
    type: "salon",
  },
  {
    id: "today-3",
    clientName: "Артём",
    serviceTitle: "Борода",
    date: dateFromToday(0),
    startTime: "20:00",
    endTime: "20:30",
    status: "confirmed",
    type: "go",
    address: "ул. Центральная, 14",
  },
];

export const upcomingBarberBookings: BarberDashboardBooking[] = [
  {
    id: "upcoming-1",
    clientName: "Максим",
    clientPhone: "+375 44 700-80-90",
    serviceTitle: "Стрижка",
    date: dateFromToday(1),
    startTime: "12:00",
    endTime: "12:45",
    status: "confirmed",
    type: "salon",
  },
  {
    id: "upcoming-2",
    clientName: "Никита",
    serviceTitle: "Стрижка + борода",
    date: dateFromToday(3),
    startTime: "18:30",
    endTime: "19:40",
    status: "confirmed",
    type: "go",
    address: "ул. Парковая, 8",
  },
];

export const initialBarberGoRequests: BarberGoRequest[] = [
  {
    id: "go-1",
    clientName: "Саша",
    clientPhone: "+375 29 777-10-10",
    serviceTitle: "Стрижка",
    address: "пр-т Молодёжный, 3",
    proposedDate: dateFromToday(2),
    proposedTime: "19:30",
    status: "pending",
    clientMessage: "Лучше после работы, можно чуть позже.",
  },
  {
    id: "go-2",
    clientName: "Кирилл",
    serviceTitle: "Борода",
    address: "ул. Садовая, 21",
    proposedDate: dateFromToday(4),
    proposedTime: "20:00",
    status: "pending",
  },
];

export const barberSchedulePreview: BarberScheduleItem[] = [
  {
    id: "schedule-mon",
    weekday: "Пн",
    startTime: "10:00",
    endTime: "19:00",
    isGoAvailable: false,
  },
  {
    id: "schedule-tue",
    weekday: "Вт",
    startTime: "10:00",
    endTime: "20:00",
    isGoAvailable: true,
  },
  {
    id: "schedule-thu",
    weekday: "Чт",
    startTime: "12:00",
    endTime: "21:00",
    isGoAvailable: true,
  },
  {
    id: "schedule-sat",
    weekday: "Сб",
    startTime: "11:00",
    endTime: "18:00",
    isGoAvailable: false,
  },
];
