"use client";

import { SITE, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-lg font-bold tracking-tight text-ink">
              {SITE.name}
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-xs text-slate-light">
              {SITE.charityNumber}
              <br />
              {SITE.registeredAddress}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-light">
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-light">
              Connect
            </h4>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 text-center text-xs text-slate-light">
          &copy; {year} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
