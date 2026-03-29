import {useRef, useState} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll<HTMLElement>('.fade-in');
      gsap.fromTo(
        els,
        {opacity: 0, y: 24},
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    },
    {scope: sectionRef},
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(80px, 10vw, 140px) var(--container-pad)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
      }}
    >
      {/* Top rule */}
      <div
        className="fade-in"
        style={{width: '1px', height: '60px', background: 'var(--color-border)'}}
      />

      {submitted ? (
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeUp 0.8s ease both',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-accent)',
            }}
          >
            Thank you.
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: 'var(--color-text-secondary)',
            }}
          >
            You'll hear from us when it matters.
          </p>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div
            className="fade-in"
            style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center'}}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: 'var(--color-text-primary)',
                lineHeight: 1.05,
              }}
            >
              Wear it first.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'var(--color-text-secondary)',
                marginTop: '4px',
              }}
            >
              No noise. Occasional letters.
            </p>
          </div>

          {/* Form */}
          <form
            className="fade-in"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0',
              width: '100%',
              maxWidth: '480px',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="newsletter-input"
              style={{flex: 1, paddingRight: '16px'}}
            />
            <button
              type="submit"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 0 12px 16px',
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s',
              }}
            >
              Subscribe
            </button>
          </form>
        </>
      )}

      {/* Bottom rule */}
      <div
        className="fade-in"
        style={{width: '1px', height: '60px', background: 'var(--color-border)'}}
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
