"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/content";

function Counter({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="text-center">
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-display block text-4xl font-bold tracking-tight text-blue md:text-5xl"
      >
        {isInView ? (
          <AnimatedNumber target={value} decimals={decimals} />
        ) : (
          "0"
        )}
        {suffix}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-1 block text-sm text-slate"
      >
        {label}
      </motion.span>
    </div>
  );
}

function AnimatedNumber({
  target,
  decimals = 0,
}: {
  target: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const start = performance.now();
  const duration = 2000;

  function animate(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    if (ref.current) {
      ref.current.textContent = current.toLocaleString("en-GB", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      });
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  if (typeof window !== "undefined") {
    requestAnimationFrame(animate);
  }

  return <span ref={ref}>0</span>;
}

export function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`${i < 2 ? "block" : ""}`}
            >
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                decimals={"decimals" in stat ? stat.decimals : 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
