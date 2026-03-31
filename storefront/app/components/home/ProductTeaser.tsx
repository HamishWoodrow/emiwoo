import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';
import {Button} from '~/components/ui/Button';
import {PLACEHOLDER_IMAGES} from '~/content/home';

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
      data-header-theme="dark"
      className="product-teaser-section"
    >
      {/* Full-bleed product image */}
      <div style={{position: 'absolute', inset: 0}}>
        <img
          src={PLACEHOLDER_IMAGES.productTeaser}
          alt="Emi Woo silk blouse"
          width={1600}
          height={1200}
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
      <div ref={contentRef} className="product-teaser-content container">
        <span className="product-teaser-kicker">
          The Blouse
        </span>

        <h2 className="product-teaser-title">
          The Silk Blouse
        </h2>

        <p className="product-teaser-subtitle">
          Where the collection begins — more pieces to follow.
        </p>

        <div className="product-teaser-cta">
          <Button to="/products/silk-blouse" variant="cta-light">
            View the Blouse
          </Button>
        </div>
      </div>
    </section>
  );
}
