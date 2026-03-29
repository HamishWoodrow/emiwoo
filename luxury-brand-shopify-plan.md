# Emi Woo — Shopify Storefront Project Plan
**Stack: Shopify Hydrogen + Sanity CMS + Mux Video + Oxygen**
*Last updated: March 2026*

---

## Overview

This plan covers building the Emi Woo luxury brand storefront — a single-product silk blouse brand — with a cinematic, editorial feel inspired closely by oura.com. Shopify handles commerce. Hydrogen gives full design freedom. Sanity lets your wife manage all content (copy, images, video) herself without touching code.

The homepage is the centrepiece: a scroll experience built around brand story and lifestyle imagery, with the product's features and story living on the product pages rather than diluting the homepage narrative.

---

## Brand Reference

| | |
|---|---|
| **Brand name** | Emi Woo |
| **Product** | Silk Blouse (single product) |
| **Shopify plan** | Pro |
| **Design reference** | [oura.com](https://oura.com) |
| **Accent colour** | `#c9a96e` (warm gold — update when palette confirmed) |
| **Imagery** | Real brand imagery exists, but Sanity placeholders built first for wife to swap |
| **Video** | Real videos exist, but placeholder slots built for wife to upload via Sanity/Mux |

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Commerce engine | Shopify Pro | Products, inventory, cart, checkout, orders |
| Frontend framework | Hydrogen 2026 (React Router v7) | Full design freedom, Shopify-native |
| Hosting | Shopify Oxygen | Free edge hosting, preview URL per branch |
| CMS | Sanity + `hydrogen-sanity` | Wife edits all content; official Hydrogen integration |
| Video hosting | **Mux** + `@mux/sanity-plugin-media` | Wife uploads brand videos directly in Sanity Studio; streams via HLS |
| Version control | GitHub → Oxygen CI/CD | Branching → preview URLs → merge to main |
| Dev AI tooling | Shopify Dev MCP (`@shopify/dev-mcp`) | Live Shopify docs + API schemas in Claude Code |
| Animations | **GSAP + ScrollTrigger** | Parallax text-over-image scroll effects; mobile-safe |
| Styling | Tailwind CSS | Utility-first; pairs well with Hydrogen |
| Placeholder imagery | Gamma (AI image generation) | High-quality luxury placeholders for POC |

---

## API Tokens & Environment Variables

Set these up before writing a single line of code. Document them somewhere secure (1Password, etc.).

```env
# Shopify
PUBLIC_STOREFRONT_API_TOKEN=          # Shopify Admin → Apps → Develop apps → Storefront API
PUBLIC_STORE_DOMAIN=                  # e.g. emi-woo.myshopify.com

# Sanity
SANITY_PROJECT_ID=                    # Created during `npm create sanity@latest`
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=                     # Sanity Manage → API → Tokens → add Editor token
SANITY_PREVIEW_SECRET=                # Any random string, e.g. generated with `openssl rand -hex 32`

# Mux (video hosting)
MUX_TOKEN_ID=                         # Mux dashboard → Settings → API Access Tokens
MUX_TOKEN_SECRET=                     # Same — store carefully, shown once
```

### How to get each token

**Shopify Storefront API token:**
Shopify Admin → Settings → Apps and sales channels → Develop apps → Create an app → Configure Storefront API scopes → check `unauthenticated_read_products`, `unauthenticated_read_product_listings`, `unauthenticated_read_collection_listings` → Install app → copy the Storefront API access token.

**Sanity tokens:**
Run `npm create sanity@latest` — the CLI outputs a `projectId`. Then go to [sanity.io/manage](https://sanity.io/manage) → your project → API → Tokens → Add API Token (Editor permissions for the preview token).

**Mux tokens:**
Create a free account at [mux.com](https://mux.com) (free tier: 5GB storage, generous bandwidth). Dashboard → Settings → API Access Tokens → Generate new token. Mux provides HLS streaming, automatic thumbnail generation, and excellent mobile performance — far better than serving raw MP4s.

---

## Site Map

```
/                       → Home (primary — cinematic scroll experience)
/intent                 → Brand Intent (philosophy / why Emi Woo exists)
/about                  → About (founder story)
/newsroom               → Newsroom (press coverage)
/contact                → Contact (social links, help, account links)
/products               → Collection (the silk blouse + future products)
/products/:handle       → Product Detail Page (features, materials, styling, care)
/account                → Account (Shopify native)
/policies/...           → Legal (Shopify native)
```

---

## Development Environment Setup

### 1. Shopify Dev MCP in Claude Code

Gives the AI coding assistant live access to Shopify documentation and API schemas during development. Run once, affects all future Claude Code sessions.

```json
{
  "mcpServers": {
    "shopify-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@shopify/dev-mcp@latest"]
    }
  }
}
```

**macOS config path:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Restart Claude Code → verify "running" in Settings → Developer.

### 2. Node + Shopify CLI

```bash
node --version          # must be 18+
npm install -g @shopify/cli
```

---

## Phase 1 — Proof of Concept (Design & Feel)

**Goal:** A deployed preview URL that replicates the visual quality and scroll experience of oura.com, adapted for Emi Woo. All content is placeholder (AI-generated images, stock video). No Sanity yet. When this is signed off, Phase 2 begins.

**Deliverable:** A shareable Oxygen preview URL with the full homepage scroll experience and all supporting pages at placeholder stage.

---

### 1.1 Oura.com Design Reference — What We're Replicating

Study oura.com closely before writing any components. The core patterns are:

- **Full-viewport sections** that each tell one story beat — you never see two sections at once on entry
- **Text lives over images**, not beside them — copy floats on top of lifestyle photography with enough contrast overlay to remain readable
- **Scroll moves text and image at different speeds** — the image scrolls at 100% speed, the text layer scrolls at 60–80%, creating a parallax depth that makes every section feel cinematic
- **Dark backgrounds everywhere** — true dark (`#0a0a0a`), not navy or charcoal
- **Typography contrast** — large, light-weight serif headlines against dark; small, spaced sans-serif for supporting copy
- **Transitions between sections are invisible** — sections bleed into each other, no hard borders or cards
- **Mobile-first parallax** — on mobile the effect is subtler (smaller offset) but still present; the images reframe gracefully

---

### 1.2 Scaffold the Project

```bash
npm create @shopify/hydrogen@latest
# Template: Skeleton
# Language: TypeScript
# Package manager: pnpm (recommended)

cd emi-woo
cp .env.template .env
# Fill in PUBLIC_STOREFRONT_API_TOKEN and PUBLIC_STORE_DOMAIN
```

Install dependencies:

```bash
pnpm add gsap @gsap/react
pnpm add -D tailwindcss @tailwindcss/vite
```

Start local dev:

```bash
shopify hydrogen dev
# Available at localhost:3000
```

---

### 1.3 Connect GitHub → Oxygen

```bash
git init && git add . && git commit -m "initial scaffold"
git remote add origin https://github.com/[your-org]/emi-woo.git
git push -u origin main
```

Then in Shopify Admin → Sales channels → Hydrogen → Connect repository → select `emi-woo`.

Shopify automatically adds `.github/workflows/oxygen.yml`. From this point:
- Push to `main` → production deployment
- Push to any other branch → unique preview URL (shareable, private by default)
- No manual deployment steps ever needed

---

### 1.4 Design System

**`app/styles/theme.css`:**

```css
:root {
  /* Colours */
  --color-bg:               #0a0a0a;
  --color-surface:          #111111;
  --color-border:           rgba(255, 255, 255, 0.07);
  --color-text-primary:     #f5f0eb;
  --color-text-secondary:   rgba(245, 240, 235, 0.5);
  --color-accent:           #c9a96e;   /* warm gold — confirm with palette */
  --color-accent-muted:     rgba(201, 169, 110, 0.15);

  /* Typography */
  --font-display:   'Cormorant Garamond', Georgia, serif;
  --font-body:      'Inter', system-ui, sans-serif;
  --font-label:     'Inter', system-ui, sans-serif;

  /* Spacing */
  --section-h:        100svh;          /* full viewport sections */
  --section-pad-y:    clamp(80px, 10vw, 140px);
  --container-max:    1320px;
  --container-pad:    clamp(20px, 5vw, 80px);

  /* Parallax settings — tune during build */
  --parallax-text-speed:    0.65;      /* text moves at 65% of scroll speed */
  --parallax-image-speed:   1.0;

  /* Easing */
  --ease-luxury:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-reveal:    cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Google Fonts — add to `app/root.tsx`:**
```html
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
  rel="stylesheet"
/>
```

---

### 1.5 The Parallax Text-Over-Image Pattern

This is the signature interaction across the homepage. Every lifestyle image section uses it. The effect: image scrolls at normal speed, the text overlay "floats" at a slower speed, creating a sense of depth and movement without any clicks.

**How it works in GSAP:**

```tsx
// app/components/ui/ParallaxSection.tsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxSection({
  image,         // background image URL
  videoUrl,      // optional: replaces image with video
  children,      // text content to float
  speed = 0.65,  // how fast text moves relative to scroll (< 1 = slower)
  overlay = 0.45 // darkness of image overlay (0–1)
}) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const yOffset = isMobile ? -40 : -80   // subtler on mobile

    gsap.to(textRef.current, {
      y: yOffset,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,         // ties animation exactly to scroll position
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Image / video layer — full bleed */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" src={videoUrl} />
        ) : (
          <img src={image} alt="" className="w-full h-full object-cover" />
        )}
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
      </div>

      {/* Text layer — floats above, moves at different scroll speed */}
      <div ref={textRef} className="relative z-10 flex items-center justify-center h-full px-8">
        {children}
      </div>
    </section>
  )
}
```

**Usage:**
```tsx
<ParallaxSection image="/images/placeholders/lifestyle-1.jpg" speed={0.6} overlay={0.4}>
  <div className="text-center max-w-2xl">
    <h2 className="font-display text-5xl md:text-7xl font-light text-[var(--color-text-primary)] leading-tight">
      Worn close.<br />
      <em>Felt deeper.</em>
    </h2>
  </div>
