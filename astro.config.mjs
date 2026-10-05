import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/Portfolio'
  // NOTE (Phase 0): `build.assets: 'assets'` was intentionally removed.
  // It made Vite emit bundled JS/CSS into `dist/assets/`, the same folder as
  // `public/assets/` (the user's images and videos). Astro's default `_astro`
  // folder keeps bundles separate and protects the user's media.
});

