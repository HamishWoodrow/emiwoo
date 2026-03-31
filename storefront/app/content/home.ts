/**
 * Homepage dummy content — single place to edit copy for stakeholder review
 * before Sanity (Phase 2).
 */

export const HOME_META = {
  title: 'Emi Woo — Luxury silk womenswear',
  description:
    'Thoughtfully made silk pieces and future collections. Emi Woo — fewer, better things for every occasion.',
};

export const HERO = {
  kicker: 'Introducing',
  title: 'Emi Woo',
  tagline: 'Silk & pieces to treasure',
  ctaLabel: 'Discover our intent',
  ctaTo: '/intent' as const,
};

export const BRAND_STATEMENT_LINES = [
  'Fewer pieces.',
  'Designed without',
  'compromise.',
];

/** Optional CTAs under a story beat (e.g. craft section). */
export type StoryBeatCta = {label: string; to: string};

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
    sectionId: 'story-craft' as const,
    image: PLACEHOLDER_IMAGES.lifestyle1,
    eyebrow: 'The Craft',
    heading: 'Woven from<br />pure silk.',
    body: 'Sourced from the finest mills in Como, Italy. Each piece is cut from cloth chosen for drape and longevity — no seams where they shouldn\'t be, no compromises where they can be felt.',
    align: 'left' as const,
    overlay: 0.48,
    ctas: [
      {
        label: 'Discover how we make it',
        to: '/products/silk-blouse#material-craft',
      },
      {
        label: 'Discover our fabrics',
        to: '#story-fabric',
      },
      {label: 'How it feels', to: '#story-feel'},
    ] satisfies StoryBeatCta[],
  },
  {
    index: 2 as const,
    sectionId: 'story-feel' as const,
    image: PLACEHOLDER_IMAGES.lifestyle2,
    eyebrow: 'How It Feels',
    heading: 'Worn close.<br /><em>Felt deeper.</em>',
    body: 'There is a particular feeling that comes from wearing something made exactly right. Not just well-made — right. Emi Woo exists for that feeling, and for nothing else.',
    align: 'right' as const,
    overlay: 0.52,
    ctas: [
      {label: 'How it feels', to: '#story-feel'},
      {label: 'Discover our fabrics', to: '#story-fabric'},
      {
        label: 'Discover how we make it',
        to: '/products/silk-blouse#material-craft',
      },
    ] satisfies StoryBeatCta[],
  },
  {
    index: 3 as const,
    sectionId: 'story-fabric' as const,
    videoUrl: '/video/placeholders/fabric-loop.mp4',
    eyebrow: 'The Fabric',
    heading: 'Silk that moves<br />the way you do.',
    body: 'Breathes in summer. Holds warmth in winter. Drapes without effort. This is what silk, done properly, can do.',
    align: 'center' as const,
    overlay: 0.55,
    ctas: [
      {label: 'Discover our fabrics', to: '#story-fabric'},
      {label: 'How it feels', to: '#story-feel'},
      {
        label: 'Discover how we make it',
        to: '/products/silk-blouse#material-craft',
      },
    ] satisfies StoryBeatCta[],
  },
];
