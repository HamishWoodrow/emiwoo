import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './schemaTypes';
/**
 * Phase 2 — Content model for hydrogen-sanity.
 * Add `@mux/sanity-plugin-media` when wiring Mux uploads in Studio:
 *   pnpm add @mux/sanity-plugin-media
 *   plugins: [structureTool(), visionTool(), muxVideo()]
 */
export default defineConfig({
  name: 'emiwoo',
  title: 'Emi Woo',
  projectId: 'uiirktm4',
  dataset: 'prod',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
