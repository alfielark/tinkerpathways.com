"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { GridBackground } from "./GridBackground";

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Keying on pathname destroys the old Lenis instance and creates a
          fresh one on every page navigation, so the virtual scroll height
          always matches the current page content. */}
      <ReactLenis
        key={pathname}
        root
        options={{
          lerp: 0.08,
          duration: 1.3,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        }}
      >
        <div className="relative z-10">
          <GridBackground />
          {children}
        </div>
      </ReactLenis>
    </>
  );
}
