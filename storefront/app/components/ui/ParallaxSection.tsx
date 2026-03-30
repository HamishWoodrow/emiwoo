import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  /** Background image URL */
  image?: string;
  /** Replaces image with a looping video */
  videoUrl?: string;
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
}

export function ParallaxSection({
  image,
  videoUrl,
  overlay = 0.45,
  children,
  yOffset = 80,
  className = '',
  ariaLabel,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current) return;

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const travel = isMobile ? yOffset * 0.5 : yOffset;

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
            scrub: true,
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
    >
      {/* Background layer */}
      <div className="parallax-bg">
        {videoUrl ? (
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
