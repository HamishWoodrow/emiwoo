import type {Route} from './+types/intent';
import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';
import {Button} from '~/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const meta: Route.MetaFunction = () => [
  {title: 'Intent — Emi Woo'},
  {
    name: 'description',
    content: 'Why Emi Woo exists. The philosophy behind a single, perfect blouse.',
  },
];

const SECTIONS = [
  {
    quote: "We didn\u2019t want to make more. We wanted to make one thing, perfectly.",
    body: "The fashion industry is built on volume. New seasons, new collections, new reasons to want more. Emi Woo was built in deliberate opposition to this. Not as a statement, but as a conviction: that the most useful thing a brand can do is make one extraordinary thing and give it your full attention.",
  },
  {
    quote: 'Silk was not a choice. It was the only material that could carry the idea.',
    body: 'We spent three years testing fabrics before we were ready. Dozens of silks, from mills across France, Italy and Japan. Most were beautiful. Most were not right. When we found the silk that would become the Emi Woo blouse, we knew immediately. It has a weight that feels substantive but not heavy. A drape that is neither limp nor stiff. It holds colour in a way that makes everything else look approximate.',
  },
  {
    quote: "The woman who wears Emi Woo doesn\u2019t want more options. She wants the right one.",
    body: "Our customer is not looking for novelty. She has enough clothes. She is looking for the piece she reaches for first, the one that makes everything else look considered, the blouse she has been searching for without knowing exactly what she was searching for. That is what Emi Woo is for.",
  },
];

function IntentSection({
  quote,
  body,
  index,
}: {
  quote: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const children = ref.current.querySelectorAll<HTMLElement>('.fade-el');
      gsap.fromTo(
        children,
        {opacity: 0, y: 32},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    },
    {scope: ref},
  );

  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) 0',
        borderBottom: index < SECTIONS.length - 1 ? '1px solid var(--color-border)' : 'none',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px',
      }}
    >
      <blockquote
        className="fade-el"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 3.5vw, 40px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.25,
          color: 'var(--color-text-primary)',
          maxWidth: '700px',
        }}
      >
        "{quote}"
      </blockquote>
      <div
        className="fade-el"
        style={{width: '40px', height: '1px', background: 'var(--color-accent)'}}
      />
      <p
        className="fade-el"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.4vw, 16px)',
          fontWeight: 300,
          lineHeight: 1.85,
          color: 'var(--color-text-secondary)',
          maxWidth: '580px',
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default function Intent() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '70svh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          overflow: 'hidden',
        }}
      >
        <div style={{position: 'absolute', inset: 0}}>
          <img
            src="/images/placeholders/intent-hero.jpg"
            alt=""
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(26,22,17,0.82) 0%, rgba(26,22,17,0.35) 60%)',
            }}
          />
        </div>
        <div className="container" style={{position: 'relative', zIndex: 10}}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '16px',
            }}
          >
            Why Emi Woo
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7vw, 92px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.0,
            }}
          >
            Intent
          </h1>
        </div>
      </section>

      {/* Content sections */}
      <section style={{background: 'var(--color-bg)', padding: '0 var(--container-pad)'}}>
        <div className="container">
          {SECTIONS.map((s, i) => (
            <IntentSection key={i} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: 'clamp(80px, 10vw, 120px) var(--container-pad)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-text-primary)',
          }}
        >
          This is what it means.
        </h2>
        <Button to="/products/silk-blouse">The Blouse</Button>
      </section>
    </>
  );
}
