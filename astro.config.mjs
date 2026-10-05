import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  base: '/Portfolio',

  // Canonical origin used for <link rel="canonical">, Open Graph and the sitemap.
  // Update this if the site moves to a custom domain.
  site: 'https://ericjamessonio.github.io',

  // React is used ONLY for small islands (GitHub graph in Phase 6, chatbot in
  // Phase 9). Everything else stays .astro with plain CSS.
  integrations: [react()],
});

// NOTE (Phase 0): `build.assets: 'assets'` was intentionally removed.
// It made Vite emit bundled JS/CSS into `dist/assets/`, the same folder as
// `public/assets/` (the user's images and videos). Astro's default `_astro`
// folder keeps bundles separate and protects the user's media.

