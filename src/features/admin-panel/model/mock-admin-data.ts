import { dateFromToday } from "@/shared/lib/date-utils";
import type {
  AdminAvailability,
  AdminBarber,
  AdminBarberService,
  AdminBooking,
  AdminService,
} from "./types";

export const weekdayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const mockAdminBarbers: AdminBarber[] = [
  {
    id: "amir",
    name: "Амир",
    bio: "Fade / texture. Быстрые чистые стрижки и аккуратные линии.",
    isActive: true,
  },
  {
    id: "maks",
    name: "Макс",
    bio: "Classic / beard. Борода, классика и спокойная детализация.",
    isActive: true,
  },
  {
    id: "roma",
    name: "Рома",
    bio: "Modern crop. Текстура и молодёжные формы.",
    isActive: true,
  },
];

export const mockAdminServices: AdminService[] = [
  {
    id: "cut",
    title: "Мужская стрижка",
    description: "Чистая форма, укладка и финиш.",
    durationMinutes: 45,
    priceByn: 45,
    isActive: true,
  },
  {
    id: "cut-beard",
    title: "Мужская стрижка + борода",
    description: "Полный сет: волосы, борода, контуры.",
    durationMinutes: 70,
    priceByn: 70,
    isActive: true,
  },
  {
    id: "beard",
    title: "Борода",
    description: "Форма, контуры и уход.",
    durationMinutes: 30,
    priceByn: 30,
    isActive: true,
  },
];

export const mockAdminAssignments: AdminBarberService[] = [
  { id: "assignment-amir-cut", barberId: "amir", serviceId: "cut" },
  { id: "assignment-amir-combo", barberId: "amir", serviceId: "cut-beard" },
  { id: "assignment-maks-cut", barberId: "maks", serviceId: "cut" },
  { id: "assignment-maks-combo", barberId: "maks", serviceId: "cut-beard" },
  { id: "assignment-maks-beard", barberId: "maks", serviceId: "beard" },
  { id: "assignment-roma-cut", barberId: "roma", serviceId: "cut" },
];

export const mockAdminAvailability: AdminAvailability[] = [
  {
    id: "availability-amir-mon",
    barberId: "amir",
    weekday: 1,
    startTime: "10:00",
    endTime: "18:00",
    isGoAvailable: true,
  },
  {
    id: "availability-maks-tue",
    barberId: "maks",
    weekday: 2,
    startTime: "12:00",
    endTime: "20:00",
    isGoAvailable: true,
  },
  {
    id: "availability-roma-wed",
    barberId: "roma",
    weekday: 3,
    startTime: "11:00",
    endTime: "17:00",
    isGoAvailable: false,
  },
];

export const mockAdminBookings: AdminBooking[] = [
  {
    id: "admin-booking-1",
    userName: "Данил",
    barberId: "amir",
    serviceId: "cut",
    date: dateFromToday(0),
    startTime: "10:00",
    endTime: "10:45",
    status: "confirmed",
    type: "salon",
  },
  {
    id: "admin-booking-2",
    userName: "Илья",
    barberId: "maks",
    serviceId: "cut-beard",
    date: dateFromToday(1),
    startTime: "19:00",
    endTime: "20:10",
    status: "pending",
    type: "go",
  },
];
