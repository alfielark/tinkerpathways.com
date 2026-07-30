"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NAV_ITEMS, SITE } from "@/lib/content";

export function Navigation() {
  const router = useRouter();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Edge blur overlay for the navbar — always on, fades bottom-to-clear */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 z-40 h-20"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 10%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 10%, transparent 100%)",
        }}
      />
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold tracking-tight text-ink"
        >
          {SITE.name}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-slate transition-colors hover:text-blue"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => router.push("/donate")}
            className="rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
          >
            Donate
          </button>
        </div>

        {/* Mobile menu toggle */}
        <MobileMenu />
      </div>
    </motion.nav>
    </>
  );
}

function MobileMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggle = () => {
    const menu = ref.current;
    if (!menu) return;
    const isOpen = menu.style.display === "flex";
    menu.style.display = isOpen ? "none" : "flex";
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    if (ref.current) ref.current.style.display = "none";
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        className="flex size-10 items-center justify-center text-ink"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div
        ref={ref}
        style={{ display: "none" }}
        className="absolute left-0 right-0 top-full flex flex-col gap-4 px-6 py-6 backdrop-blur-xl"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className="text-left text-sm font-medium text-slate transition-colors hover:text-blue"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => { ref.current!.style.display = "none"; router.push("/donate"); }}
          className="rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white"
        >
          Donate
        </button>
      </div>
    </div>
  );
}
