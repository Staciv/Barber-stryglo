export type Slot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  barberId?: string;
  maxDurationMinutes: number;
  isAvailable: boolean;
};

export type SlotsByDate = {
  date: string;
  label: string;
  slots: Slot[];
};
