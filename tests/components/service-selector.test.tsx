import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceSelector } from "@/components/service-selector";
import { services } from "@/data/mock";

describe("ServiceSelector", () => {
  it("renders services", () => {
    render(<ServiceSelector services={services} onSelect={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Выбрать услугу Стрижка" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Выбрать услугу Борода" })).toBeInTheDocument();
  });

  it("shows selected service", () => {
    render(<ServiceSelector services={services} selectedServiceId="cut" onSelect={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Выбрать услугу Стрижка" })).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ServiceSelector services={services} onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "Выбрать услугу Стрижка + борода" }));

    expect(onSelect).toHaveBeenCalledWith("cut-beard");
  });
});
