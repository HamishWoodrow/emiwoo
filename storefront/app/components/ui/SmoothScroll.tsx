/**
 * SmoothScroll — Lenis smooth scroll, properly synced with GSAP ScrollTrigger.
 *
 * Two-step sync:
 *  1. GSAP ticker drives Lenis RAF (so animations are frame-perfect)
 *  2. lenis.on('scroll') calls ScrollTrigger.update() (so scroll-linked
 *     triggers read the correct animated scroll position, not native scrollY)
 *
 * Without step 2, ScrollTrigger reads window.scrollY before Lenis has
 * written its smoothed value, causing parallax elements to render at the
 * wrong position and creating the "double text / ghost position" artifact.
 */
import {useEffect} from 'react';
import {gsap, ScrollTrigger} from '~/lib/animations';

export function SmoothScroll() {
  useEffect(() => {
    let lenis: any;
    let gsapTickerFn: ((time: number) => void) | null = null;

    import('lenis').then((mod) => {
      const Lenis = mod.default ?? mod;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      // Step 1: GSAP ticker drives Lenis so animations are frame-perfect
      gsapTickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(gsapTickerFn);
      gsap.ticker.lagSmoothing(0);

      // Step 2: Tell ScrollTrigger to update on every Lenis scroll tick
      // This ensures scroll-linked parallax reads the smoothed position
      lenis.on('scroll', ScrollTrigger.update);

      // Step 3: Refresh ScrollTrigger after Lenis init so all trigger
      // positions are calculated against the correct scroll context
      ScrollTrigger.refresh();
    });

    return () => {
      if (gsapTickerFn) gsap.ticker.remove(gsapTickerFn);
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
