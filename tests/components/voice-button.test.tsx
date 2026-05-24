import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VoiceButton } from "@/components/voice-button";

describe("VoiceButton", () => {
  it("renders accessible button", () => {
    render(<VoiceButton />);

    expect(screen.getByRole("button", { name: "Голосовая запись" })).toBeInTheDocument();
  });

  it("handles click interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<VoiceButton onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Голосовая запись" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
