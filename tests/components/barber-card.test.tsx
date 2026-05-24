import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BarberCard } from "@/components/barber-card";
import { barbers } from "@/data/mock";

describe("BarberCard", () => {
  it("renders barber details", () => {
    render(<BarberCard barber={barbers[1]} />);

    expect(screen.getByRole("button", { name: "Выбрать барбера Амир" })).toBeInTheDocument();
    expect(screen.getByText("Fade / texture")).toBeInTheDocument();
  });

  it("shows selected state", () => {
    render(<BarberCard barber={barbers[0]} selected />);

    expect(screen.getByRole("button", { name: "Выбрать барбера Любой" })).toHaveAttribute("aria-pressed", "true");
  });

  it("handles click interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BarberCard barber={barbers[2]} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Выбрать барбера Макс" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
