import type {Route} from './+types/_index';
import {HeroSection} from '~/components/home/HeroSection';
import {BrandStatement} from '~/components/home/BrandStatement';
import {StoryBeat} from '~/components/home/StoryBeat';
import {ProductTeaser} from '~/components/home/ProductTeaser';
import {PressSection} from '~/components/home/PressSection';
import {NewsletterSection} from '~/components/home/NewsletterSection';
import {HOME_META, STORY_BEATS} from '~/content/home';
import {getMuxPlaybackIdStory} from '~/lib/media';

export const meta: Route.MetaFunction = () => [
  {title: HOME_META.title},
  {name: 'description', content: HOME_META.description},
];

export default function Homepage() {
  const muxStory = getMuxPlaybackIdStory();

  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Brand Statement */}
      <BrandStatement />

      {/* 3–5 — Story beats */}
      {STORY_BEATS.map((beat, i) => (
        <StoryBeat
          key={beat.index}
          {...beat}
          muxPlaybackId={i === 2 ? muxStory : undefined}
        />
      ))}

      {/* 6 — Product Teaser */}
      <ProductTeaser />

      {/* 7 — Press / Trust */}
      <PressSection />

      {/* 8 — Newsletter */}
      <NewsletterSection />
    </>
  );
}
