import {
  createBookingRecord,
  formatHumanDate,
  getApproximateTimeSlot,
  getAvailableBarbers,
  getDayLabel,
  getNextStep,
  parseVoiceTranscript,
  validateBookingDetails,
} from "@/lib/booking";

describe("booking helpers", () => {
  it("advances through booking steps based on selection", () => {
    expect(getNextStep({})).toBe("day");
    expect(getNextStep({ day: "today" })).toBe("time");
    expect(getNextStep({ day: "today", time: "12:00" })).toBe("barber");
    expect(getNextStep({ day: "today", time: "12:00", barberId: "amir" })).toBe("service");
    expect(getNextStep({ day: "today", time: "12:00", barberId: "amir", serviceId: "cut" })).toBe("details");
  });

  it("filters barbers by selected time", () => {
    const result = getAvailableBarbers("13:30");

    expect(result.map((barber) => barber.id)).toEqual(["any", "maks", "roma"]);
  });

  it("returns an empty list when no time is selected", () => {
    expect(getAvailableBarbers(undefined)).toEqual([]);
  });

  it("parses mocked voice intent into prefill values", () => {
    const result = parseVoiceTranscript("Запиши меня завтра вечером");

    expect(result.day).toBe("tomorrow");
    expect(result.timePeriod).toBe("evening");
    expect(result.serviceId).toBe("cut");
    expect(result.summary).toContain("завтра");
  });

  it("parses fallback voice phrases heuristically", () => {
    const result = parseVoiceTranscript("Хочу сегодня днем на бороду");

    expect(result.day).toBe("today");
    expect(result.timePeriod).toBe("day");
    expect(result.serviceId).toBe("beard");
  });

  it("maps approximate time periods into time slots", () => {
    expect(getApproximateTimeSlot("morning")).toBe("10:00");
    expect(getApproximateTimeSlot("day")).toBe("13:30");
    expect(getApproximateTimeSlot("evening")).toBe("18:00");
  });

  it("validates booking details", () => {
    expect(validateBookingDetails({ customerName: "Илья", phone: "+375291234567" }).success).toBe(true);
    expect(validateBookingDetails({ customerName: "И", phone: "bad" }).success).toBe(false);
  });

  it("formats day labels", () => {
    expect(getDayLabel("today")).toContain("Сегодня");
    expect(getDayLabel("tomorrow")).toContain("Завтра");
    expect(getDayLabel("custom", "2026-03-20")).toContain("20");
  });

  it("formats human-readable dates", () => {
    expect(formatHumanDate("2026-03-20")).toContain("20");
    expect(formatHumanDate("bad-date")).toBe("bad-date");
  });

  it("creates booking records only when selection is complete", () => {
    expect(createBookingRecord({ day: "today" })).toBeNull();

    const record = createBookingRecord({
      day: "today",
      time: "12:00",
      barberId: "any",
      serviceId: "cut",
      customerName: "Илья",
      phone: "+375291234567",
    });

    expect(record).not.toBeNull();
    expect(record?.serviceId).toBe("cut");
  });

  it("blocks invalid records when barber is unavailable for selected time", () => {
    const record = createBookingRecord({
      day: "today",
      time: "11:30",
      barberId: "amir",
      serviceId: "cut",
      customerName: "Илья",
      phone: "+375291234567",
    });

    expect(record).toBeNull();
  });

  it("returns barber step when a stale barber no longer matches selected time", () => {
    expect(getNextStep({ day: "today", time: "11:30", barberId: "amir" })).toBe("barber");
  });
});