</ParallaxSection>
```

**Mobile behaviour:** The `yOffset` is halved on mobile automatically. GSAP's `scrub` mode is inherently smooth on touch-scroll. No additional handling needed.

---

### 1.6 Revised Homepage Structure

Sections 3 (Product Story) and 4 (Signature Features) from the original plan have been moved to the PDP. The homepage now focuses entirely on brand story and emotional resonance.

---

**Section 1 — Hero**

Full viewport. The opening frame. Sets the entire brand tone.

- Autoplay, muted, looped background video (MP4/HLS)
- Dark overlay (`opacity: 0.5`)
- "Emi Woo" in large display serif, centred, letter-spaced
- Tagline below: *"The Silk Blouse"* in light-weight serif italic
- CTA button: "Shop Now" — outlined style, gold border, no fill
- Scroll chevron at bottom, fades after first scroll

*Placeholder video:* Free dark/moody fashion loop from [Coverr.co](https://coverr.co) (search: "fabric", "luxury", "fashion")

---

**Section 2 — Brand Statement**

Large editorial text scroll section. No image — pure typographic moment. Dark background. The manifesto.

- Single large sentence in display serif, line-breaks crafted
- Example placeholder: *"One blouse. Designed without compromise."*
- Text reveals word by word as you scroll (GSAP stagger)
- Thin gold rule above and below

---

**Section 3 — Story Beat 1 (Parallax)**

`<ParallaxSection>` — lifestyle image, text overlay moves on scroll.

- Left-aligned text: short heading + 2 lines of brand story copy
- Image: lifestyle shot, model, natural light, silk texture
- Text box has no background — relies on image overlay for contrast

---

**Section 4 — Story Beat 2 (Parallax, reversed)**

Same pattern, mirrored. Text right-aligned. Different image. Creates visual rhythm across the scroll.

---

**Section 5 — Story Beat 3 (Full-bleed video)**

`<ParallaxSection videoUrl={...}>` — short video loop (5–10 seconds) as background.

- Centre-aligned text: single line headline
- This is the most cinematic moment on the page
- Wife will replace placeholder video via Sanity/Mux

---

**Section 6 — The Product**

Transitions from brand story to product. Still editorial — not a product card.

- Full-width lifestyle image of the silk blouse
- Minimal overlay text: "The Silk Blouse" + "One style. Every occasion."
- Single CTA: "Shop Now" or "View the Blouse"
- Links to `/products/silk-blouse`
- *No features here* — features live on the PDP

---

**Section 7 — Press / Trust**

- Dark background, centred layout
- If press exists: outlet name in serif + short pull quote
- If no press yet: single customer testimonial in large italic serif
- Thin horizontal rules as separators

---

**Section 8 — Newsletter**

- Full-width dark section
- Short headline: *"Be the first."* or *"Wear it first."*
- Email input + submit (Shopify Email or placeholder form for Phase 1)
- Fine print: *"No noise. Occasional letters."*

---

### 1.7 Supporting Pages (Phase 1 — Structural)

These use the brand design language but hardcoded placeholder content. Sanity makes them editable in Phase 2.

---

**`/intent` — Brand Intent**

The brand philosophy page. Tells the story of why Emi Woo exists. Editorial, long-form.

Layout:
- Opening full-width image/video with overlaid title: *"Why Emi Woo"*
- Three or four story sections, each: large pull quote → supporting paragraph
- Closes with "The Blouse" CTA

---

**`/about` — About**

- Founder portrait (placeholder AI image — Gamma: "natural light portrait, editorial style")
- Name and short biography in editorial prose
- Brand values stated simply: three lines, no bullet points

---

**`/newsroom` — Newsroom**

- Grid of press cards: outlet name, headline, date, external link
- Clean, minimal — pairs with the brand aesthetic
- *"Press enquiries: press@emiwoo.com"* footer note

---

**`/contact` — Contact**

- Simple form: name, email, message
- Social links section — displayed with fine typography, no heavy icons:
  - Instagram
  - Facebook
  - TikTok
  - Pinterest
  - YouTube
- Navigation links:
  - Account Management → `/account`
  - Help Centre → `/policies/faq` (or external)
  - About Us → `/about`
  - Newsroom → `/newsroom`

---

### 1.8 Product Detail Page (PDP) — Phase 1 Scope

This is where Product Story and Signature Features now live. Phase 1 builds the structure; Phase 2 makes it CMS-editable.

PDP sections:
1. **Product hero** — large lifestyle image, product name, price, size selector, Add to Cart
2. **The Story** — *moved from homepage* — split panel: image left, brand copy right
3. **Material & Craft** — *moved from homepage* — silk weight, provenance, construction details
4. **How to Wear It** — 3 styling examples (lifestyle images + minimal copy)
5. **Care Instructions** — minimal typography, dark background
6. **You Might Also Like** — placeholder for future SKUs

---

### 1.9 Placeholder Content Strategy

**Images:** Use Gamma to generate AI luxury placeholders. Suggested prompts:
- Hero: *"Cinematic fashion film still, silk fabric, dark studio, dramatic side lighting, minimal"*
- Lifestyle: *"Editorial fashion photography, natural light, silk blouse, warm tones, film grain"*
- Portrait: *"Studio portrait, natural window light, editorial, soft focus background"*

Export from Gamma and save to `/public/images/placeholders/`. Label clearly (e.g., `hero-placeholder.jpg`, `lifestyle-1-placeholder.jpg`) so they're trivially easy to swap.

**Video:** Download 1–2 loops from [Coverr.co](https://coverr.co) → search "fabric" or "fashion". Save to `/public/video/placeholders/`. These are the exact slots Mux will fill in Phase 2.

**Copy:** Use intentional Emi Woo-toned placeholder text rather than Lorem Ipsum. Claude Code (with Shopify Dev MCP active) can generate brand-appropriate placeholder copy for every section on request.

---

### 1.10 Phase 1 File Structure

```
app/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Transparent on scroll, reveals on scroll up
│   │   ├── Footer.tsx              # Dark, social links, nav links
│   │   └── Navigation.tsx
│   ├── home/
│   │   ├── HeroSection.tsx         # Full-screen video hero
│   │   ├── BrandStatement.tsx      # Word-by-word text reveal
│   │   ├── StoryBeat.tsx           # Reusable parallax story section
│   │   └── ProductTeaser.tsx       # The single product CTA moment
│   ├── pdp/
│   │   ├── ProductHero.tsx
│   │   ├── ProductStory.tsx        # Moved from homepage
│   │   ├── MaterialCraft.tsx       # Moved from homepage
│   │   └── StylingGuide.tsx
│   └── ui/
│       ├── ParallaxSection.tsx     # Core scroll interaction component
│       ├── Button.tsx              # Gold outline, fill variants
│       ├── TextReveal.tsx          # GSAP word/line stagger reveal
│       └── VideoBackground.tsx     # Handles MP4 + Mux HLS
├── routes/
│   ├── _index.tsx                  # Home
│   ├── intent.tsx
│   ├── about.tsx
│   ├── newsroom.tsx
│   ├── contact.tsx
│   └── products.$handle.tsx        # PDP
├── styles/
│   ├── app.css
│   └── theme.css                   # Design tokens (above)
└── lib/
    ├── animations.ts               # GSAP utilities, ScrollTrigger config
    └── utils.ts
