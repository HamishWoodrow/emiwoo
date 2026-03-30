import {useRef, useEffect, useState} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap} from '~/lib/animations';
import {Button} from '~/components/ui/Button';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP-driven entrance: runs on client only, no SSR flash
  useGSAP(
    () => {
      if (!contentRef.current) return;
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
    },
    {scope: sectionRef},
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background video */}
      <div style={{position: 'absolute', inset: 0}}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
          poster="/images/placeholders/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/video/placeholders/hero-loop.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* Content — starts invisible; GSAP reveals on mount */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
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
          Introducing
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
          Emi Woo
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
          The Silk Blouse
        </p>

        <div style={{marginTop: '20px'}}>
          <Button to="/products/silk-blouse" variant="light">Shop Now</Button>
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
