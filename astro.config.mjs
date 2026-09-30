// @ts-check
import { defineConfig } from 'astro/config';

// ─── GitHub Pages deployment ─────────────────────────────────────────────────
// TODO: Replace the two placeholders below before pushing to GitHub Pages.
//
//   site → your full GitHub Pages URL, e.g. 'https://a9uv.github.io'
//   base → the repository name with a leading slash, e.g. '/white.fawn'
//
// Custom domain migration: delete the `base` line and update `site` to your
// custom domain. No other edits are needed anywhere in the codebase.
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  output: 'static',
  site: 'https://a9uv.github.io',
  base: '/white.fawn',                      // delete this line when switching to a custom domain
});
