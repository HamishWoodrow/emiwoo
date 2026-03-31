import {useRef, useEffect, useState} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap} from '~/lib/animations';
import {Button} from '~/components/ui/Button';
import {HERO, PLACEHOLDER_IMAGES} from '~/content/home';
import {getMuxPlaybackIdHero} from '~/lib/media';
import {prefersReducedMotion} from '~/lib/motion';
import MuxPlayer from '@mux/mux-player-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [muxReady, setMuxReady] = useState(false);
  const muxHero = getMuxPlaybackIdHero();

  const markMuxReady = () => setMuxReady(true);

  /** HLS/streaming often never fires `loadeddata`; avoid infinite black hero. */
  useEffect(() => {
    if (!muxHero) return;
    const id = window.setTimeout(markMuxReady, 10_000);
    return () => window.clearTimeout(id);
  }, [muxHero]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance + scroll-linked lift so hero copy rides upward over the video (stronger on mobile)
  useGSAP(
    () => {
      if (!contentRef.current || !sectionRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(contentRef.current, {opacity: 1, y: 0});
        return;
      }
      gsap.fromTo(
        contentRef.current,
        {opacity: 0, y: 32},
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          delay: 0.3,
          ease: 'power3.out',
        },
      );

      if (!scrollWrapRef.current) return;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const travel = isMobile ? 140 : 88;
      gsap.fromTo(
        scrollWrapRef.current,
        {y: 0},
        {
          y: -travel,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    {scope: sectionRef},
  );

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      {/* Poster always visible under video so Mux never shows a blank/black hero */}
      <div style={{position: 'absolute', inset: 0}}>
        <img
          src={PLACEHOLDER_IMAGES.heroPoster}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        {muxHero ? (
          <MuxPlayer
            playbackId={muxHero}
            streamType="on-demand"
            autoPlay
            muted
            loop
            playsInline
            thumbnailTime={0}
            onLoadedData={markMuxReady}
            onCanPlay={markMuxReady}
            onPlaying={markMuxReady}
            onError={markMuxReady}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              width: '100%',
              height: '100%',
              opacity: muxReady ? 1 : 0,
              transition: 'opacity 0.55s ease-out',
              ...({'--media-object-fit': 'cover'} as React.CSSProperties),
            }}
            aria-hidden="true"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            poster={PLACEHOLDER_IMAGES.heroPoster}
            aria-hidden="true"
          >
            <source src="/video/placeholders/hero-loop.mp4" type="video/mp4" />
          </video>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* Outer wrapper moves on scroll; inner handles entrance fade */}
      <div
        ref={scrollWrapRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            padding: '0 24px',
            opacity: 0, // SSR-safe: GSAP overwrites to 1 on mount
          }}
        >
        {/* All hero text is hardcoded cream — it's always on a dark video */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(244,237,228,0.6)',
          }}
        >
          {HERO.kicker}
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 9vw, 120px)',
            fontWeight: 300,
            letterSpacing: '0.14em',
            color: '#f4ede4',
            lineHeight: 0.9,
            textTransform: 'uppercase',
          }}
        >
          {HERO.title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.06em',
            color: 'rgba(244,237,228,0.65)',
            marginTop: '4px',
          }}
        >
          {HERO.tagline}
        </p>

        <div style={{marginTop: '20px'}}>
          <Button to={HERO.ctaTo} variant="cta-light">
            {HERO.ctaLabel}
          </Button>
        </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          transition: 'opacity 0.6s',
          opacity: hasScrolled ? 0 : 1,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '8px',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,235,0.4)',
          }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{animation: 'scrollBounce 2s ease-in-out infinite'}}
        >
          <path
            d="M8 0v20M1 13l7 7 7-7"
            stroke="rgba(245,240,235,0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
