"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { STEPS } from "@/lib/content";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [pathD, setPathD] = useState("");
  const [svgViewBox, setSvgViewBox] = useState("0 0 1000 1000");
  const [maskCircles, setMaskCircles] = useState<Array<{x: number; y: number}>>([]);
  const [fadeTipOffset, setFadeTipOffset] = useState(100);

  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 70%"],
  });

  const pathProgress = useTransform(
    scrollYProgress,
    [0.05, 0.9],
    [0, 1],
  );

  // Track the draw head so the gradient fade stays at the tip.
  // The gradient uses objectBoundingBox (default), so 0% = top of
  // the path's bounding box, 100% = bottom. As pathLength clips the
  // path from the start, the draw head at progress p sits near p×100%
  // vertically. We fade the last ~10% before the tip to transparent.
  useMotionValueEvent(pathProgress, "change", (latest) => {
    setFadeTipOffset(Math.max(5, Math.round(latest * 100)));
  });

  // Each step reveals when its position crosses the 70% viewport line
  // Step 1 is always visible with no scroll animation
  const step2Opacity = useTransform(scrollYProgress, [0.43, 0.53], [0, 1]);
  const step2Y = useTransform(scrollYProgress, [0.43, 0.53], [40, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const step3Y = useTransform(scrollYProgress, [0.78, 0.88], [40, 0]);

  const stepOpacities = [undefined, step2Opacity, step3Opacity];
  const stepYs: (MotionValue<number> | undefined)[] = [
    undefined,
    step2Y,
    step3Y,
  ];

  // Measure square centres relative to the container and build the path
  // in literal pixel coordinates.
  // IMPORTANT: the step divs have a translateY transform applied via the
  // `style={{ y }}` prop, which shifts where getBoundingClientRect reports
  // them. We read the current motion-value Y and subtract it to get the
  // natural (un-translated) position — keeping the path stable regardless
  // of scroll position at measurement time.
  const updatePath = useCallback(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const positions = stepRefs.map((ref, i) => {
      const el = ref.current;
      if (!el) return null;
      const square = el.querySelector("[class*='size-20']");
      if (!square) return null;
      const rect = square.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      // Subtract the current Y transform so the path targets the natural
      // position, not the scroll-state-dependent translated position
      const yOffset = stepYs[i]?.get() ?? 0;
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top - yOffset,
      };
    });

    if (positions.some((p) => !p)) return;

    const [p1, p2, p3] = positions as { x: number; y: number }[];

    setSvgViewBox(`0 0 ${containerRect.width} ${containerRect.height}`);

    const dy12 = (p2.y - p1.y) / 3;
    const dy23 = (p3.y - p2.y) / 3;

    setPathD(
      `M ${p1.x},${p1.y} C ${p1.x},${p1.y + dy12} ${p2.x},${p2.y - dy12} ${p2.x},${p2.y} C ${p2.x},${p2.y + dy23} ${p3.x},${p3.y - dy23} ${p3.x},${p3.y}`,
    );

    // Store square centers for the mask (black circles hide the path behind squares)
    setMaskCircles([p1, p2, p3]);
  }, []);

  useEffect(() => {
    document.fonts?.ready?.then(() =>
      requestAnimationFrame(() => requestAnimationFrame(updatePath)),
    );

    const onPageLoad = () => {
      requestAnimationFrame(() => requestAnimationFrame(updatePath));
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(updatePath);
    });

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(updatePath);
      });
    });
    if (svgContainerRef.current) {
      ro.observe(svgContainerRef.current);
    }

    return () => {
      window.removeEventListener("load", onPageLoad);
      ro.disconnect();
    };
  }, [updatePath]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-32 text-center"
        >
          <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-blue">
            How it works
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            From first idea to first launch
          </h2>
        </motion.div>

        {/* Steps area with connecting path */}
        <div ref={svgContainerRef} className="relative">
          {/* Connecting SVG — hidden on mobile */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
            viewBox={svgViewBox}
            aria-hidden="true"
          >
            <defs>
              <mask id="path-mask">
                <rect width="100%" height="100%" fill="white" />
                {maskCircles.map((c, i) => (
                  <circle key={i} cx={c.x} cy={c.y} r="43" fill="black" />
                ))}
              </mask>
              <linearGradient id="fade-tip" x1="0" y1="0" x2="0" y2="1">
                <stop offset={`${Math.max(0, fadeTipOffset - 15)}%`} stopColor="#3B82F6" stopOpacity="1" />
                <stop offset={`${Math.min(100, fadeTipOffset)}%`} stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Single path with gradient — pathLength clips at the draw head,
                and the gradient fades the last ~15% before the draw head to
                transparent, so the end of the line always dissolves. */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#fade-tip)"
              strokeWidth="3"
              strokeLinecap="round"
              mask="url(#path-mask)"
              style={{ pathLength: pathProgress }}
            />
          </svg>

          {/* Steps */}
          {STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={step.number}
                ref={stepRefs[index]}
                className={`relative z-10 mb-16 flex flex-col items-center gap-8 last:mb-0 md:mb-96 md:flex-row md:gap-32 ${
                  isLeft ? "" : "md:flex-row-reverse"
                }`}
                style={
                  stepOpacities[index]
                    ? ({ opacity: stepOpacities[index], y: stepYs[index] } as const)
                    : undefined
                }
              >
                {/* Numbered square */}
                <div className="number-square flex size-20 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-blue bg-blue/[0.06] font-mono text-2xl font-bold text-blue">
                  {step.number}
                </div>

                {/* Content */}
                <div
                  className={`max-w-sm flex-1 ${isLeft ? "md:text-left" : "md:text-right"}`}
                >
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
