import "@testing-library/jest-dom/vitest";
import { createElement, Fragment } from "react";

/**
 * Global framer-motion mock.
 * All motion.* components render as plain HTML elements via a Proxy.
 * Animation/scroll hooks are no-ops.
 */
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");

  const motion = new Proxy(
    {},
    {
      get: (_target, tag: unknown) => {
        const name = String(tag);
        const MotionComponent = ({ children, ...props }: any) => {
          const {
            initial,
            animate,
            variants,
            custom,
            whileInView,
            exit,
            layout,
            layoutId,
            onAnimationComplete,
            transition,
            ...safe
          } = props;
          return createElement(name, safe, children);
        };
        MotionComponent.displayName = `motion.${name}`;
        return MotionComponent;
      },
    }
  );

  return {
    ...actual,
    motion,
    useScroll: () => ({ scrollY: { onChange() {}, get() { return 0; } } }),
    useMotionValueEvent() {},
    useInView: () => true,
    AnimatePresence({ children }: any) {
      return createElement(Fragment, null, children);
    },
  };
});

vi.mock("lenis/react", () => ({
  ReactLenis({ children }: { children: React.ReactNode }) {
    return createElement(Fragment, null, children);
  },
}));

// Mock next/font/google to prevent suspense in test
vi.mock("next/font/google", () => ({
  Space_Grotesk: () => ({ variable: "--font-display" }),
  Inter: () => ({ variable: "--font-sans" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
}));
