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
      data-header-theme="light"
      className="newsletter-section-refined"
    >
      {/* Top rule */}
      <div className="fade-in newsletter-rule" />

      {submitted ? (
        <div className="newsletter-thankyou">
          <span className="newsletter-thankyou-title">
            Thank you.
          </span>
          <p className="newsletter-thankyou-copy">
            You'll hear from us when it matters.
          </p>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="fade-in newsletter-heading">
            <h2 className="newsletter-title">
              Wear it first.
            </h2>
            <p className="newsletter-subtitle">
              No noise. Occasional letters.
            </p>
          </div>

          {/* Form */}
          <form
            className="fade-in"
            onSubmit={handleSubmit}
            style={{width: '100%'}}
          >
            <div className="newsletter-form-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="newsletter-input"
              />
              <button type="submit" className="btn-cta newsletter-submit-btn">
                Subscribe
              </button>
            </div>
          </form>
        </>
      )}

      {/* Bottom rule */}
      <div className="fade-in newsletter-rule" />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
