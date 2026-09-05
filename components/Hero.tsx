"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="content-width relative z-10 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-6xl leading-[1.02] font-bold tracking-tight text-ink md:text-8xl">
            Tinker{" "}
            <span className="relative inline-block text-blue">
              Pathways
              <svg
                className="absolute -bottom-3.5 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 180 3 298 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-blue/40"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-snug font-medium text-slate-dark md:text-2xl">
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
            {SITE.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-dark hover:shadow-lg hover:shadow-blue/25"
            >
              Explore our programs
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/20 bg-paper/60 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition-all hover:border-blue/50 hover:text-blue"
            >
              Join the waitlist
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="sr-only">Active learners</dt>
              <dd className="font-display text-2xl font-bold text-ink tabular-nums">
                12+
              </dd>
              <dd className="mt-1 font-mono text-[11px] tracking-wider text-slate uppercase">
                Active learners
              </dd>
            </div>
            <div>
              <dt className="sr-only">Partner schools</dt>
              <dd className="font-display text-2xl font-bold text-ink tabular-nums">
                2+
              </dd>
              <dd className="mt-1 font-mono text-[11px] tracking-wider text-slate uppercase">
                Partner schools
              </dd>
            </div>
            <div>
              <dt className="sr-only">Average rating</dt>
              <dd className="font-display text-2xl font-bold text-ink tabular-nums">
                4.9★
              </dd>
              <dd className="mt-1 font-mono text-[11px] tracking-wider text-slate uppercase">
                Average rating
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
