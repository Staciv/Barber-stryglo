export type DayOption = "today" | "tomorrow" | "custom";
export type TimePeriod = "morning" | "day" | "evening";

export type BookingStep = "day" | "time" | "barber" | "service" | "details";

export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
};

export type Barber = {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  accent: string;
  availableSlots: string[];
};

export type HaircutStyle = {
  id: string;
  name: string;
  match: number;
  vibe: string;
  accent: string;
  note: string;
};

export type VoiceParseResult = {
  transcript: string;
  day: DayOption;
  timePeriod?: TimePeriod;
  serviceId: string;
  summary: string;
};

export type BookingSelection = {
  day?: DayOption;
  customDate?: string;
  time?: string;
  barberId?: string;
  serviceId?: string;
  customerName?: string;
  phone?: string;
  recommendedStyleId?: string;
  voiceSummary?: string;
};

export type BookingRecord = Required<
  Pick<BookingSelection, "day" | "time" | "barberId" | "serviceId" | "customerName" | "phone">
> &
  Pick<BookingSelection, "customDate" | "recommendedStyleId" | "voiceSummary"> & {
    createdAt: string;
  };
