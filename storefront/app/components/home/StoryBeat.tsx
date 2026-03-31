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
    >
      <div
        className="container"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: isCenter ? 'center' : isLeft ? 'flex-start' : 'flex-end',
        }}
      >
        <div
          style={{
            maxWidth: isCenter ? '680px' : '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: isCenter ? 'center' : 'left',
          }}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              {eyebrow}
            </span>
          )}

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#f4ede4',
            }}
            dangerouslySetInnerHTML={{__html: heading}}
          />

          {/* Gold rule */}
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-accent)',
              ...(isCenter ? {margin: '0 auto'} : {}),
            }}
          />

          {/* Body — always cream: text lives over dark image overlay */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.8,
              letterSpacing: '0.04em',
              color: 'rgba(244,237,228,0.75)',
              maxWidth: '400px',
              ...(isCenter ? {margin: '0 auto'} : {}),
            }}
          >
            {body}
          </p>

          {ctas && ctas.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '12px',
                justifyContent: isCenter ? 'center' : 'flex-start',
              }}
            >
              {ctas.map((c) => (
                <Button key={c.label} to={c.to} variant="cta-light">
                  {c.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </ParallaxSection>
  );
}
