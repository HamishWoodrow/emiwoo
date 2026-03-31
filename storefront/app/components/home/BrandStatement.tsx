import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';
import {BRAND_STATEMENT_LINES} from '~/content/home';
import {prefersReducedMotion} from '~/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !linesRef.current) return;
      if (prefersReducedMotion()) {
        const words =
          linesRef.current.querySelectorAll<HTMLSpanElement>('.reveal-word');
        gsap.set(words, {opacity: 1, y: 0});
        return;
      }

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
      data-header-theme="light"
      className="brand-statement-section"
    >
      <div className="brand-statement-rule" />

      <div className="container brand-statement-grid">
        <div ref={linesRef} className="brand-statement-lines">
          {BRAND_STATEMENT_LINES.map((line, li) => (
            <div key={li} className="brand-statement-line">
              {line.split(' ').map((word, wi) => (
                <span key={wi} className="reveal-word brand-statement-word">
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="brand-statement-meta reveal-word">
          <span className="brand-statement-meta-kicker">Emi Woo Intent</span>
          <p className="brand-statement-meta-copy">
            Not a collection. Not a capsule.
            <br />
            One perfect thing, made for every occasion.
          </p>
          <div className="brand-statement-meta-rule" />
        </div>
      </div>

      <div className="brand-statement-rule" />
    </section>
  );
}
