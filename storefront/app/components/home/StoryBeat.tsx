import {ParallaxSection} from '~/components/ui/ParallaxSection';
import {Button} from '~/components/ui/Button';
import type {StoryBeatCta} from '~/content/home';

interface StoryBeatProps {
  image?: string;
  videoUrl?: string;
  muxPlaybackId?: string;
  eyebrow?: string;
  heading: string;
  body: string;
  align?: 'left' | 'right' | 'center';
  overlay?: number;
  /** Unique index — used for alt text and aria labels */
  index: number;
  sectionId?: string;
  ctas?: StoryBeatCta[];
}

/**
 * Reusable parallax story beat.
 * Used for sections 3, 4, and 5 of the homepage.
 */
export function StoryBeat({
  image,
  videoUrl,
  muxPlaybackId,
  eyebrow,
  heading,
  body,
  align = 'left',
  overlay = 0.5,
  index,
  sectionId,
  ctas,
}: StoryBeatProps) {
  const isLeft = align === 'left';
  const isCenter = align === 'center';
  const layoutClass = isCenter
    ? 'story-beat--center'
    : isLeft
      ? 'story-beat--left'
      : 'story-beat--right';
  const sectionClass = index === 2 ? 'story-beat--compact' : 'story-beat--tall';
  const mediaClass =
    index === 1
      ? 'story-beat-media--framed-left'
      : index === 2
        ? 'story-beat-media--framed-right'
        : 'story-beat-media--full';

  return (
    <ParallaxSection
      id={sectionId}
      image={image}
      videoUrl={videoUrl}
      muxPlaybackId={muxPlaybackId}
      overlay={overlay}
      ariaLabel={`Story Beat ${index}`}
      headerTheme="dark"
      yOffset={112}
      className={`story-beat ${sectionClass}`}
      bgClassName={mediaClass}
    >
      <div
        className={`container story-beat-inner ${layoutClass}`}
      >
        <div className="story-beat-panel">
          {/* Eyebrow */}
          {eyebrow && (
            <span className="story-beat-eyebrow">
              {eyebrow}
            </span>
          )}

          <div className="story-beat-content-grid">
            <h2
              className="story-beat-heading"
              dangerouslySetInnerHTML={{__html: heading}}
            />
            <div className="story-beat-copy-column">
              <div className="story-beat-rule" />
              <p className="story-beat-body">{body}</p>
              {ctas && ctas.length > 0 ? (
                <div className="story-beat-cta-row">
                  {ctas.map((c) => (
                    <Button key={c.label} to={c.to} variant="cta-light">
                      {c.label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
