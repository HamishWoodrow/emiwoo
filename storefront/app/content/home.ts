/**
 * Homepage dummy content — single place to edit copy for stakeholder review
 * before Sanity (Phase 2).
 */

export const HOME_META = {
  title: 'Emi Woo — The Silk Blouse',
  description:
    'One blouse, designed without compromise. Emi Woo — the finest silk blouse for every occasion.',
};

export const HERO = {
  kicker: 'Introducing',
  title: 'Emi Woo',
  tagline: 'The Silk Blouse',
  ctaLabel: 'Discover our intent',
  ctaTo: '/intent' as const,
};

export const BRAND_STATEMENT_LINES = [
  'One blouse.',
  'Designed without',
  'compromise.',
];

/** Static image paths — replace via `pnpm run fetch-placeholders` or CMS later. */
export const PLACEHOLDER_IMAGES = {
  lifestyle1: '/images/placeholders/lifestyle-1.jpg',
  lifestyle2: '/images/placeholders/lifestyle-2.jpg',
  productTeaser: '/images/placeholders/product-teaser.jpg',
  heroPoster: '/images/placeholders/hero-poster.jpg',
} as const;

export const STORY_BEATS = [
  {
    index: 1 as const,
    image: PLACEHOLDER_IMAGES.lifestyle1,
    eyebrow: 'The Craft',
    heading: 'Woven from<br />pure silk.',
    body: 'Sourced from the finest mills in Como, Italy. Each blouse is cut from a single length of fabric — no seams where they shouldn\'t be, no compromises where they can be felt.',
    align: 'left' as const,
    overlay: 0.48,
  },
  {
    index: 2 as const,
    image: PLACEHOLDER_IMAGES.lifestyle2,
    eyebrow: 'How It Feels',
    heading: 'Worn close.<br /><em>Felt deeper.</em>',
    body: 'There is a particular feeling that comes from wearing something made exactly right. Not just well-made — right. Emi Woo exists for that feeling, and for nothing else.',
    align: 'right' as const,
    overlay: 0.52,
  },
  {
    index: 3 as const,
    videoUrl: '/video/placeholders/fabric-loop.mp4',
    eyebrow: 'The Fabric',
    heading: 'Silk that moves<br />the way you do.',
    body: 'Breathes in summer. Holds warmth in winter. Drapes without effort. This is what silk, done properly, can do.',
    align: 'center' as const,
    overlay: 0.55,
  },
];
