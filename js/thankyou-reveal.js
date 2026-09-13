/* ============================================================
   thankyou-reveal.js — Delayed spring-in of the thank-you photo
   A few seconds after the splash, the image section eases into view.
   User scroll/touch cancels the auto-scroll so we never fight them.
   ============================================================ */

const SPLASH_FADE_MS = 900;
const DELAY_MS = 2200;
const SCROLL_MS = 1700;

function prefersReduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeOutBack(t) {
    const c1 = 1.18;
    const c3 = c1 + 1;
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function springScrollTo(y, duration, shouldCancel) {
    const start = window.scrollY;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const target = Math.min(maxY, Math.max(0, y));
    const dist = target - start;
    if (Math.abs(dist) < 8) return;

    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const t0 = performance.now();
    function frame(now) {
        if (shouldCancel()) {
            html.style.scrollBehavior = prev;
            return;
        }
        const t = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, start + dist * easeOutBack(t));
        if (t < 1) requestAnimationFrame(frame);
        else html.style.scrollBehavior = prev;
    }
    requestAnimationFrame(frame);
}

export function initThankYouReveal() {
    const el = document.querySelector('.section-thankyou');
    if (!el) return;

    let finished = false;
    let userTookOver = false;

    const markUser = () => { userTookOver = true; };

    function onKey(e) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'End') {
            markUser();
        }
    }

    function stopListen() {
        window.removeEventListener('wheel', markUser);
        window.removeEventListener('touchmove', markUser);
        window.removeEventListener('keydown', onKey);
    }

    function finish(doScroll) {
        if (finished) return;
        finished = true;
        stopListen();
        el.classList.add('visible');
        if (!doScroll || prefersReduced() || userTookOver) return;
        const y = el.getBoundingClientRect().top + window.scrollY;
        springScrollTo(y, SCROLL_MS, () => userTookOver);
    }

    if (prefersReduced()) {
        finish(false);
        return;
    }

    window.addEventListener('wheel', markUser, { passive: true });
    window.addEventListener('touchmove', markUser, { passive: true });
    window.addEventListener('keydown', onKey);

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && userTookOver) {
                finish(false);
                io.disconnect();
            }
        });
    }, { threshold: [0.35] });
    io.observe(el);

    window.setTimeout(() => {
        if (finished) return;
        finish(!userTookOver);
        io.disconnect();
    }, SPLASH_FADE_MS + DELAY_MS);
}
