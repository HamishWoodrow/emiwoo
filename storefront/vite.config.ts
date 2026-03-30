import {defineConfig} from 'vite';
import {reactRouter} from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// Phase 1: no hydrogen() plugin — we target Vercel Node.js, not Oxygen/Cloudflare Workers.
// The hydrogen() Vite plugin configures the SSR bundle for the Cloudflare Workers runtime,
// which is incompatible with Vercel. It is re-added in Phase 2 only if switching to Oxygen.
export default defineConfig({
  envPrefix: ['VITE_', 'PUBLIC_'],
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    assetsInlineLimit: 0,
  },
  // GSAP ships ESM entrypoints; Vercel's function runtime was loading them as CJS from node_modules.
  // Bundling them into the SSR output avoids "Cannot use import statement outside a module".
  ssr: {
    noExternal: ['gsap', '@gsap/react'],
  },
});
