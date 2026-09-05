import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Founded in 2026 by three teenagers with no experience and a plan. Tinker Pathways was born from a simple belief: the next generation should build the future, not just consume it.",
  alternates: {
    canonical: "/our-story",
  },
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
      <main className="content-width section-padding pt-36">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
        />

        <div className="mb-16">
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
    </>
  );
}
