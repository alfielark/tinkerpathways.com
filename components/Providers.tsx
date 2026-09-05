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
      {/* overflow-clip keeps absolutely-positioned decor (e.g. the
          full-document-height grid canvas) from extending the page's
          scrollable overflow, so document height always reflects the
          current page content. clip (not hidden) avoids creating a
          scroll container or trapping fixed descendants. */}
      <div className="relative z-10 overflow-clip">
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
          <div className="page-transition">{children}</div>
        </ReactLenis>
        <Footer />
      </div>
    </>
  );
}
