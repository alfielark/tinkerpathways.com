"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MISSION } from "@/lib/content";

export function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="mission"
      ref={ref}
      className="section-padding"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display text-center text-3xl leading-tight font-bold tracking-tight text-ink md:text-4xl md:leading-tight"
        >
          {MISSION.heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-10 space-y-5"
        >
          {MISSION.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-slate md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
