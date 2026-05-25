import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("framer-motion", async () => {
  const createMock = (tag: React.ElementType) => {
    const MockMotion = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(
      (
        {
          children,
          animate: _animate,
          exit: _exit,
          initial: _initial,
          layout: _layout,
          transition: _transition,
          whileTap: _whileTap,
          ...props
        },
        ref,
      ) => React.createElement(tag, { ...props, ref }, children),
    );
    MockMotion.displayName = `MockMotion(${String(tag)})`;

    return MockMotion;
  };

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: {
      button: createMock("button"),
      div: createMock("div"),
      section: createMock("section"),
      header: createMock("header"),
    },
  };
});
