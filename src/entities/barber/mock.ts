import type { BarberProfile } from "./types";

export const mockBarbers: BarberProfile[] = [
  {
    id: "amir",
    name: "Амир",
    specialization: "Fade / texture",
    bio: "Чёткие линии, быстрые clean cuts и спокойный темп.",
    serviceIds: ["cut", "cut-beard"],
    isActive: true,
  },
  {
    id: "maks",
    name: "Макс",
    specialization: "Classic / beard",
    bio: "Классика, борода и аккуратная детализация.",
    serviceIds: ["cut", "cut-beard", "beard"],
    isActive: true,
  },
  {
    id: "roma",
    name: "Рома",
    specialization: "Modern crop",
    bio: "Молодёжная текстура и мягкие современные формы.",
    serviceIds: ["cut"],
    isActive: true,
  },
];
