/* ============================================================
   thankyou-reveal.js — Slide sections up over the damask
   Starts as soon as the splash is tapped. No scrolling.
   ============================================================ */

export function initThankYouReveal() {
    const els = document.querySelectorAll('.section-countdown, .section-thankyou');
    if (!els.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = () => { els.forEach((el) => el.classList.add('visible')); };

    if (reduced) {
        show();
        return;
    }

    requestAnimationFrame(show);
}
