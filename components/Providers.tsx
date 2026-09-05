"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { GridBackground } from "./GridBackground";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="relative z-10">
        <GridBackground />
        <Navigation />
        {/* Keying on pathname destroys the old Lenis instance and creates a
            fresh one on every page navigation, so the virtual scroll height
            always matches the current page content. Only the page content
            sits inside the keyed subtree — the background, nav, and footer
            stay mounted, so their animations never replay on navigation. */}
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
          {children}
        </ReactLenis>
        <Footer />
      </div>
    </>
  );
}
