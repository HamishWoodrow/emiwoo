import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_LINES = [
  'One blouse.',
  'Designed without',
  'compromise.',
];

export function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !linesRef.current) return;

      const words = linesRef.current.querySelectorAll<HTMLSpanElement>('.reveal-word');

      gsap.fromTo(
        words,
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
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
        background: 'var(--color-bg)',
        padding: 'clamp(72px, 9vw, 120px) var(--container-pad)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      {/* Top rule */}
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'var(--color-accent)',
          opacity: 0.5,
        }}
      />

      {/* Statement text */}
      <div ref={linesRef} style={{textAlign: 'center'}}>
        {STATEMENT_LINES.map((line, li) => (
          <div
            key={li}
            style={{
              lineHeight: 1.05,
              marginBottom: li < STATEMENT_LINES.length - 1 ? '0.12em' : 0,
            }}
          >
            {line.split(' ').map((word, wi) => (
              <span
                key={wi}
                className="reveal-word"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(44px, 7.5vw, 96px)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-text-primary)',
                  marginRight: '0.28em',
                  willChange: 'transform, opacity',
                  opacity: 0, // SSR-safe: GSAP animates this to 1 on scroll
                }}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Sub-copy — initially hidden, fades in with words */}
      <p
        className="reveal-word"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(12px, 1.4vw, 14px)',
          fontWeight: 300,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
          maxWidth: '400px',
          textAlign: 'center',
          lineHeight: 1.9,
          opacity: 0,
        }}
      >
        Not a collection. Not a capsule.<br />
        One perfect thing, made for every occasion.
      </p>

      {/* Bottom rule */}
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'var(--color-accent)',
          opacity: 0.5,
        }}
      />
    </section>
  );
}
