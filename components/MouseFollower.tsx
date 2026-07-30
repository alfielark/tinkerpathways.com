"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: small blue circle that follows the pointer exactly.
 * Hides the native cursor and renders above all other content.
 */
export function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none"
      style={{
        position: "fixed",
        zIndex: 99999,
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "#3B82F6",
        left: -100,
        top: -100,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
