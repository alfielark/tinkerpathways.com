"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STEPS } from "@/lib/content";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
} as const;

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  return (
    <section
      id="how-it-works"
      ref={sectionRef}
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
            How it works
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            From first idea to first launch
          </h2>
        </motion.div>


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative grid gap-8 md:grid-cols-3 md:gap-12"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="relative p-8"
            >
              {/* Numbered circle */}
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-blue/[0.08] font-mono text-sm font-semibold text-blue">
                {step.number}
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
