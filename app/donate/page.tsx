import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Donate",
};

export default function DonatePage() {
  return (
    <>
      <Navigation />
      <main className="section-padding mx-auto max-w-3xl pt-36">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-blue"
          >
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>

        <div className="mb-16">
          <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-blue">
            Support our work
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Make a donation
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate">
            Every contribution goes directly toward building free tools and
            resources for students. Tinker Pathways is a registered charity,
            so your donation is likely eligible for Gift Aid.
          </p>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-paper p-8">
          <h2 className="font-display text-xl font-bold text-ink">
            Bank transfer
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            The easiest way to donate is by bank transfer. Use the details below
            and include your name as a reference so we can thank you.
          </p>

          <dl className="mt-6 space-y-4">
            <div className="flex items-baseline justify-between border-b border-ink/5 pb-3">
              <dt className="text-sm font-medium text-slate">Account name</dt>
              <dd className="font-mono text-sm text-ink">Tinker Pathways</dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-ink/5 pb-3">
              <dt className="text-sm font-medium text-slate">Sort code</dt>
              <dd className="font-mono text-sm text-ink">00-00-00</dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-ink/5 pb-3">
              <dt className="text-sm font-medium text-slate">Account number</dt>
              <dd className="font-mono text-sm text-ink">00000000</dd>
            </div>
          </dl>
        </div>

        <p className="mt-8 text-xs text-slate-light">
          If you&apos;d like to discuss a larger gift, corporate sponsorship, or
          legacy giving, please{" "}
          <a href="mailto:hello@tinkerpathways.com" className="text-blue underline hover:text-blue-dark">
            get in touch
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
