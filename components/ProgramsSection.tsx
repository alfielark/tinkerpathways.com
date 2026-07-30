"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { PROGRAMS } from "@/lib/content";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export function ProgramsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="programs"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-blue">
            Our programs
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            A pathway for every stage
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate">
            Three tracks, each designed for a different age group and skill level.
            Students progress at their own pace, with support from mentors and peers.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.name}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative p-8"
            >
              <div className="mt-2">
                <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate">
                  {program.audience}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                {program.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate">
                {program.description}
              </p>

              <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-blue transition-colors group-hover:text-blue-dark">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
