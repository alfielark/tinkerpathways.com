import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ABOUT_CARDS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: ABOUT_CARDS[0].description,
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <main className="content-width section-padding pt-36">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
            We&rsquo;re building something exciting. Project pages will be
            available soon with full details on everything we&rsquo;re working
            on.
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
        </div>
      </main>
    </>
  );
}
