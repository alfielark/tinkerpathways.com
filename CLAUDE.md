# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Next.js dev server at localhost:3000
npm run build      # Production build (includes TypeScript check)
npm run test       # Run all Vitest tests once
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npx vitest run <path>  # Run a single test file, e.g. npx vitest run components/Hero.test.tsx
```

## Tech Stack

- **Next.js 16** (App Router) — React framework
- **React 19** — UI library
- **Tailwind CSS v4** — utility-first CSS (`@theme inline` tokens in `app/globals.css`, custom `section-padding` / `content-width` utilities)
- **TypeScript** — strict mode, `@/*` path alias for repo root
- **Framer Motion 12** — scroll-triggered reveals (`useInView`), scroll-linked path drawing (`useScroll`/`useTransform`)
- **Lenis 1.x** — smooth scrolling via `ReactLenis` root wrapper in `Providers` (lerp 0.08, duration 1.3, `smoothWheel`, `touchMultiplier` 1.5; keyed on pathname so the Lenis instance resets on page navigation)
- **Vitest 4 + jsdom** — tests live alongside components as `**/*.test.{ts,tsx}`; `@vitejs/plugin-react`, `globals: true`
- **Fonts**: Space Grotesk (`--font-display`), Inter (`--font-sans`), JetBrains Mono (`--font-mono`) — loaded via `next/font/google` in `app/layout.tsx` plus explicit `@fontsource` weight files in `globals.css`

## Design System

Black-and-white aesthetic with a single blue accent (#3B82F6) and a red signal (#DC2626). Tokens in `globals.css` via `@theme inline`: `ink`, `ink-light`, `paper`, `paper-dark`, `blue`/`blue-dark`/`blue-light`, `slate`/`slate-light`/`slate-dark`, `signal`, plus `shadow-card` / `shadow-card-hover`.

- Native scrollbar hidden globally (`scrollbar-width: none`); scrolling works via Lenis/wheel/keyboard
- Lenis CSS rules (`html.lenis`, `.lenis-smooth`, `[data-lenis-prevent]`) for scroll interop
- `prefers-reduced-motion: reduce` keeps `scroll-behavior: auto`

## Layout System

### Root layout (`app/layout.tsx`)
Server Component. Sets full SEO metadata (title template `"%s — Tinker Pathways"`, OpenGraph `en_GB`, Twitter card, canonical, robots, manifest, favicon, `themeColor #3B82F6`), renders `<JsonLd />` (NGO + WebSite schema) and `<Providers>`, plus fixed edge-blur vignette divs (hidden below `2xl`, 12px backdrop-filter with gradient mask).

### Providers (`components/Providers.tsx`)
The single client boundary. Renders `<GridBackground />` + `<Navigation />`, then page `children` inside `ReactLenis` (keyed on `usePathname()` so only page content remounts on navigation — nav/footer/background stay mounted), then `<Footer />`. Individual pages do NOT render Navigation/Footer themselves.

### Home page (`app/page.tsx`)
Server Component composing four sections — no data fetching:

```
Hero → MissionSection → HowItWorks → AboutSection
```

(Navigation/Footer come from `Providers`. `StatsBar` exists in `components/` but is currently unused; the CTA lives inside `Footer` as a `#get-involved` card, not a separate section.)

### Inner pages (projects, team, our-story, testimonies, waitlist, donate)
Static pages sharing one skeleton: `<main className="content-width section-padding pt-36">` with `<Breadcrumbs>` (emits BreadcrumbList JSON-LD), a `max-w-2xl` header block, page content, and per-page `metadata` with canonical URL. Page-specific data is inlined as `const` arrays at the top of each page file (e.g. `STAFF` in `team/page.tsx`); only shared copy lives in `lib/content.ts`. `/governance` permanently redirects to `/team` (`next.config.ts`).

### SEO files
`app/sitemap.ts` (7 routes: home, projects, team, our-story, testimonies, waitlist, donate), `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `components/JsonLd.tsx`, `components/Breadcrumbs.tsx`.

## Components

All section components are `"use client"` with no page backgrounds of their own — single scrollable surface over the static grid.

- **Hero** — full-viewport heading/tagline with entrance animation, CTA buttons via `useRouter`
- **MissionSection** — centered mission block with charity badge
- **HowItWorks** — 3-step process with scroll-linked cubic Bezier SVG path (`useScroll`/`useTransform` → `pathLength`); path fades at the draw head via dynamic `linearGradient`; step 1 always visible, steps 2–3 fade in; SVG hidden on mobile; centres measured with `ResizeObserver`, corrected for motion-value Y transforms
- **AboutSection** — 3-link card grid (Projects / Team / Our Story) with stagger via `custom` + `variants`
- **StatsBar** — currently unused; 4 counters with `requestAnimationFrame` count-up (`Counter` sub-component in-file, driven by `STATS`)
- **Footer** — includes the CTA card (`CTA` copy, donate `Link` + volunteer `mailto:`) plus brand/charity-number column, `FOOTER_COLUMNS` link columns, copyright via `getFullYear()`
- **Navigation** — fixed nav with active-link highlighting (`usePathname`), edge-blur overlay, mobile menu toggled by `display: none/flex` + `useState` (closes on route change); Donate CTA button
- **GridBackground** — canvas filling document height (`absolute inset-0`), static 48px gray grid at 8% opacity; redraws on resize/height change (not tested)
- **WaitlistForm** — client-side only (no backend): validates name/non-empty + email regex, shows inline error or success state from `WAITLIST_COPY`
- **Breadcrumbs / JsonLd** — JSON-LD emitters (BreadcrumbList / NGO + WebSite); Breadcrumbs renders `Home / Page` trail with `aria-current="page"`

## Content Architecture

`lib/content.ts` holds shared copy as `const` assertions: `SITE`, `NAV_ITEMS` (Projects, Team, Our Story, Testimonies, Waitlist), `STATS`, `MISSION`, `STEPS`, `ABOUT_CARDS`, `CTA`, `FOOTER_COLUMNS`, `WAITLIST_COPY`, `TESTIMONIES_COPY` (placeholder quotes with disclaimer). To update shared copy, edit that file — not the components.

## Motion Strategy

- `useInView` (`once: true`, margin `"-100px"`) triggers scroll reveals
- `motion.div` variants handle stagger-children (AboutSection, 0.15s/card)
- StatsBar uses manual `requestAnimationFrame`, not Framer Motion values
- Page transitions use the native View Transitions API: `experimental.viewTransition` in `next.config.ts`, `@view-transition` + `page-content` group in `globals.css`. Only the `.page-transition` wrapper (page `children` in `Providers`) animates — root cross-fade is disabled so nav/footer stay static; `prefers-reduced-motion` opts out

## Testing

- `vitest.setup.tsx` globally mocks: framer-motion (Proxy renders `motion.*` as plain elements; `useScroll`/`useTransform`/`useInView` no-ops), `lenis/react`, `next/font/google`, `next/navigation` (`useRouter`/`usePathname` stubs), `ResizeObserver`
- Tests live alongside components (e.g. `Hero.test.tsx`); wrap async renders in `act()`
