/* ============================================
   PropMall Special Promotion - Main JS
   Modules:
   1. YouTube facade (click-to-load testimonial videos)
   2. Subscribe Button web component
   3. FAQ accordion
   4. Countdown timer (price rise deadline)
   ============================================ */

/* ---------- 1. YouTube facade ---------- */
(function () {
    function loadVideo(el) {
        const videoId = el.dataset.videoId;
        const iframe = document.createElement('iframe');
        iframe.className = 'w-full h-full';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`;
        iframe.title = el.getAttribute('aria-label') || el.querySelector('img')?.alt || 'YouTube video';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', '');
        el.innerHTML = '';
        el.appendChild(iframe);
        el.classList.remove('cursor-pointer', 'group');
        el.removeAttribute('role');
        el.removeAttribute('tabindex');
        el.removeAttribute('aria-label');
    }

    document.querySelectorAll('.yt-facade').forEach((el) => {
        el.addEventListener('click', () => loadVideo(el));
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                loadVideo(el);
            }
        });
    });
})();

/* ---------- 2. Subscribe Button web component ---------- */
class SubscribeButton extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute('href') || 'https://propmall.co/subscribe';
        const variant = this.getAttribute('variant') || 'full';
        const extra = this.getAttribute('extra-class') || '';
        const base = 'buttonElevate buttonBounce bg-pm-orange-light text-white font-bold text-sm lg:text-lg tracking-[4px] py-6 rounded-none border border-white hover:opacity-90 transition-opacity text-center';
        const layout = variant === 'inline' ? 'inline-block px-8 lg:px-20' : 'block w-full';
        // External links open in new tab; internal anchors (#...) stay in same tab
        const isExternal = !href.startsWith('#');
        const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        this.innerHTML = `<a href="${href}"${target} class="${layout} ${base} ${extra}">I WANT TO SUBSCRIBE PROPMALL PREMIUM NOW!</a>`;
    }
}
customElements.define('subscribe-button', SubscribeButton);

/* ---------- 3. FAQ accordion ---------- */
(function () {
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach((btn) => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            if (isOpen) {
                content.style.maxHeight = '0px';
                icon.style.transform = '';
                icon.classList.remove('is-open');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
                icon.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();

/* ---------- 4. Countdown timer ---------- */
(function () {
    // Deadline: May 1, 2026 · 12:00 AM MYT (UTC+8)
    const deadline = new Date('2026-05-01T00:00:00+08:00').getTime();

    const activeEl = document.getElementById('countdown-active');
    const expiredEl = document.getElementById('countdown-expired');
    const daysEl = document.getElementById('countdown-days');
    const hrsEl = document.getElementById('countdown-hrs');
    const minEl = document.getElementById('countdown-min');
    const secEl = document.getElementById('countdown-sec');

    if (!daysEl) return;

    let intervalId = null;

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function showExpired() {
        if (activeEl) activeEl.classList.add('hidden');
        if (expiredEl) {
            expiredEl.classList.remove('hidden');
            expiredEl.classList.add('flex');
        }
        if (intervalId) clearInterval(intervalId);
    }

    function setDigit(el, value) {
        const next = pad(value);
        if (el.textContent === next) return;
        el.textContent = next;
        el.classList.remove('cdp');
        void el.offsetWidth; // force reflow so the animation restarts
        el.classList.add('cdp');
    }

    function update() {
        const diff = deadline - Date.now();

        if (diff <= 0) {
            showExpired();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((diff % (1000 * 60)) / 1000);

        setDigit(daysEl, days);
        setDigit(hrsEl, hrs);
        setDigit(minEl, min);
        setDigit(secEl, sec);
    }

    update();
    intervalId = setInterval(update, 1000);
})();
