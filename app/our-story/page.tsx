import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Story",
};

const TIMELINE = [
  {
    year: "Early 2026",
    title: "Three teenagers walk into a room",
    body: "Alfie, Jamie, and Will — three students with no formal experience, no funding, and no idea what they were doing — sat down and decided to build something that would let other young people tinker with the technologies shaping their future.",
  },
  {
    year: "Spring 2026",
    title: "First projects, first proof",
    body: "We started building. Interactive notebooks, agent prototypes, curriculum drafts — all open-source, all free. The more we built, the more we realised no one else was doing this for students our age.",
  },
  {
    year: "Summer 2026",
    title: "Tinker Pathways is founded",
    body: "Registered as a charity, we made it official. Three teenagers with no experience and a plan to make agentic engineering education accessible to every young person, regardless of background.",
  },
  {
    year: "2026 and beyond",
    title: "Just getting started",
    body: "We're building a full pathway from first experiment to first launch — interactive notebooks, open-source tooling, structured curricula, and a community of mentors. Built for students, by students.",
  },
] as const;

export default function OurStoryPage() {
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
            How we started
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Our Story
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate">
            Tinker Pathways was born from a simple belief: the next generation
            should build the future, not just consume it.
          </p>
        </div>

        <div className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-[2px] before:bg-blue/30">
          {TIMELINE.map((event) => (
            <div key={event.year} className="relative mb-12 last:mb-0">
              <div className="absolute -left-8 top-1.5 size-[26px] rounded-full border-2 border-blue bg-paper">
                <div className="mt-[5px] ml-[5px] size-[12px] rounded-full bg-blue" />
              </div>
              <span className="mb-2 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-blue">
                {event.year}
              </span>
              <h2 className="font-display text-xl font-bold text-ink">
                {event.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {event.body}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
