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
- **Framer Motion 12** — scroll-triggered reveals, entrance animations
- **Lenis 1.x** — smooth scrolling (via `ReactLenis` root wrapper in `Providers.tsx`)
- **Vitest 4** — component tests with jsdom environment
- **Google Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (code/data) via `next/font/google`

## Design System

Black-and-white aesthetic with a single blue accent. Tokens defined in `globals.css`:

- `text-ink` / `bg-ink` — pure black (#000000)
- `text-paper` / `bg-paper` — pure white (#FFFFFF)
- `text-blue` / `bg-blue` — #3B82F6 (single accent)
- `text-slate` / `text-slate-light` — grays for secondary text
- `cursor: none` on body and all interactive elements (reverted on touch devices via `@media (pointer: coarse)`)

## Project Structure

```
├── app/
│   ├── layout.tsx        — Root layout: font loading, Providers wrapper, metadata
│   ├── page.tsx          — Composes all sections in order (no data fetching)
│   └── globals.css       — Tailwind imports, design tokens, cursor-rules
├── components/
│   ├── Providers.tsx     — Client wrapper: ReactLenis root, WarpGrid, MouseFollower
│   ├── WarpGrid.tsx      — Canvas-based background grid that warps near cursor
│   ├── MouseFollower.tsx — Custom circle cursor with lerp interpolation
│   ├── Navigation.tsx    — Sticky nav with scroll-driven backdrop-blur transition
│   ├── Hero.tsx          — Full-viewport hero heading/tagline
│   ├── StatsBar.tsx      — 4 counter items with scroll-triggered count-up animation
│   ├── MissionSection.tsx — Centered mission block with charity badge
│   ├── HowItWorks.tsx    — 3-step process cards with connecting SVG path
│   ├── ProgramsSection.tsx — 3 program cards
│   ├── CTASection.tsx    — Donate/Volunteer CTA block
│   └── Footer.tsx        — Charity details, links, copyright
├── lib/
│   └── content.ts        — All static content/placeholder copy as const exports
├── vitest.setup.tsx      — Global mocks: framer-motion (Proxy), lenis, next/font/google
└── vitest.config.ts      — Vitest config (jsdom, @/ alias, react plugin)
```

## Architecture Notes

### Content-first
All text lives in `lib/content.ts` as `const` assertions. To update copy, edit that file — not the components. Section components consume content from imports, never inline strings.

### One continuous page
Section components have **no backgrounds, no borders, no dividers**. The page reads as a single scrollable surface with only the WarpGrid behind it. Each section is a `<section>` element with `section-padding` utility (responsive padding) and optional `id` for nav scrolling.

### Scroll system
- `Providers.tsx` wraps everything in `ReactLenis` (smooth scrolling)
- Inside the Lenis wrapper: a `relative z-10` div containing `<WarpGrid />` (z-index 0) + `<section>` children (z-index 10 via relative stacking)
- Outside the Lenis wrapper: `<MouseFollower />` (position fixed, z-index 99999)

### WarpGrid (`components/WarpGrid.tsx`)
- Canvas that fills the full document height with `absolute inset-0` positioning — scrolls naturally with the page
- Draws 48px-spaced gray grid lines at 8% opacity, 1px stroke
- Lines near the cursor warp outward (260px radius, quadratic falloff) and turn subtly blue
- Blue intersection dots appear at grid crossings near the cursor
- All coordinates are in document-space (`clientX`, `clientY + scrollY`)
- Renders at `z-index: 0` behind all section content

### MouseFollower (`components/MouseFollower.tsx`)
- Fixed-position 40px blue circle with 2.5px border, 8% fill, and box-shadow glow
- Follows mouse via `requestAnimationFrame` with lerp (0.08) for smooth trailing
- Touch devices: `cursor: none` is reverted via media query

### Section injection
All section components are `"use client"` (they use Framer Motion hooks). The root `layout.tsx` remains a Server Component. `page.tsx` simply imports and composes them — no data fetching.

### Motion strategy
- `useInView` triggers all scroll-reveals (typically `once: true`, `margin: "-100px"`)
- `motion.div` variants handle stagger-children (HowItWorks)
- StatsBar uses manual `requestAnimationFrame` for its count-up animation (_not_ Framer Motion values — renders an AnimatedNumber sub-component)

## Testing

- `vitest.setup.tsx` globally mocks: framer-motion (Proxy replaces all `motion.*` with plain HTML elements), Lenis, `next/font/google`, `@testing-library/jest-dom/vitest`
- Section components that render a `canvas` (WarpGrid) or hook into `mousemove`/`scroll` (MouseFollower) are **not tested** — they're data-independent visual effects
- Use `act()` wrappers for async renders involving `next/font` imports
- Tests live alongside their component (e.g. `Hero.test.tsx`)
