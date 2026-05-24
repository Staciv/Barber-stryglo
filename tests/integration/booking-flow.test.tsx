import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingFlow } from "@/features/booking/booking-flow";
import { HaircutRecommendationFlow } from "@/features/recommendations/haircut-recommendation-flow";
import { useBookingStore } from "@/store/booking-store";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("booking integration flow", () => {
  beforeEach(() => {
    useBookingStore.getState().resetSelection();
    pushMock.mockReset();
  });

  it("completes a booking through the step-by-step flow", async () => {
    const user = userEvent.setup();
    render(<BookingFlow />);

    await user.click(screen.getByRole("button", { name: "Сегодня" }));
    await user.click(screen.getByRole("button", { name: "Выбрать время 12:00" }));
    await user.click(screen.getByRole("button", { name: "Выбрать барбера Любой" }));
    await user.click(screen.getByRole("button", { name: "Выбрать услугу Стрижка" }));
    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "+375291234567");
    await user.click(screen.getByRole("button", { name: "Подтвердить запись" }));

    expect(pushMock).toHaveBeenCalledWith("/confirmation");
    expect(useBookingStore.getState().completedBooking?.barberId).toBe("any");
  });

  it("allows selecting the fastest barber option", async () => {
    const user = userEvent.setup();
    render(<BookingFlow />);

    await user.click(screen.getByRole("button", { name: "Сегодня" }));
    await user.click(screen.getByRole("button", { name: "Выбрать время 18:00" }));

    expect(screen.getByRole("button", { name: "Выбрать барбера Любой" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Выбрать барбера Любой" }));

    expect(useBookingStore.getState().selection.barberId).toBe("any");
  });

  it("sends a recommendation into the booking state", async () => {
    const user = userEvent.setup();
    render(<HaircutRecommendationFlow />);

    await user.click(screen.getByRole("button", { name: "Выбрать стиль Fade Reset" }));
    await user.click(screen.getByRole("button", { name: "Продолжить с этим стилем" }));

    expect(useBookingStore.getState().selection.recommendedStyleId).toBe("fade-reset");
    expect(pushMock).toHaveBeenCalledWith("/booking");
  });

  it("shows validation errors when details are incomplete", async () => {
    const user = userEvent.setup();
    useBookingStore.setState({
      selection: {
        day: "today",
        time: "12:00",
        barberId: "any",
        serviceId: "cut",
      },
      completedBooking: undefined,
    });

    render(<BookingFlow />);
    await user.click(screen.getByRole("button", { name: "Подтвердить запись" }));

    expect(screen.getByText("Введите имя")).toBeInTheDocument();
    expect(screen.getByText("Введите телефон")).toBeInTheDocument();
  });

  it("prefills the booking state from mocked voice flow", () => {
    useBookingStore.getState().applyVoiceInput("Запиши меня завтра вечером");

    expect(useBookingStore.getState().selection.day).toBe("tomorrow");
    expect(useBookingStore.getState().selection.time).toBe("18:00");
    expect(useBookingStore.getState().selection.serviceId).toBe("cut");
  });

  it("opens a calendar and stores a custom date", async () => {
    const user = userEvent.setup();
    render(<BookingFlow />);

    await user.click(screen.getByRole("button", { name: "Выбрать дату" }));

    const dateInput = screen.getByLabelText("Выбери дату");
    expect(dateInput).toBeInTheDocument();

    await user.type(dateInput, "2026-03-20");

    expect(useBookingStore.getState().selection.day).toBe("custom");
    expect(useBookingStore.getState().selection.customDate).toBe("2026-03-20");
    expect(screen.getByRole("heading", { name: "Выбери слот" })).toBeInTheDocument();
  });

  it("handles unavailable barber state when time has no candidates", async () => {
    useBookingStore.setState({
      selection: {
        day: "today",
        time: "22:00",
      },
      completedBooking: undefined,
    });

    render(<BookingFlow />);

    expect(screen.getByText("На это время нет мастеров. Выбери другой слот.")).toBeInTheDocument();
  });
});
