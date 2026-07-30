"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CTA } from "@/lib/content";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="get-involved"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
        >
          {CTA.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate"
        >
          {CTA.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-xl bg-blue px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-dark hover:shadow-lg hover:shadow-blue/25"
          >
            {CTA.donateLabel}
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:border-ink/40 hover:bg-black/5"
          >
            {CTA.volunteerLabel}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="mt-6 text-xs text-slate-light"
        >
          Your donation is likely eligible for Gift Aid. We never share your data.
        </motion.p>
      </div>
    </section>
  );
}
