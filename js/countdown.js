/* ============================================================
   countdown.js — Live countdown to the Mehndi
   Target is 8 Nov 2026, 5:00 PM Pakistan Standard Time (UTC+5).
   ============================================================ */

const TARGET = new Date('2026-11-08T17:00:00+05:00');

function pad(n) {
    return String(n).padStart(2, '0');
}

export function startCountdown() {
    const days  = document.getElementById('cd-days');
    const hours = document.getElementById('cd-hours');
    const min   = document.getElementById('cd-min');
    const sec   = document.getElementById('cd-sec');
    if (!days || !hours || !min || !sec) return;

    function tick() {
        const diff = TARGET - Date.now();

        if (diff <= 0) {
            days.textContent  = '0';
            hours.textContent = '00';
            min.textContent   = '00';
            sec.textContent   = '00';
            return false;
        }

        days.textContent  = String(Math.floor(diff / 86400000));
        hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
        min.textContent   = pad(Math.floor((diff % 3600000)  / 60000));
        sec.textContent   = pad(Math.floor((diff % 60000)    / 1000));
        return true;
    }

    if (!tick()) return;
    const id = setInterval(() => {
        if (!tick()) clearInterval(id);
    }, 1000);
}
