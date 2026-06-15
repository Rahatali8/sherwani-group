@AGENTS.md

# Sherwani Group — Project Rules

## Goal
Premium corporate website inspired by zentry.com. Cinematic, dark-luxury, scroll-driven, GSAP-animated.

## Stack (as actually installed)
- Next.js 16 (App Router) + TypeScript + React 19
- **Tailwind CSS v4** — configured via `@theme` in `src/app/globals.css` (NOT tailwind.config.ts; v4 is CSS-first). Design tokens live there.
- GSAP + ScrollTrigger (PRIMARY animation engine)
- @gsap/react `useGSAP()` hook (ALWAYS use this, never raw useEffect for GSAP)
- Lenis smooth scroll
- react-icons for icons, clsx for class merging

> NOTE: Next 16 has breaking changes vs older versions — consult `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Hard Rules
- Every component using GSAP / hooks / interactivity MUST start with "use client".
- ALWAYS animate GSAP inside `useGSAP(() => { ... }, { scope: containerRef })`. Use a scoped ref. Never select global DOM blindly.
- Register plugins once via `src/lib/gsap.ts` (registers ScrollTrigger + useGSAP). Import gsap/ScrollTrigger from there.
- Use Lenis + ScrollTrigger sync (lenis.on('scroll', ScrollTrigger.update) + gsap.ticker raf loop).
- Mobile: heavy scroll animations must be simplified or disabled under 768px (use gsap.matchMedia()).
- Use `next/image` for all images. Videos via native <video> with muted, loop, playsInline, autoPlay, preload="metadata".
- All media paths point to /public/videos/ and /public/images/. Placeholders now (gradient/colored fallbacks); real assets added later.
- Keep each section as its own component in src/components/sections/.
- Reusable bits (Button, AnimatedTitle, etc.) go in src/components/ui/.
- No localStorage. No external CDN scripts.

## Design System
Colors (CSS vars in globals.css + Tailwind @theme):
  --bg:        #0A0A0A  (near-black base)
  --surface:   #141414  (cards/sections)
  --gold:      #C9A227  (primary accent)
  --gold-soft: #E8D49A  (highlights)
  --text:      #F5F5F0  (off-white)
  --muted:     #8A8A85  (secondary text)
Fonts:
  Display: "Anton" via next/font/google (--font-display). May swap to a premium font later.
  Body: "Inter" via next/font/google (--font-body / default sans)
Spacing: generous. Big section padding (py-24 / py-32). Large clamp-based responsive headings.
Motion feel: smooth, weighty, never bouncy. Default ease "power3.out" or "expo.out". Durations 0.8s–1.4s for reveals.

## Folder Structure
src/
  app/            (layout.tsx, page.tsx, globals.css)
  components/
    layout/       (Navbar, Footer)
    sections/     (Hero, About, Timeline, Diversification, Projects, Awards, Clientele, Contact)
    ui/           (AnimatedTitle, Button, etc.)
    providers/    (SmoothScrollProvider, Preloader)
  lib/
    gsap.ts       (gsap + plugin registration, shared)
  data/
    content.ts    (all text content as typed objects)

## Build Phases (paste one at a time, commit after each)
0 Setup · 1 Navbar · 2 Hero · 3 About/CEO · 4 Timeline · 5 Diversification ·
6 Projects · 7 Awards+Clientele · 8 Contact+Footer · 9 Preloader · 10 Polish

## Reminders Each Session
- Read CLAUDE.md first. "use client" on anything interactive/animated.
- useGSAP() scoped to a ref — never global. Lenis + ScrollTrigger stay in sync.
- Mobile = simplify animations. Commit after every phase.
