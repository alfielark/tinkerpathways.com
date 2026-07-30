"use client";

import { useEffect, useRef } from "react";

export function WarpGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -10000, y: -10000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const getDocHeight = () =>
      Math.max(document.documentElement.scrollHeight, window.innerHeight);

    const resize = () => {
      const docH = getDocHeight();
      canvas.width = window.innerWidth * dpr;
      canvas.height = docH * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${docH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    setTimeout(resize, 100);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Params
    const SPACING = 48;
    const WARP_RADIUS = 260;
    const WARP_STRENGTH = 24;
    const LINE_OPACITY = 0.08;

    const draw = () => {
      const w = window.innerWidth;
      const scrollY = window.scrollY;
      const mouse = mouseRef.current;
      const docH = getDocHeight();

      ctx.clearRect(0, 0, w, docH);

      // Convert mouse to document-space
      const mouseDocX = mouse.x;
      const mouseDocY = mouse.y + scrollY;

      const cursorInView =
        mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= window.innerHeight;

      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < w; x += SPACING) {
        ctx.beginPath();
        let started = false;

        for (let y = 0; y < docH; y += 1.5) {
          const dx = x - mouseDocX;
          const dy = y - mouseDocY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let px = x;
          let py = y;

          if (dist < WARP_RADIUS && dist > 0) {
            const t = 1 - dist / WARP_RADIUS;
            const strength = t * t * WARP_STRENGTH;
            const angle = Math.atan2(dy, dx);
            px += Math.cos(angle) * strength;
            py += Math.sin(angle) * strength;

            ctx.strokeStyle = `rgba(59, 130, 246, ${0.04 + t * 0.12})`;
          } else {
            ctx.strokeStyle = `rgba(0, 0, 0, ${LINE_OPACITY})`;
          }

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < docH; y += SPACING) {
        ctx.beginPath();
        let started = false;

        for (let x = -SPACING; x < w + SPACING; x += 1.5) {
          const dx = x - mouseDocX;
          const dy = y - mouseDocY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let px = x;
          let py = y;

          if (dist < WARP_RADIUS && dist > 0) {
            const t = 1 - dist / WARP_RADIUS;
            const strength = t * t * WARP_STRENGTH;
            const angle = Math.atan2(dy, dx);
            px += Math.cos(angle) * strength;
            py += Math.sin(angle) * strength;

            ctx.strokeStyle = `rgba(59, 130, 246, ${0.04 + t * 0.12})`;
          } else {
            ctx.strokeStyle = `rgba(0, 0, 0, ${LINE_OPACITY})`;
          }

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Intersection dots (document-space)
      if (cursorInView) {
        const startX = Math.max(0, Math.floor((mouseDocX - WARP_RADIUS) / SPACING) * SPACING);
        const endX = Math.min(w, Math.ceil((mouseDocX + WARP_RADIUS) / SPACING) * SPACING);
        const startY = Math.max(0, Math.floor((mouseDocY - WARP_RADIUS) / SPACING) * SPACING);
        const endY = Math.min(docH, Math.ceil((mouseDocY + WARP_RADIUS) / SPACING) * SPACING);

        for (let gx = startX; gx <= endX; gx += SPACING) {
          for (let gy = startY; gy <= endY; gy += SPACING) {
            const dx = gx - mouseDocX;
            const dy = gy - mouseDocY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < WARP_RADIUS) {
              let px = gx;
              let py = gy;

              if (dist > 0) {
                const t = 1 - dist / WARP_RADIUS;
                const strength = t * t * WARP_STRENGTH;
                const angle = Math.atan2(dy, dx);
                px += Math.cos(angle) * strength;
                py += Math.sin(angle) * strength;
              }

              const alpha = Math.max(0, 1 - dist / WARP_RADIUS);

              ctx.beginPath();
              ctx.arc(px, py, 1.5 + alpha * 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.3})`;
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
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
