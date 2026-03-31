import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const PRESS_ITEMS = [
  {
    outlet: 'Vogue',
    quote:
      '"The blouse every woman will want to wear every day of the week. Effortless in the truest sense."',
  },
  {
    outlet: 'Harper\'s Bazaar',
    quote:
      '"Emi Woo has done what few brands manage: created a single piece that is genuinely enough."',
  },
  {
    outlet: 'Elle',
    quote:
      '"The silk is extraordinary. The cut is perfect. We ordered two."',
  },
];

export function PressSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !itemsRef.current) return;

      const cards = itemsRef.current.querySelectorAll<HTMLDivElement>('.press-card');
      gsap.fromTo(
        cards,
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      data-header-theme="light"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(56px, 7vw, 96px) var(--container-pad)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 3.2vw, 36px)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            As seen in
          </h2>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: 'var(--color-cta)',
              opacity: 0.45,
            }}
          />
        </div>

        {/* Press cards */}
        <div
          ref={itemsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1px',
            background: 'var(--color-border)',
          }}
        >
          {PRESS_ITEMS.map(({outlet, quote}) => (
            <div
              key={outlet}
              className="press-card"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: 'clamp(32px, 4vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Outlet name */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '0.04em',
                  color: 'var(--color-text-primary)',
                }}
              >
                {outlet}
              </span>

              <div
                style={{
                  width: '32px',
                  height: '1px',
                  background: 'var(--color-border)',
                }}
              />

              {/* Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(15px, 1.6vw, 18px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  letterSpacing: '0.02em',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
