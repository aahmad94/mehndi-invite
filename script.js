/* ============================================================
   script.js — Entry point
   Imports feature modules and wires up initialisation order.
   ============================================================ */

import { initSplash } from './js/splash.js';
import { initScrollReveal } from './js/scroll-reveal.js';
import { initThankYouReveal } from './js/thankyou-reveal.js';

function boot() {
    if (window.__inviteBooted) return;
    window.__inviteBooted = true;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    initSplash(() => {
        initScrollReveal();
        initThankYouReveal();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
