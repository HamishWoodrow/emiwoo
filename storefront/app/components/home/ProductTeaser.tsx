import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';
import {Button} from '~/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function ProductTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        {opacity: 0, y: 40},
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
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
        height: 'clamp(480px, 80vh, 860px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Full-bleed product image */}
      <div style={{position: 'absolute', inset: 0}}>
        <img
          src="/images/placeholders/product-teaser.jpg"
          alt="Emi Woo Silk Blouse"
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(26,22,17,0.75) 0%, rgba(26,22,17,0.25) 60%, rgba(26,22,17,0.05) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '0 24px',
          marginTop: 'auto',
          paddingBottom: '80px',
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(244,237,228,0.6)',  /* hardcoded: always on dark image */
          }}
        >
          The Blouse
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: '#f4ede4',  /* hardcoded cream: always on dark image */
            lineHeight: 1.1,
          }}
        >
          The Silk Blouse
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(244,237,228,0.65)',
            letterSpacing: '0.04em',
          }}
        >
          One style. Every occasion.
        </p>

        <div style={{marginTop: '8px'}}>
          <Button to="/products/silk-blouse" variant="light">View the Blouse</Button>
        </div>
      </div>
    </section>
  );
}
