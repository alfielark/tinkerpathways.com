"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ABOUT_CARDS } from "@/lib/content";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
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
            About us
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            More than just a charity
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate">
            We&apos;re building tools, curriculum, and community to make agentic
            engineering education accessible to every young person.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {ABOUT_CARDS.map((card, i) => {
            const isExternalLink = "href" in card && card.href?.startsWith("/");

            const content = (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                className="group relative rounded-2xl border border-ink/10 bg-paper p-8"
              >
                <h3 className="font-display text-2xl font-bold text-ink">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-blue transition-colors group-hover:text-blue-dark">
                  {card.action}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            );

            if (isExternalLink) {
              return (
                <Link key={card.title} href={card.href!}>
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}
