import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HaircutCard } from "@/components/haircut-card";
import { haircutStyles } from "@/data/mock";

describe("HaircutCard", () => {
  it("renders style information", () => {
    render(<HaircutCard style={haircutStyles[0]} />);

    expect(screen.getByRole("button", { name: "Выбрать стиль Street Crop" })).toBeInTheDocument();
    expect(screen.getByText("94% match")).toBeInTheDocument();
  });

  it("shows selected state", () => {
    render(<HaircutCard style={haircutStyles[1]} selected />);

    expect(screen.getByRole("button", { name: "Выбрать стиль Slick Flow" })).toHaveAttribute("aria-pressed", "true");
  });

  it("handles click interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<HaircutCard style={haircutStyles[2]} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Выбрать стиль Fade Reset" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
