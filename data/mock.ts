import type { Barber, HaircutStyle, Service, VoiceParseResult } from "@/types/booking";

export const services: Service[] = [
  {
    id: "cut",
    name: "Стрижка",
    duration: 45,
    price: 35,
    description: "Чисто, быстро, без лишнего ожидания.",
  },
  {
    id: "cut-beard",
    name: "Стрижка + борода",
    duration: 70,
    price: 48,
    description: "Полный апгрейд образа за один визит.",
  },
  {
    id: "beard",
    name: "Борода",
    duration: 30,
    price: 22,
    description: "Контур, форма и аккуратная детализация.",
  },
];

export const timeSlots = [
  "10:00",
  "11:30",
  "12:00",
  "13:30",
  "15:00",
  "17:00",
  "18:00",
  "19:30",
];

export const barbers: Barber[] = [
  {
    id: "any",
    name: "Любой",
    role: "Быстрее всего",
    bio: "Подберем первого свободного мастера.",
    experience: "Меньше ожидания",
    accent: "from-orange-500/30 via-orange-400/10 to-transparent",
    availableSlots: [...timeSlots],
  },
  {
    id: "amir",
    name: "Амир",
    role: "Fade / texture",
    bio: "Любит четкие линии и быстрые clean cuts.",
    experience: "6 лет опыта",
    accent: "from-orange-500/30 via-orange-300/15 to-transparent",
    availableSlots: ["10:00", "12:00", "15:00", "18:00"],
  },
  {
    id: "maks",
    name: "Макс",
    role: "Classic / beard",
    bio: "Спокойная классика и аккуратная борода.",
    experience: "8 лет опыта",
    accent: "from-sky-500/30 via-sky-300/10 to-transparent",
    availableSlots: ["11:30", "13:30", "17:00", "19:30"],
  },
  {
    id: "roma",
    name: "Рома",
    role: "Modern crop",
    bio: "Экспериментирует с текстурой и молодежным стилем.",
    experience: "4 года опыта",
    accent: "from-emerald-500/30 via-emerald-300/10 to-transparent",
    availableSlots: ["10:00", "12:00", "13:30", "18:00", "19:30"],
  },
];

export const haircutStyles: HaircutStyle[] = [
  {
    id: "street-crop",
    name: "Street Crop",
    match: 94,
    vibe: "Минимум ухода, максимум формы",
    accent: "from-orange-500 via-amber-300 to-zinc-900",
    note: "Смотрится дерзко и чисто даже через неделю.",
  },
  {
    id: "slick-flow",
    name: "Slick Flow",
    match: 88,
    vibe: "Чуть длиннее, premium casual",
    accent: "from-sky-500 via-slate-300 to-zinc-900",
    note: "Подойдет, если хочешь мягкий объем сверху.",
  },
  {
    id: "fade-reset",
    name: "Fade Reset",
    match: 91,
    vibe: "Четкий fade без лишнего шума",
    accent: "from-emerald-500 via-lime-300 to-zinc-900",
    note: "Безопасный вариант, если нужен wow без риска.",
  },
];

export const mockedVoiceResults: VoiceParseResult[] = [
  {
    transcript: "Запиши меня завтра вечером",
    day: "tomorrow",
    timePeriod: "evening",
    serviceId: "cut",
    summary: "Понял: завтра, вечер, стрижка",
  },
  {
    transcript: "Хочу сегодня днем на бороду",
    day: "today",
    timePeriod: "day",
    serviceId: "beard",
    summary: "Понял: сегодня, день, борода",
  },
  {
    transcript: "Завтра утром стрижка и борода",
    day: "tomorrow",
    timePeriod: "morning",
    serviceId: "cut-beard",
    summary: "Понял: завтра, утро, стрижка + борода",
  },
];
