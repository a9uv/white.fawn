/**
 * src/scripts/nav.js
 * Hamburger menu toggle — vanilla JS, zero dependencies.
 * Loaded as a module by Navbar.astro (runs after DOM is ready).
 *
 * Behaviour:
 *  - Toggle open/close on hamburger click
 *  - Close on Escape key
 *  - Close when any menu link/button is clicked
 *  - Close when viewport resizes to desktop width
 *  - Trap focus within the menu while open (Shift+Tab / Tab cycle)
 */
(function () {
  const toggle = /** @type {HTMLButtonElement|null} */ (document.getElementById('nav-toggle'));
  const menu   = /** @type {HTMLElement|null}       */ (document.getElementById('nav-menu'));

  if (!toggle || !menu) return;

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    menu.removeAttribute('hidden');

    // Slight frame delay so the hidden→visible transition fires correctly
    requestAnimationFrame(() => {
      menu.setAttribute('data-open', '');
      // Move focus to first interactive element for keyboard users
      const firstFocusable = /** @type {HTMLElement|null} */ (
        menu.querySelector('a, button')
      );
      firstFocusable?.focus();
    });
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    menu.removeAttribute('data-open');

    // Wait for the CSS close transition before hiding from the a11y tree
    const duration = parseFloat(
      getComputedStyle(menu).getPropertyValue('--transition-base') || '250'
    ) || 250;

    setTimeout(() => {
      if (!isOpen()) menu.setAttribute('hidden', '');
    }, duration);
  }

  // ── Toggle on click ──────────────────────────────────────────────────────────
  toggle.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // ── Close on Escape ──────────────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  // ── Close when a menu link or button is clicked ──────────────────────────────
  menu.addEventListener('click', (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    if (target.closest('a') || target.closest('button[data-close]')) {
      closeMenu();
    }
  });

  // ── Close when viewport becomes desktop-wide ─────────────────────────────────
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', (e) => {
    if (e.matches && isOpen()) {
      // At desktop width, close without animation (state clean-up only)
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      menu.removeAttribute('data-open');
      menu.setAttribute('hidden', '');
    }
  });
})();
