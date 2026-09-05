import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SITE, WAITLIST_COPY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Waitlist",
  description:
    "Join the waitlist for the AI block-coding education tool we're working on.",
  alternates: {
    canonical: "/waitlist",
  },
};

export default function WaitlistPage() {
  return (
    <>
      <main className="content-width section-padding pt-36">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Waitlist" }]}
        />

        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {WAITLIST_COPY.heading}
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-slate">
            {WAITLIST_COPY.lede}
          </p>
        </div>

        <WaitlistForm />

        <p className="mt-8 text-xs leading-relaxed text-slate-light">
          {WAITLIST_COPY.contactFallback}{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-blue underline hover:text-blue-dark"
          >
            {SITE.email}
          </a>
        </p>
      </main>
    </>
  );
}
