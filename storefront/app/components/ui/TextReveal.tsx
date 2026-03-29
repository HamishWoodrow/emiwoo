import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap, ScrollTrigger} from '~/lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  /** The text to reveal word by word */
  text: string;
  /** HTML element to render as */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

/**
 * Renders text split into individual word spans, each revealed
 * with a staggered GSAP animation as the element scrolls into view.
 */
export function TextReveal({
  text,
  as: Tag = 'h2',
  className = '',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll<HTMLSpanElement>('.word');

      gsap.fromTo(
        words,
        {opacity: 0, y: 24},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    },
    {scope: containerRef},
  );

  const words = text.split(' ');

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word"
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            willChange: 'transform, opacity',
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
