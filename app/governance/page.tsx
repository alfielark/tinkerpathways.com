import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Governance",
};

const STAFF = [
  {
    name: "Alfie Lark",
    role: "Executive Director, Chair",
    age: "16",
    bio: "Founder of Tinker Pathways. Built the charity from the ground up to give young people the tools to build the future, not just consume it.",
  },
  {
    name: "Jamie Singh",
    role: "Creative Director, Treasurer",
    age: "18",
    bio: "Leads design, brand, and financial strategy. Ensures everything we make is as beautiful as it is functional.",
  },
  {
    name: "Will Cave",
    role: "Secretary",
    age: "16",
    bio: "Keeps the charity running smoothly — governance, comms, and making sure nothing falls through the cracks.",
  },
] as const;

export default function GovernancePage() {
  return (
    <>
      <Navigation />
      <main className="section-padding mx-auto max-w-6xl pt-36">
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
            Our team
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Governance
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-slate">
            Built for students, by students. Tinker Pathways is run by a young
            team who know firsthand what it takes to learn, build, and lead.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {STAFF.map((person) => (
            <div
              key={person.name}
              className="relative rounded-2xl border border-ink/10 bg-white p-8 transition-colors hover:border-blue/30"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl font-bold text-ink">
                  {person.name}
                </h2>
                <span className="shrink-0 rounded-full bg-blue/10 px-3 py-1 text-xs font-medium text-blue">
                  Age {person.age}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-sm font-medium text-slate-dark">
                  {person.role}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {person.bio}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
