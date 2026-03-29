import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export {gsap, ScrollTrigger};

/** Returns true if we're on a touch/mobile device */
export const isMobile = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 768px)').matches;

/**
 * Standard parallax bind — attaches a vertical translate to an element
 * relative to its parent scroll trigger. Returns the ScrollTrigger instance.
 */
export function bindParallax(
  textEl: HTMLElement,
  triggerEl: HTMLElement,
  options: {yOffset?: number; mobileOffset?: number} = {},
) {
  const {yOffset = -80, mobileOffset = -40} = options;
  const mobile = isMobile();

  return gsap.to(textEl, {
    y: mobile ? mobileOffset : yOffset,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Word-by-word text reveal — staggers each word from opacity 0 to 1
 * as the user scrolls the section into view.
 */
export function bindTextReveal(
  words: NodeListOf<HTMLElement> | HTMLElement[],
  triggerEl: HTMLElement,
) {
  return gsap.fromTo(
    words,
    {opacity: 0, y: 20},
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    },
  );
}

/**
 * Fade-up reveal for single elements (used on section headings, CTAs etc.)
 */
export function bindFadeUp(
  el: HTMLElement | HTMLElement[],
  triggerEl: HTMLElement,
  delay = 0,
) {
  return gsap.fromTo(
    el,
    {opacity: 0, y: 40},
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    },
  );
}
