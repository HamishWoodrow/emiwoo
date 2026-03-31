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
      className="press-section-refined"
    >
      <div className="container">
        {/* Header */}
        <div className="press-header">
          <h2 className="press-title">
            As seen in
          </h2>
          <div className="press-title-rule" />
        </div>

        {/* Press cards */}
        <div ref={itemsRef} className="press-grid">
          {PRESS_ITEMS.map(({outlet, quote}) => (
            <div
              key={outlet}
              className="press-card"
            >
              {/* Outlet name */}
              <span className="press-outlet">
                {outlet}
              </span>

              <div className="press-card-rule" />

              {/* Quote */}
              <p className="press-quote">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
