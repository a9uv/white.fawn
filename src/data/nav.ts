/**
 * src/data/nav.ts
 * Single source of truth for navigation items, footer links, and the
 * base-aware URL helper.
 *
 * `url()` is the ONLY place in the codebase where import.meta.env.BASE_URL
 * is referenced. All internal links go through it.
 *
 * To remove the base path when switching to a custom domain:
 *   1. Delete `base` from astro.config.mjs.
 *   2. That's it — no other edits needed anywhere.
 */

export interface NavItem {
  label: string;
  /**
   * Bare internal path (e.g. '/portfolio') or anchor (e.g. '#about').
   * Always pass bare paths — url() prepends BASE_URL automatically.
   */
  href: string;
  /** 'link' renders as a text link; 'button' renders as the CTA pill. */
  variant: 'link' | 'button';
}

export interface LegalLink {
  label: string;
  href: string;
}

/**
 * Build a base-aware internal URL.
 *
 * - Anchor-only hrefs (#about) are returned unchanged — they don't need a base.
 * - All other paths have BASE_URL prepended.
 *
 * Usage:  href={url('/portfolio')}
 */
export function url(path: string): string {
  // Anchor links stay as-is
  if (path.startsWith('#')) return path;

  // import.meta.env.BASE_URL is injected by Astro/Vite at build time.
  // With `base: '/repo-name'` configured it equals '/repo-name/'.
  // With no base configured (custom domain) it equals '/'.
  const base: string = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

// ─── Primary navigation items ─────────────────────────────────────────────────
export const navItems: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    variant: 'link',
  },
  {
    label: 'Portfolio',
    href: '/portfolio', // Phase 2 placeholder — page does not exist yet
    variant: 'link',
  },
  {
    label: 'Contact',
    href: '/contact', // Phase 2 placeholder — page does not exist yet
    variant: 'button',
  },
];

// ─── Footer navigation (mirrors primary nav for consistency) ──────────────────
export const footerNavItems: NavItem[] = navItems;

// ─── Legal links (Phase 2 placeholder pages) ──────────────────────────────────
export const legalLinks: LegalLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },      // Phase 2 placeholder
  { label: 'Terms of Use', href: '/terms' },            // Phase 2 placeholder
  { label: 'Accessibility', href: '/accessibility' },   // Phase 2 placeholder
];
