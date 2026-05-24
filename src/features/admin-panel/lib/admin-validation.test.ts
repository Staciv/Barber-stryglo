import { describe, expect, it } from "vitest";
import { hasDuplicateAssignment, isEndAfterStart } from "./admin-validation";

describe("admin validation", () => {
  it("detects duplicate barber service assignments", () => {
    const assignments = [
      { id: "assignment-1", barberId: "amir", serviceId: "cut" },
    ];

    expect(hasDuplicateAssignment(assignments, "amir", "cut")).toBe(true);
    expect(hasDuplicateAssignment(assignments, "amir", "beard")).toBe(false);
  });

  it("validates schedule time ranges", () => {
    expect(isEndAfterStart("10:00", "18:00")).toBe(true);
    expect(isEndAfterStart("18:00", "10:00")).toBe(false);
    expect(isEndAfterStart("10:00", "10:00")).toBe(false);
  });
});
