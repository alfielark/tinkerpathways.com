"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { WarpGrid } from "./WarpGrid";
import { MouseFollower } from "./MouseFollower";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactLenis
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
          <WarpGrid />
          {children}
        </div>
      </ReactLenis>
      <MouseFollower />
    </>
  );
}
