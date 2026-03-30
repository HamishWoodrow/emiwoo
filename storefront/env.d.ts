/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

interface ImportMetaEnv {
  readonly PUBLIC_MUX_PLAYBACK_ID_HERO?: string;
  readonly PUBLIC_MUX_PLAYBACK_ID_STORY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';
