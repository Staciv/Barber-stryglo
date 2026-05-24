import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Slot, SlotsByDate } from "@/entities/slot/types";
import { SlotSelector } from "./slot-selector";

const availableSlot: Slot = {
  id: "slot-available",
  date: "2026-05-24",
  startTime: "10:00",
  endTime: "10:45",
  barberId: "amir",
  isAvailable: true,
  maxDurationMinutes: 45,
};

const unavailableSlot: Slot = {
  id: "slot-unavailable",
  date: "2026-05-24",
  startTime: "12:00",
  endTime: "12:45",
  barberId: "amir",
  isAvailable: false,
  maxDurationMinutes: 45,
};

const groups: SlotsByDate[] = [
  {
    date: "2026-05-24",
    label: "Сегодня",
    slots: [availableSlot, unavailableSlot],
  },
];

describe("SlotSelector", () => {
  it("renders available slots and hides unavailable slots", () => {
    render(<SlotSelector groups={groups} onSelectSlot={vi.fn()} />);

    expect(screen.getByRole("button", { name: /10:00/ })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /12:00/ })).toBeNull();
  });

  it("calls onSelectSlot when a slot is selected", async () => {
    const user = userEvent.setup();
    const onSelectSlot = vi.fn();

    render(<SlotSelector groups={groups} onSelectSlot={onSelectSlot} />);

    await user.click(screen.getByRole("button", { name: /10:00/ }));

    expect(onSelectSlot).toHaveBeenCalledWith(availableSlot);
  });

  it("marks selected slot with aria-pressed", () => {
    render(
      <SlotSelector
        groups={groups}
        selectedSlotId={availableSlot.id}
        onSelectSlot={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /10:00/ }).getAttribute("aria-pressed")).toBe("true");
  });

  it("shows empty state when no slots are available", () => {
    render(<SlotSelector groups={[]} onSelectSlot={vi.fn()} />);

    expect(screen.getByText("Свободных слотов нет")).toBeTruthy();
  });
});
