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

    const SPACING = 48;
    const WARP_RADIUS = 260;
    const WARP_RADIUS_SQ = WARP_RADIUS * WARP_RADIUS;
    const WARP_STRENGTH = 24;
    const LINE_OPACITY = 0.08;
    const STEP = 1;

    const getDocHeight = () =>
      Math.max(document.documentElement.scrollHeight, window.innerHeight);

    // ── Offscreen canvas for the static (unwarped) grid ────────────
    let staticCanvas: HTMLCanvasElement | null = null;
    let staticCtx: CanvasRenderingContext2D | null = null;
    let lastW = 0;
    let lastDocH = 0;

    const buildStaticGrid = (w: number, docH: number) => {
      if (staticCanvas && w === lastW && docH === lastDocH) return;
      lastW = w;
      lastDocH = docH;

      staticCanvas?.remove();
      staticCanvas = document.createElement("canvas");
      staticCanvas.width = w * dpr;
      staticCanvas.height = docH * dpr;
      staticCtx = staticCanvas.getContext("2d");
      if (!staticCtx) return;

      staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticCtx.strokeStyle = `rgba(0, 0, 0, ${LINE_OPACITY})`;
      staticCtx.lineWidth = 1;

      for (let x = 0; x < w; x += SPACING) {
        staticCtx.beginPath();
        staticCtx.moveTo(x, 0);
        staticCtx.lineTo(x, docH);
        staticCtx.stroke();
      }

      for (let y = 0; y < docH; y += SPACING) {
        staticCtx.beginPath();
        staticCtx.moveTo(0, y);
        staticCtx.lineTo(w, y);
        staticCtx.stroke();
      }
    };

    // ── Resize ──────────────────────────────────────────────────────
    const resize = () => {
      const docH = getDocHeight();
      const w = window.innerWidth;
      canvas.width = w * dpr;
      canvas.height = docH * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${docH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastW = 0;
      lastDocH = 0;
      buildStaticGrid(w, docH);
    };
    resize();

    window.addEventListener("resize", resize);

    const resizeObserver = new ResizeObserver(() => {
      const newH = getDocHeight();
      if (newH !== lastDocH) {
        lastW = 0;
        resize();
      }
    });
    resizeObserver.observe(document.body);

    // ── Mouse ───────────────────────────────────────────────────────
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // ── Warp helper ─────────────────────────────────────────────────
    const warpPoint = (
      px: number,
      py: number,
      mx: number,
      my: number,
    ): [number, number, number] => {
      const dx = px - mx;
      const dy = py - my;
      const sqDist = dx * dx + dy * dy;
      if (sqDist >= WARP_RADIUS_SQ || sqDist === 0) return [px, py, 0];
      const dist = Math.sqrt(sqDist);
      const t = 1 - dist / WARP_RADIUS;
      const s = t * t * WARP_STRENGTH;
      const angle = Math.atan2(dy, dx);
      return [px + Math.cos(angle) * s, py + Math.sin(angle) * s, t];
    };

    // ── Per-frame draw ──────────────────────────────────────────────
    const draw = () => {
      const w = window.innerWidth;
      const scrollY = window.scrollY;
      const mouse = mouseRef.current;
      const docH = getDocHeight();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, docH);

      if (!staticCanvas || w !== lastW || docH !== lastDocH) {
        buildStaticGrid(w, docH);
      }

      ctx.drawImage(staticCanvas!, 0, 0);

      const mouseDocX = mouse.x;
      const mouseDocY = mouse.y + scrollY;

      const cursorInView =
        mouse.x >= 0 &&
        mouse.x <= w &&
        mouse.y >= 0 &&
        mouse.y <= window.innerHeight;

      if (!cursorInView) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.lineWidth = 1;

      const warpLeft = mouseDocX - WARP_RADIUS;
      const warpRight = mouseDocX + WARP_RADIUS;
      const warpTop = mouseDocY - WARP_RADIUS;
      const warpBottom = mouseDocY + WARP_RADIUS;

      // Clear a margin around the warp zone so points pushed outward
      // by the warp don't overlap the static grid.
      const CLEAR_MARGIN = WARP_STRENGTH + 4;

      const clearLeft = Math.max(0, warpLeft - CLEAR_MARGIN);
      const clearRight = Math.min(w, warpRight + CLEAR_MARGIN);
      const clearTop = Math.max(0, warpTop - CLEAR_MARGIN);
      const clearBottom = Math.min(docH, warpBottom + CLEAR_MARGIN);

      ctx.clearRect(clearLeft, clearTop, clearRight - clearLeft, clearBottom - clearTop);

      // ── Vertical lines through the warp zone ──
      for (
        let x = Math.ceil(clearLeft / SPACING) * SPACING;
        x <= clearRight;
        x += SPACING
      ) {
        ctx.beginPath();
        let started = false;

        for (let y = clearTop; y <= clearBottom; y += STEP) {
          const [px, py, t] = warpPoint(x, y, mouseDocX, mouseDocY);
          ctx.strokeStyle =
            t > 0
              ? `rgba(59, 130, 246, ${0.04 + t * 0.12})`
              : `rgba(0, 0, 0, ${LINE_OPACITY})`;

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // ── Horizontal lines through the warp zone ──
      for (
        let y = Math.ceil(clearTop / SPACING) * SPACING;
        y <= clearBottom;
        y += SPACING
      ) {
        ctx.beginPath();
        let started = false;

        for (let x = clearLeft; x <= clearRight; x += STEP) {
          const [px, py, t] = warpPoint(x, y, mouseDocX, mouseDocY);
          ctx.strokeStyle =
            t > 0
              ? `rgba(59, 130, 246, ${0.04 + t * 0.12})`
              : `rgba(0, 0, 0, ${LINE_OPACITY})`;

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // ── Intersection dots ──
      const dotStartX = Math.max(
        0,
        Math.floor((mouseDocX - WARP_RADIUS) / SPACING) * SPACING,
      );
      const dotEndX = Math.min(
        w,
        Math.ceil((mouseDocX + WARP_RADIUS) / SPACING) * SPACING,
      );
      const dotStartY = Math.max(
        0,
        Math.floor((mouseDocY - WARP_RADIUS) / SPACING) * SPACING,
      );
      const dotEndY = Math.min(
        docH,
        Math.ceil((mouseDocY + WARP_RADIUS) / SPACING) * SPACING,
      );

      for (let gx = dotStartX; gx <= dotEndX; gx += SPACING) {
        for (let gy = dotStartY; gy <= dotEndY; gy += SPACING) {
          const dx = gx - mouseDocX;
          const dy = gy - mouseDocY;
          const sqDist = dx * dx + dy * dy;

          if (sqDist < WARP_RADIUS_SQ) {
            const dist = Math.sqrt(sqDist);
            const t = dist > 0 ? 1 - dist / WARP_RADIUS : 1;
            const s = t * t * WARP_STRENGTH;
            const angle = Math.atan2(dy, dx);
            const px = gx + (dist > 0 ? Math.cos(angle) * s : 0);
            const py = gy + (dist > 0 ? Math.sin(angle) * s : 0);

            ctx.beginPath();
            ctx.arc(px, py, 1.5 + t * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${t * 0.3})`;
            ctx.fill();
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
      resizeObserver.disconnect();
      staticCanvas?.remove();
      staticCanvas = null;
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
