/* ============================================================
   thankyou-reveal.js — Slide the thank-you photo up over the damask
   Starts as soon as the splash is tapped. No scrolling.
   ============================================================ */

export function initThankYouReveal() {
    const el = document.querySelector('.section-thankyou');
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        el.classList.add('visible');
        return;
    }

    requestAnimationFrame(() => {
        el.classList.add('visible');
    });
}
