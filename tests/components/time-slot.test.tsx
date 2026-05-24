import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeSlot } from "@/components/time-slot";

describe("TimeSlot", () => {
  it("renders time and selected state", () => {
    render(<TimeSlot time="12:00" selected />);

    expect(screen.getByRole("button", { name: "Выбрать время 12:00" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Выбрано")).toBeInTheDocument();
  });

  it("fires click interactions", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<TimeSlot time="13:30" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Выбрать время 13:30" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports disabled state", () => {
    render(<TimeSlot time="15:00" disabled />);

    expect(screen.getByRole("button", { name: "Выбрать время 15:00" })).toBeDisabled();
  });
});
