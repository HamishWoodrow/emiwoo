/**
 * Phase 1 media IDs — set in Vercel / `.env`:
 * PUBLIC_MUX_PLAYBACK_ID_HERO
 * PUBLIC_MUX_PLAYBACK_ID_STORY
 *
 * When unset, components fall back to local MP4 placeholders.
 */
export function getMuxPlaybackIdHero(): string | undefined {
  return typeof import.meta.env !== 'undefined'
    ? import.meta.env.PUBLIC_MUX_PLAYBACK_ID_HERO
    : undefined;
}

export function getMuxPlaybackIdStory(): string | undefined {
  return typeof import.meta.env !== 'undefined'
    ? import.meta.env.PUBLIC_MUX_PLAYBACK_ID_STORY
    : undefined;
}
