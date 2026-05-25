import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { PhoneInput } from "./phone-input";

describe("PhoneInput", () => {
  it("renders fixed +375 prefix and formats the national part", () => {
    render(<PhoneInput value="+375291234567" onChange={vi.fn()} />);

    expect(screen.getByText("+375")).toBeTruthy();
    expect(screen.getByLabelText("Телефон").getAttribute("value")).toBe("29 123 45 67");
  });

  it("emits normalized +375 phone value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function ControlledPhoneInput() {
      const [value, setValue] = useState("");

      return (
        <PhoneInput
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            onChange(nextValue);
          }}
        />
      );
    }

    render(<ControlledPhoneInput />);

    await user.type(screen.getByLabelText("Телефон"), "291234567");

    expect(onChange).toHaveBeenLastCalledWith("+375291234567");
  });

  it("shows invalid operator code after blur", async () => {
    const user = userEvent.setup();

    render(<PhoneInput value="+375991234567" onChange={vi.fn()} />);

    await user.click(screen.getByLabelText("Телефон"));
    await user.tab();

    expect(screen.getByText("Код оператора должен быть 25, 29, 33 или 44")).toBeTruthy();
  });
});
