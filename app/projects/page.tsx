import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="section-padding mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center pt-36 text-center">
        <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-blue">
          Our work
        </span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
          We&rsquo;re building something exciting. Project pages will be available
          soon with full details on everything we&rsquo;re working on.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-blue"
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
      </main>
      <Footer />
    </>
  );
}
