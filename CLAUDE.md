# Emi Woo — Project Context for Claude Code

This file is auto-read by Claude Code. It contains full project context so you can execute without needing prior conversation history.

---

## What this project is

A luxury brand headless storefront for **Emi Woo** — a single-product silk blouse brand. The design is closely inspired by [oura.com](https://oura.com): dark backgrounds, cinematic full-viewport sections, parallax text-over-image scroll effects, editorial typography.

The owner's wife will manage all content herself via Sanity CMS embedded in her Shopify admin. She has real brand imagery and videos that will replace placeholders once the CMS is wired up.

---

## Tech stack (decided, do not change)

| Layer | Tool |
|---|---|
| Commerce | Shopify (Dev Store: `emi-woo-dev.myshopify.com`) |
| Frontend | Shopify Hydrogen 2026 (React Router v7) |
| Hosting | **Vercel** (not Oxygen — Dev Store doesn't support Oxygen) |
| CMS | Sanity + `hydrogen-sanity` package |
| Video | Mux + `@mux/sanity-plugin-media` |
| Animations | GSAP + ScrollTrigger |
| Styling | Tailwind CSS |
| Package manager | pnpm |

---

## Vercel account

Already connected. Team: `hamishwoodrow-8089's projects` (`team_IDoNxkdo5cPntimTwJw7GOcc`). Create a new project named `emiwoo` connected to this repo.

---

## Sanity project

- Project ID: `uiirktm4`
- Dataset: `prod` (not "production")
- Already created and logged in as `hamishwoodrow@gmail.com`

---

## Environment variables

The `.env` file should be created at the project root (gitignored). Template:

```env
PUBLIC_STOREFRONT_API_TOKEN=
PUBLIC_STORE_DOMAIN=emi-woo-dev.myshopify.com

SANITY_PROJECT_ID=uiirktm4
SANITY_DATASET=prod
SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
SANITY_PREVIEW_SECRET=

MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
```

Ask Hamish to paste the values if the `.env` doesn't exist or is incomplete.

---

## Two-phase build plan

**Full plans are in `docs/` — read them before building anything.**

### Phase 1 — Design POC (build first)
Goal: deployed Vercel preview URL with the full homepage scroll experience. No Sanity yet. All content hardcoded as placeholders. Signed off by wife before Phase 2 begins.

Key constraints:
- Homepage has NO product story or feature sections — those live on the PDP
- Every lifestyle image section uses the `ParallaxSection` component (GSAP ScrollTrigger)
- Dark luxury aesthetic throughout: background `#0a0a0a`, accent `#c9a96e` (warm gold, TBC)
- Typography: Cormorant Garamond (display) + Inter (body) via Google Fonts
- Mobile parallax offset should be ~50% of desktop offset

Homepage section order:
1. Hero — full-screen video background, brand name, tagline, CTA
2. Brand Statement — large word-by-word text reveal, no image
3. Story Beat 1 — ParallaxSection, lifestyle image, text overlay left-aligned
4. Story Beat 2 — ParallaxSection, different image, text right-aligned
5. Story Beat 3 — ParallaxSection with video background
6. Product Teaser — lifestyle image of blouse, "Shop Now" CTA
7. Press / Trust — pull quote or press logos
8. Newsletter — email capture, minimal

Additional pages (Phase 1, hardcoded): `/intent`, `/about`, `/newsroom`, `/contact`
PDP also built in Phase 1: product hero, story section, material/craft, styling guide, care

### Phase 2 — Sanity CMS
Wire up all pages to Sanity. Mux for video uploads. Studio embedded in Shopify admin. Wife replaces all placeholders with real brand imagery and videos.

---

## Site map

```
/                    Home
/intent              Brand Intent / Philosophy
/about               About
/newsroom            Newsroom
/contact             Contact (social links: Instagram, Facebook, TikTok, Pinterest, YouTube)
/products            Collection
/products/:handle    PDP
/account             Account (Shopify native)
```

---

## Placeholder content strategy

- Images: generate via Gamma MCP (available in Cowork) — prompt for dark luxury editorial style
- Video: download free loops from coverr.co (search: fabric, fashion, luxury)
- Copy: write intentional Emi Woo-toned placeholder text, not Lorem Ipsum
- Save placeholders to `/public/images/placeholders/` and `/public/video/placeholders/`
- Label clearly so wife can swap 1:1 via Sanity in Phase 2

---

## Key design decisions

- `ParallaxSection` is the core reusable component — image/video layer + floating text layer at different scroll speeds
- Text over images, never beside them
- Sections bleed into each other — no hard borders or cards
- Transparent header that reveals on scroll-up
- Gold CTA buttons: outlined style, no fill, `#c9a96e` border and text

---

## What Hamish knows / prefers

- Comfortable with Python, has built websites before, less familiar with Shopify specifics
- Uses GitHub, familiar with Vercel-style deployments
- Wants wife to be fully self-sufficient on content after Phase 2
- Brand colour palette to be confirmed — warm gold is placeholder for now
