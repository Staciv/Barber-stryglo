import type { Service } from "./types";

export const mockServices: Service[] = [
  {
    id: "cut",
    name: "Стрижка",
    durationMinutes: 45,
    priceByn: 35,
  },
  {
    id: "cut-beard",
    name: "Стрижка + борода",
    durationMinutes: 70,
    priceByn: 48,
  },
  {
    id: "beard",
    name: "Борода",
    durationMinutes: 30,
    priceByn: 22,
  },
];
