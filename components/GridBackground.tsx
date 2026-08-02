"use client";

import { useEffect, useRef } from "react";

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const SPACING = 48;
    const LINE_OPACITY = 0.08;

    const getDocHeight = () =>
      Math.max(document.documentElement.scrollHeight, window.innerHeight);

    const draw = () => {
      const w = window.innerWidth;
      const docH = getDocHeight();

      canvas.width = w * dpr;
      canvas.height = docH * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${docH}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, docH);
      ctx.strokeStyle = `rgba(0, 0, 0, ${LINE_OPACITY})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += SPACING) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, docH);
        ctx.stroke();
      }

      for (let y = 0; y < docH; y += SPACING) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    draw();
    window.addEventListener("resize", draw);

    // Redraw if the document height changes (content shifts, fonts load).
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", draw);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
