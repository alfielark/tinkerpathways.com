"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/content";

export function Hero() {
  const router = useRouter();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-5xl leading-tight font-bold tracking-tight text-ink md:text-7xl md:leading-tight">
            {SITE.name}
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-snug text-slate md:text-2xl">
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-light">
            {SITE.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                router.push("/projects");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-dark hover:shadow-lg hover:shadow-blue/25"
            >
              Explore our programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#get-involved"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#get-involved")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-ink/40 hover:bg-black/5"
            >
              Support our mission
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
