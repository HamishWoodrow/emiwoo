import type {Route} from './+types/_index';
import {HeroSection} from '~/components/home/HeroSection';
import {BrandStatement} from '~/components/home/BrandStatement';
import {StoryBeat} from '~/components/home/StoryBeat';
import {ProductTeaser} from '~/components/home/ProductTeaser';
import {PressSection} from '~/components/home/PressSection';
import {NewsletterSection} from '~/components/home/NewsletterSection';

export const meta: Route.MetaFunction = () => [
  {title: 'Emi Woo — The Silk Blouse'},
  {
    name: 'description',
    content:
      'One blouse, designed without compromise. Emi Woo — the finest silk blouse for every occasion.',
  },
];

export default function Homepage() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Brand Statement */}
      <BrandStatement />

      {/* 3 — Story Beat 1: Craftsmanship */}
      <StoryBeat
        index={1}
        image="/images/placeholders/lifestyle-1.jpg"
        eyebrow="The Craft"
        heading="Woven from<br />pure silk."
        body="Sourced from the finest mills in Como, Italy. Each blouse is cut from a single length of fabric — no seams where they shouldn't be, no compromises where they can be felt."
        align="left"
        overlay={0.48}
      />

      {/* 4 — Story Beat 2: How it Feels */}
      <StoryBeat
        index={2}
        image="/images/placeholders/lifestyle-2.jpg"
        eyebrow="How It Feels"
        heading="Worn close.<br /><em>Felt deeper.</em>"
        body="There is a particular feeling that comes from wearing something made exactly right. Not just well-made — right. Emi Woo exists for that feeling, and for nothing else."
        align="right"
        overlay={0.52}
      />

      {/* 5 — Story Beat 3: Video moment */}
      <StoryBeat
        index={3}
        videoUrl="/video/placeholders/fabric-loop.mp4"
        eyebrow="The Fabric"
        heading="Silk that moves<br />the way you do."
        body="Breathes in summer. Holds warmth in winter. Drapes without effort. This is what silk, done properly, can do."
        align="center"
        overlay={0.55}
      />

      {/* 6 — Product Teaser */}
      <ProductTeaser />

      {/* 7 — Press / Trust */}
      <PressSection />

      {/* 8 — Newsletter */}
      <NewsletterSection />
    </>
  );
}
