/* ============================================================
   script.js — Entry point
   Imports feature modules and wires up initialisation order.
   ============================================================ */

import { initSplash } from './js/splash.js';
import { initScrollReveal } from './js/scroll-reveal.js';
import { initThankYouReveal } from './js/thankyou-reveal.js?v=2';
import { startCountdown } from './js/countdown.js';

function boot() {
    if (window.__inviteBooted) return;
    window.__inviteBooted = true;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    initSplash(() => {
        initScrollReveal();
        initThankYouReveal();
        startCountdown();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
