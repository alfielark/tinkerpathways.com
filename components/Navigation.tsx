"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_ITEMS, SITE } from "@/lib/content";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The nav persists across page navigations — close the mobile menu on
  // route change (covers back/forward and programmatic navigation, since
  // link clicks already close it explicitly).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      {/* Edge blur overlay for the navbar — always on, fades bottom-to-clear */}
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-20"
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
        aria-label="Primary"
        className="fixed top-0 right-0 left-0 z-50 border-b border-transparent"
      >
        <div className="content-width flex items-center justify-between py-4">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            {SITE.name}
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-blue" : "text-slate hover:text-blue"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/donate"
              className="rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center text-ink"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div
              style={{ display: open ? "flex" : "none" }}
              className="absolute top-full right-0 left-0 flex-col gap-4 bg-paper/95 px-6 py-6 backdrop-blur-xl"
            >
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`text-left text-sm font-medium transition-colors ${
                      active ? "text-blue" : "text-slate hover:text-blue"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-blue px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
