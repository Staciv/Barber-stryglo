import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("framer-motion", async () => {
  const createMock = (tag: React.ElementType) =>
    React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) =>
      React.createElement(tag, { ...props, ref }, children),
    );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: {
      div: createMock("div"),
      section: createMock("section"),
      header: createMock("header"),
    },
  };
});
