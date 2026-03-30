/**
 * SmoothScroll — wraps the page with Lenis smooth scroll.
 *
 * Driven by GSAP's ticker so that ScrollTrigger stays perfectly in sync.
 * Runs client-only (useEffect guard) so SSR is unaffected.
 *
 * Phase 2 note: if the wife's Sanity-driven sections need scroll snappin,
 * configure `lenis.options.snap` here.
 */
import {useEffect} from 'react';
import {gsap} from '~/lib/animations';

export function SmoothScroll() {
  useEffect(() => {
    let lenis: any;
    let lenisRafId: number;

    // Dynamic import keeps the bundle correct if the package hasn't been
    // installed yet (e.g. local dev before `pnpm install`).
    import('lenis').then(({default: Lenis}) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      // Connect Lenis RAF to GSAP ticker for perfect ScrollTrigger sync
      const onGsapTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onGsapTick);
      gsap.ticker.lagSmoothing(0);

      // Cleanup
      return () => {
        gsap.ticker.remove(onGsapTick);
        lenis.destroy();
      };
    });

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      if (lenisRafId) {
        cancelAnimationFrame(lenisRafId);
      }
    };
  }, []);

  // Renders nothing — purely a side-effect component
  return null;
}
