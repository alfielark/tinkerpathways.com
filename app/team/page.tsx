import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Trustees & Team",
  description:
    "Built for students, by students — meet the young team running Tinker Pathways day-to-day, from product to finance to governance.",
  alternates: {
    canonical: "/team",
  },
};

const STAFF = [
  {
    name: "Alfie Crowley",
    role: "Founder, Chair",
    email: "alfie@tinkerpathways.com",
    bio: "Founder of Tinker Pathways. Built the charity from the ground up to give young people the tools to build the future, not just consume it.",
  },
  {
    name: "Will Cave",
    role: "Executive Director",
    email: "will@tinkerpathways.com",
    bio: "Keeps the charity running smoothly — governance, comms, and making sure nothing falls through the cracks.",
  },
  {
    name: "Jamie Singh",
    role: "Creative Director",
    email: "jamie@tinkerpathways.com",
    bio: "Leads design, brand, and financial strategy. Ensures everything we make is as beautiful as it is functional.",
  },
] as const;

export default function TeamPage() {
  return (
    <>
      <main className="content-width section-padding pt-36">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Trustees & Team" }]}
        />

        <div className="mb-16 max-w-2xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Trustees &amp; Team
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate">
            Built for students, by students. Tinker Pathways is run by a young
            team who know firsthand what it takes to learn, build, and lead.
          </p>
        </div>

        <div>
          {STAFF.map((person) => (
            <div
              key={person.name}
              className="border-t border-ink/10 py-8 first:border-t-0 first:pt-0 last:pb-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  {person.name}
                </h2>
                <a
                  href={`mailto:${person.email}`}
                  className="text-sm font-medium text-blue transition-colors hover:text-blue-dark"
                >
                  {person.email}
                </a>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-dark">
                {person.role}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
                {person.bio}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
