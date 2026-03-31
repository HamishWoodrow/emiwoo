import {useRef, useEffect, useState} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap} from '~/lib/animations';
import {Button} from '~/components/ui/Button';
import {HERO, PLACEHOLDER_IMAGES} from '~/content/home';
import {prefersReducedMotion} from '~/lib/motion';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
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
        {opacity: 0.92, y: 22},
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.15,
          ease: 'power3.out',
          immediateRender: false,
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
      className="hero-section"
    >
      {/* Static placeholder hero for now: guaranteed visible on all browsers */}
      <div style={{position: 'absolute', inset: 0}}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundColor: '#1a1611',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${PLACEHOLDER_IMAGES.heroPoster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.36) 52%, rgba(0,0,0,0.22) 100%)',
          }}
        />
      </div>

      {/* Outer wrapper moves on scroll; inner handles entrance fade */}
      <div ref={scrollWrapRef} className="hero-scroll-wrap">
        <div ref={contentRef} className="hero-content-frame container">
          <div className="hero-display-column">
            <span className="hero-kicker">{HERO.kicker}</span>
            <h1 className="hero-title">{HERO.title}</h1>
          </div>
          <div className="hero-meta-column">
            <p className="hero-tagline">{HERO.tagline}</p>
            <div className="hero-cta-wrap">
              <Button to={HERO.ctaTo} variant="cta-light">
                {HERO.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="hero-scroll-indicator" style={{opacity: hasScrolled ? 0 : 1}}>
        <span className="hero-scroll-label">Scroll</span>
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
