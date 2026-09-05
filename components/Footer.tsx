"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CTA, SITE, FOOTER_COLUMNS } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <footer className="py-16 md:py-20">
      <div className="content-width">
        {/* CTA card */}
        <div
          ref={ctaRef}
          id="get-involved"
          className="relative mb-16 overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center shadow-card md:mb-20 md:px-16 md:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 70% 90% at 50% 100%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 90% at 50% 100%, black, transparent)",
            }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display relative text-3xl font-bold tracking-tight text-balance text-paper md:text-5xl"
          >
            {CTA.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/70"
          >
            {CTA.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-xl bg-blue px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-dark hover:shadow-lg hover:shadow-blue/25"
            >
              {CTA.donateLabel}
            </Link>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Volunteering with Tinker Pathways")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-paper/25 px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:border-paper/60 hover:bg-white/5"
            >
              {CTA.volunteerLabel}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="relative mt-6 text-xs text-paper/50"
          >
            Your donation is likely eligible for Gift Aid. We never share your
            data.
          </motion.p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight text-ink"
            >
              {SITE.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-xs text-slate-light">
              {SITE.charityNumber}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={`Footer — ${column.heading}`}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-light">
                {column.heading}
              </h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-sm text-slate transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 pt-8 text-center text-xs text-slate-light">
          &copy; {year} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