```

---

### 1.11 Phase 1 Milestones

| # | Milestone |
|---|---|
| 1.1 | Project scaffolded, GitHub → Oxygen connected, first deploy live |
| 1.2 | Design tokens, fonts, Tailwind configured |
| 1.3 | `ParallaxSection` component built and tested on mobile |
| 1.4 | Hero section complete with placeholder video |
| 1.5 | Brand Statement and three Story Beat sections complete |
| 1.6 | Product Teaser section (Section 6) complete |
| 1.7 | Press and Newsletter sections complete |
| 1.8 | Header and Footer complete |
| 1.9 | Supporting pages: Intent, About, Newsroom, Contact |
| 1.10 | PDP built with Product Story + Material Craft sections |
| 1.11 | Preview URL shared, design signed off — Phase 2 begins |

---

## Phase 2 — Sanity CMS + Mux Video Integration

**Goal:** Every piece of content on the site — copy, images, video, press entries, social links — is editable by your wife through Sanity Studio, embedded inside her Shopify admin. She uploads her real brand images and videos. She never needs to touch code.

---

### 2.1 Sanity Project Setup

```bash
npm create sanity@latest
# Clean project, no predefined schemas, TypeScript

pnpm add hydrogen-sanity @sanity/client @sanity/image-url
pnpm add @mux/sanity-plugin-media     # Mux video uploader in Studio
```

The `hydrogen-sanity` package requires `@shopify/hydrogen >= 2025.5.0` — satisfied by current scaffold. It provides:
- Preview mode with session management (wife sees draft content live)
- Cached data fetching adapted for Hydrogen's streaming model
- Live visual editing overlay (click any text on the site to edit it)
- Optimised Sanity image URL builder

---

### 2.2 Mux Video — How the Wife Uploads Videos

This is the key flow for video management:

1. Wife opens Sanity Studio (inside Shopify admin)
2. Navigates to a page (e.g., Home → Hero Section)
3. Sees a "Video" upload field powered by the Mux plugin
4. Uploads the MP4 from her computer → Mux receives it, processes it into HLS
5. Studio saves the Mux asset ID
6. The Hydrogen frontend reads the asset ID → builds the streaming URL automatically
7. Wife clicks Publish → site updates

She never deals with file sizes, formats, or hosting URLs. It just works.

---

### 2.3 Schema Design

Schemas define exactly what's editable. Your wife sees form fields; you control what those fields are.

**Key schemas:**

`homePage`:
- `heroVideoAsset` (Mux) — the hero background video
- `heroHeadline` (string)
- `heroTagline` (string)
- `brandStatement` (string) — the large manifesto text
- `storyBeats[]` — array of: `{ image, headline, body, textAlignment }`
- `productTeaserImage` (Sanity image)

`intentPage`:
- `openingMedia` (Mux video or Sanity image)
- `sections[]` — `{ pullQuote, body, image }`

`aboutPage`:
- `founderImage` (Sanity image)
- `founderName` (string)
- `brandStory` (block content / rich text)

`newsroomEntry` (document — repeatable):
- `outlet` (string)
- `headline` (string)
- `date` (date)
- `externalLink` (URL)
- `logo` (Sanity image — optional)

`productEditorial` (linked to Shopify product handle):
- `storyImage` (Sanity image)
- `storyHeadline` (string)
- `storyBody` (block content)
- `materialDetails` (block content)
- `stylingImages[]` (Sanity image array)

`siteSettings` (singleton):
- `socialLinks` — `{ instagram, facebook, tiktok, pinterest, youtube }`
- `contactEmail` (string)
- `helpCentreUrl` (string)
- `pressEmail` (string)

---

### 2.4 Sanity Studio in Shopify Admin

Install the Sanity Connect app from the Shopify App Store. After setup, Sanity Studio appears as a sidebar item in Shopify admin, labelled "Content". Your wife manages products and content from one place.

---

### 2.5 Live Visual Editing

After setup, your wife can:
1. Open the live site in Sanity's Presentation mode
2. Click directly on any headline, paragraph, or image on the page
3. The Studio panel on the right opens the exact field
4. She edits, sees the change reflected in real time
5. Clicks Publish

This is enabled by the `hydrogen-sanity` Vite plugin — no custom code needed.

---

### 2.6 Content Handoff Process

Once Phase 2 is complete:

1. Claude Code migrates all hardcoded placeholder content into Sanity documents
2. Components are updated to fetch from Sanity (replacing hardcoded strings)
3. Your wife is walked through: how to swap an image, how to upload a video, how to add a press entry, how to edit homepage copy
4. She uploads her real brand images and videos section by section
5. Placeholder content is replaced; site goes live

---

### 2.7 Phase 2 Milestones

| # | Milestone |
|---|---|
| 2.1 | Sanity project created, Mux plugin configured |
| 2.2 | All schemas defined (homePage, intentPage, about, newsroom, siteSettings) |
| 2.3 | `hydrogen-sanity` integrated, preview mode working |
| 2.4 | Homepage fully CMS-driven — all sections pull from Sanity |
| 2.5 | Supporting pages CMS-driven (Intent, About, Newsroom, Contact, socials) |
| 2.6 | PDP editorial content (story, materials) CMS-driven |
| 2.7 | Mux video upload tested end-to-end in Studio |
| 2.8 | Studio embedded in Shopify admin |
| 2.9 | Live visual editing enabled and tested |
| 2.10 | Content handoff — wife uploads real imagery and videos, placeholder content removed |
| 2.11 | Custom domain configured in Shopify Oxygen settings |

---

## Deployment & Workflow Summary

```
Developer workflow:
git checkout -b feature/hero-section
→ code locally (localhost:3000)
→ git push origin feature/hero-section
→ Oxygen auto-deploys → unique preview URL generated
→ share URL for review and sign-off
→ git merge to main → production deploys automatically

Wife's content workflow (Phase 2 onwards):
Shopify Admin → Content (Sanity Studio)
→ select any page → edit field or upload image/video
→ preview change live before publishing
→ click Publish → site updates immediately
```

---

## Open Questions

1. **Colour palette** — Warm gold `#c9a96e` is placeholder. What are the full brand colours? Background should stay near `#0a0a0a` to match oura.com quality.
2. **Custom domain** — Is `emiwoo.com` (or similar) already registered? Needed for the final Oxygen domain setup step.
3. **Shopify store URL** — The `*.myshopify.com` store domain is needed for the first env setup.
4. **Product images** — Are brand images ready to be used immediately in Phase 2, or should Gamma placeholders cover Phase 1 only and she'll upload in Phase 2?
5. **Video format** — Are existing brand videos in MP4? Any over 200MB should be uploaded to Mux directly rather than committed to the repo.
6. **Newsletter** — Is Shopify Email the preference, or a third-party like Klaviyo? Klaviyo is the industry standard for fashion brands (deeper segmentation, abandoned cart flows) but adds a subscription cost.

---

*Annotate this doc with comments and we'll update before execution starts.*
