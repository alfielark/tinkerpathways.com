# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Next.js dev server at localhost:3000
npm run build      # Production build (includes TypeScript check)
npm run test       # Run all Vitest tests once
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router) — React framework
- **React 19** — UI library
- **Tailwind CSS v4** — utility-first CSS (`@theme inline` for design tokens)
- **TypeScript** — strict mode
- **Framer Motion 12** — scroll-triggered reveals (`useInView`), scroll-linked path drawing (`useScroll`/`useTransform`)
- **Lenis 1.x** — smooth scrolling via `ReactLenis` root wrapper (lerp: 0.08, duration: 1.3, keyed on pathname for page-nav reset)
- **Vitest 4** — component tests with jsdom environment (`**/*.test.{ts,tsx}`)
- **Fonts**: Space Grotesk (`--font-display`), Inter (`--font-sans`), JetBrains Mono (`--font-mono`) — loaded via both `next/font/google` (CSS variables) and `@fontsource` (explicit weight files in `globals.css`)

## Design System

Black-and-white aesthetic with a single blue accent (#3B82F6) and a red signal (#DC2626). Tokens defined in `globals.css` via `@theme inline`: `ink`, `ink-light`, `paper`, `paper-dark`, `blue`/`blue-dark`/`blue-light`, `slate`/`slate-light`/`slate-dark`, `signal`.

- Native scrollbar hidden globally via `scrollbar-width: none` / `-webkit-scrollbar { display: none }`
- `prefers-reduced-motion: reduce` disables smooth scrolling
- Lenis CSS rules (`html.lenis`, `.lenis-smooth`, `[data-lenis-prevent]`) for proper scroll behavior interop

## Layout System

### Root layout (`app/layout.tsx`)
A Server Component. Loads three Google Fonts as CSS variables, wraps children in `<Providers>`, renders fixed edge-blur vignette divs (hidden below `2xl` breakpoint, 12px backdrop-filter with linear-gradient mask). Uses metadata title template: `"%s — Tinker Pathways"`.

### Providers (`components/Providers.tsx`)
The single client boundary. Wraps children in `ReactLenis` (keyed on `pathname` so Lenis re-initialises on page navigation and picks up new scroll height). Inside Lenis: a `relative z-10` div containing `<GridBackground />` (z-index 0) + children.

### Home page (`app/page.tsx`)
Imports and composes section components in order — no data fetching:

```
Navigation → Hero → StatsBar → MissionSection → HowItWorks → AboutSection → CTASection → Footer
```

### Inner pages (governance, projects, donate, our-story)
Each is a static page sharing the same skeleton: `Navigation` at top, `<main>` with `section-padding pt-36`, a "Back to home" link, content header, page-specific content, `Footer` at bottom. All text data is inlined as `const` arrays at the top of each page file (not in `lib/content.ts`).

### Sitemap (`app/sitemap.ts`)
Explicit sitemap listing all 5 routes (home, projects, governance, our-story, donate).

## Components

### Section components (home page)
All are `"use client"`. They have **no backgrounds, no borders, no dividers** — the page reads as a single scrollable surface with only the static grid behind it. Each is a `<section>` with `section-padding` utility and an optional `id` for nav scrolling.

- **Hero** — Full-viewport heading/tagline with entrance animation, CTA buttons (uses `useRouter` for navigation)
- **StatsBar** — 4 counter items with scroll-triggered count-up via `requestAnimationFrame` (not Framer Motion values — renders an `AnimatedNumber` sub-component inside the same file)
- **MissionSection** — Centered mission block with charity badge
- **HowItWorks** — 3-step process with scroll-linked cubic Bezier SVG path drawn via `useScroll`/`useTransform`; path fades to transparent at the draw head via a dynamic `linearGradient`; step 1 is always visible, steps 2–3 fade in as scroll progresses; SVG hidden on mobile; path centres dynamically measured with `ResizeObserver` and corrected for motion-value Y transforms
- **AboutSection** — 3-link card grid (Projects / Governance / Our Story) with stagger animation via `custom` + `variants` — each card links to its sub-page
- **CTASection** — Donate/Volunteer CTA block with staggered entrance animations
- **Footer** — Charity details, legal links, social links, copyright (uses `new Date().getFullYear()`)

### Background effect (not tested)
- **GridBackground** — Canvas filling full document height (`absolute inset-0`). Draws a static 48px-spaced gray grid at 8% opacity, 1px stroke. No cursor interaction; redraws on resize or document-height change. (Previously `WarpGrid` with cursor warping — that effect was removed.)

### Navigation (`components/Navigation.tsx`)
Fixed-position sticky nav. Parses `NAV_ITEMS` from content and scrolls to section anchors on click (uses `router.push` for /donate). Has a backdrop-blur edge overlay behind it. Includes a mobile menu (`display: none/flex` toggle) with the same links. Has a "Donate" CTA button.

## Content Architecture

`lib/content.ts` holds all shared copy as `const` assertions: `SITE`, `NAV_ITEMS`, `STATS`, `MISSION`, `STEPS`, `ABOUT_CARDS`, `CTA`, `FOOTER_LINKS`, `SOCIAL_LINKS`. To update shared copy, edit that file — not the components. Inner pages inline their own data (e.g. `STAFF` in governance, `TIMELINE` in our-story) since it's page-specific and not referenced elsewhere.

## Motion Strategy

- `useInView` triggers all scroll-reveals (`once: true`, margins vary: `"-100px"`, `"-80px"`)
- `motion.div` variants handle stagger-children (AboutSection, 0.15s delay per card)
- HowItWorks uses `useScroll` with custom `offset` to drive `useTransform` → `pathLength` on an SVG path, plus per-step opacity/translateY transforms
- StatsBar uses manual `requestAnimationFrame` for count-up (not Framer Motion values)

## Testing

- `vitest.setup.tsx` globally mocks: framer-motion (Proxy replaces all `motion.*` with plain HTML elements), Lenis, `next/font/google`, `next/navigation`, `@testing-library/jest-dom/vitest`, `ResizeObserver`
- Tests live alongside their component (e.g. `Hero.test.tsx`)
- Use `act()` wrappers for async renders
