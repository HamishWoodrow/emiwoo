/**
 * SmoothScroll — wraps the page with Lenis smooth scroll (v1.0.x).
 *
 * Driven by GSAP's ticker so that ScrollTrigger stays perfectly in sync.
 * Runs client-only (useEffect guard) so SSR is unaffected.
 *
 * Using lenis@1.0.45 — stable version without pnpm #imports conflicts.
 */
import {useEffect} from 'react';
import {gsap} from '~/lib/animations';

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

      // Tick Lenis inside GSAP's RAF for perfect ScrollTrigger sync
      gsapTickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(gsapTickerFn);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (gsapTickerFn) gsap.ticker.remove(gsapTickerFn);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
