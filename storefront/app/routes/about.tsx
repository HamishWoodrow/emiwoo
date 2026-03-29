import type {Route} from './+types/about';
import {Button} from '~/components/ui/Button';

export const meta: Route.MetaFunction = () => [
  {title: 'About — Emi Woo'},
  {name: 'description', content: 'The story behind Emi Woo.'},
];

const BRAND_VALUES = [
  {
    label: 'Singular focus',
    text: 'One product, perfected over years. Not a pivot. Not a collection. A commitment.',
  },
  {
    label: 'Honest materials',
    text: 'The silk is what we say it is. The construction is what you can feel. Nothing is dressed up or approximated.',
  },
  {
    label: 'For life, not the season',
    text: 'Emi Woo is not a trend purchase. It is the piece you keep, wear worn-in, and pass on.',
  },
];

export default function About() {
  return (
    <>
      {/* Page header */}
      <section
        style={{
          paddingTop: 'calc(72px + clamp(60px, 8vw, 100px))',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          paddingLeft: 'var(--container-pad)',
          paddingRight: 'var(--container-pad)',
          background: 'var(--color-bg)',
        }}
      >
        <div className="container">
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '20px',
            }}
          >
            Our Story
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.0,
              maxWidth: '700px',
            }}
          >
            About
          </h1>
        </div>
      </section>

      {/* Founder section */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: '0 var(--container-pad) clamp(80px, 10vw, 140px)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Founder portrait */}
          <div
            style={{
              aspectRatio: '4 / 5',
              overflow: 'hidden',
              background: 'var(--color-surface)',
            }}
          >
            <img
              src="/images/placeholders/founder-portrait.jpg"
              alt="Emi Woo, founder"
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>

          {/* Bio */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              paddingTop: '16px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.15,
                }}
              >
                Emi Woo
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginTop: '8px',
                }}
              >
                Founder & Designer
              </p>
            </div>

            <div
              style={{width: '40px', height: '1px', background: 'var(--color-border)'}}
            />

            {[
              'Emi spent twelve years working in fashion — first in buying, then in design — before she reached a simple conclusion: the industry was too interested in adding things, and not interested enough in making one thing worth keeping.',
              'The blouse started as a personal project. A pattern she refined across three years and forty iterations. Silk sourced from a small mill in Como that she visited six times before placing her first order. A cut that borrows nothing from trend and owes nothing to fashion cycles.',
              'She launched Emi Woo in 2023 with one product, no plans to expand, and no apology for either.',
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.4vw, 16px)',
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section
        style={{
          background: 'var(--color-surface)',
          padding: 'clamp(80px, 10vw, 140px) var(--container-pad)',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              marginBottom: '56px',
              fontStyle: 'italic',
            }}
          >
            What we believe
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1px',
              background: 'var(--color-border)',
            }}
          >
            {BRAND_VALUES.map(({label, text}) => (
              <div
                key={label}
                style={{
                  background: 'var(--color-surface)',
                  padding: 'clamp(32px, 4vw, 48px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--color-accent)',
                  }}
                >
                  {label}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: 'clamp(80px, 10vw, 120px) var(--container-pad)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-text-secondary)',
          }}
        >
          The blouse speaks for itself.
        </p>
        <Button to="/products/silk-blouse">Shop Now</Button>
      </section>
    </>
  );
}
