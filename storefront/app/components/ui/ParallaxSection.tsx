import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';
import {prefersReducedMotion} from '~/lib/motion';
import {ParallaxMuxVideo} from '~/components/ui/ParallaxMuxVideo';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  /** Background image URL */
  image?: string;
  /** Replaces image with a looping video */
  videoUrl?: string;
  /** Mux playback ID — takes precedence over videoUrl when set */
  muxPlaybackId?: string;
  /** Overlay opacity 0–1 */
  overlay?: number;
  /** Text content to float over the background */
  children: React.ReactNode;
  /** Vertical travel distance for the text layer in px (desktop) */
  yOffset?: number;
  /** className for outer section */
  className?: string;
  /** aria-label for the section */
  ariaLabel?: string;
  /** For header nav contrast (IntersectionObserver on homepage) */
  headerTheme?: 'dark' | 'light';
}

export function ParallaxSection({
  image,
  videoUrl,
  muxPlaybackId,
  overlay = 0.45,
  children,
  yOffset = 80,
  className = '',
  ariaLabel,
  headerTheme = 'dark',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current) return;
      if (prefersReducedMotion()) return;

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      /* Stronger vertical travel on small screens so copy visibly rides over the image */
      const travel = isMobile ? Math.round(yOffset * 1.25) : yOffset;
      const scrub = isMobile ? 0.65 : true;

      // Background drifts with scroll; slight scale avoids edge gaps when translating
      if (bgRef.current) {
        gsap.set(bgRef.current, {scale: 1.08, transformOrigin: 'center center'});
        gsap.fromTo(
          bgRef.current,
          {yPercent: -7},
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // fromTo with explicit y:0 prevents text sitting at wrong position
      // before the trigger fires. invalidateOnRefresh recalculates positions
      // after Lenis initialises (fixes ghost/double-text artefact).
      gsap.fromTo(
        textRef.current,
        {y: 0},
        {
          y: -travel,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    {scope: sectionRef, dependencies: [yOffset]},
  );

  return (
    <section
      ref={sectionRef}
      className={`parallax-section ${className}`}
      aria-label={ariaLabel}
      data-header-theme={headerTheme}
    >
      {/* Background layer — subtle vertical drift vs text (ScrollTrigger) */}
      <div ref={bgRef} className="parallax-bg">
        {muxPlaybackId ? (
          <ParallaxMuxVideo playbackId={muxPlaybackId} />
        ) : videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={videoUrl}
            aria-hidden="true"
          />
        ) : image ? (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        ) : (
          /* Solid colour fallback */
          <div style={{background: '#111', width: '100%', height: '100%'}} />
        )}
        <div
          className="parallax-overlay"
          style={{opacity: overlay}}
          aria-hidden="true"
        />
      </div>

      {/* Text / content layer — moves at different scroll speed */}
      <div ref={textRef} className="parallax-content">
        {children}
      </div>
    </section>
  );
}
