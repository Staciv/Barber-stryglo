import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { PhoneInput } from "./phone-input";

function ControlledPhoneInput({
  onChange,
}: {
  onChange?: (normalizedPhone: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <PhoneInput
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange?.(nextValue);
      }}
    />
  );
}

describe("PhoneInput", () => {
  it("renders fixed +375 prefix and formats the national part", () => {
    render(<PhoneInput value="+375291234567" onChange={vi.fn()} />);

    expect(screen.getByText("+375")).toBeTruthy();
    expect(screen.getByLabelText("Телефон").getAttribute("value")).toBe("29 123 45 67");
  });

  it.each(["29", "44", "33", "25"])("allows typing %s operator prefix", async (prefix) => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ControlledPhoneInput onChange={onChange} />);

    const input = screen.getByLabelText("Телефон");
    await user.type(input, prefix);

    expect(input.getAttribute("value")).toBe(prefix);
    expect(onChange).toHaveBeenLastCalledWith(`+375${prefix}`);
  });

  it("emits normalized +375 phone value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ControlledPhoneInput onChange={onChange} />);
    await user.type(screen.getByLabelText("Телефон"), "291234567");

    expect(onChange).toHaveBeenLastCalledWith("+375291234567");
  });

  it.each([
    ["291234567", "+375291234567"],
    ["+375291234567", "+375291234567"],
    ["80291234567", "+375291234567"],
  ])("normalizes pasted %s to %s", async (rawPhone, normalizedPhone) => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ControlledPhoneInput onChange={onChange} />);

    const input = screen.getByLabelText("Телефон");
    await user.click(input);
    await user.paste(rawPhone);

    expect(onChange).toHaveBeenLastCalledWith(normalizedPhone);
  });

  it("allows deleting characters", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ControlledPhoneInput onChange={onChange} />);

    const input = screen.getByLabelText("Телефон");
    await user.type(input, "291");
    await user.keyboard("{Backspace}");

    expect(input.getAttribute("value")).toBe("29");
    expect(onChange).toHaveBeenLastCalledWith("+37529");
  });

  it("replaces an invalid partial value with a newly entered full national number", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ControlledPhoneInput onChange={onChange} />);

    const input = screen.getByLabelText("Телефон");
    await user.type(input, "12345");
    await user.clear(input);
    await user.type(input, "331234567");

    expect(input.getAttribute("value")).toBe("331234567");
    expect(onChange).toHaveBeenLastCalledWith("+375331234567");
  });

  it("formats national part on blur", async () => {
    const user = userEvent.setup();

    render(<ControlledPhoneInput />);

    const input = screen.getByLabelText("Телефон");
    await user.type(input, "291234567");
    await user.tab();

    expect(input.getAttribute("value")).toBe("29 123 45 67");
  });

  it("shows invalid operator code after blur", async () => {
    const user = userEvent.setup();

    render(<PhoneInput value="+375991234567" onChange={vi.fn()} />);

    await user.click(screen.getByLabelText("Телефон"));
    await user.tab();

    expect(screen.getByText("Код оператора должен быть 25, 29, 33 или 44")).toBeTruthy();
  });
});
