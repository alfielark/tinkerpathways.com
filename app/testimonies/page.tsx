import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatsBar } from "@/components/StatsBar";
import { TESTIMONIES_COPY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonies",
  description:
    "What students, teachers, and parents say about learning with Tinker Pathways. Quotes shown are illustrative placeholders.",
  alternates: {
    canonical: "/testimonies",
  },
};

export default function TestimoniesPage() {
  return (
    <>
      <main className="content-width section-padding pt-36">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Testimonies" }]}
        />

        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {TESTIMONIES_COPY.heading}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate">
            {TESTIMONIES_COPY.lede}
          </p>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-slate-light">
            {TESTIMONIES_COPY.disclaimer}
          </p>
        </div>

        <StatsBar />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIES_COPY.quotes.map((quote, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-ink/10 bg-paper p-8 transition-colors hover:border-blue/30"
            >
              <span className="mb-4 inline-flex w-fit rounded-full bg-blue/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-blue">
                {TESTIMONIES_COPY.placeholderBadge}
              </span>
              <blockquote className="flex-1 text-sm leading-relaxed text-slate">
                &ldquo;{quote.body}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-ink">
                — {quote.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}
