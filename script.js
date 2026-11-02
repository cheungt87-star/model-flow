document.documentElement.classList.add('js');

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Hero video: force muted inline autoplay (required by iOS/Android), retry if the browser blocks it
const video = document.querySelector('.hero-card video');
if (video) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  } else {
    const tryPlay = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
    // Low Power Mode and some in-app browsers block autoplay until the first touch
    ['touchstart', 'pointerdown', 'scroll', 'click'].forEach((ev) =>
      window.addEventListener(ev, () => { if (video.paused) tryPlay(); }, { once: true, passive: true })
    );
  }
}

// Contact form: opens the visitor's email client addressed to the team.
// Swap this handler for a fetch() to your form backend (Formspree, Resend, etc.) when ready.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = encodeURIComponent(`Modelflow enquiry from ${d.get('name')}`);
    const body = encodeURIComponent(`${d.get('query')}\n\n— ${d.get('name')} (${d.get('email')})`);
    window.location.href = `mailto:info@modelflow.ae?subject=${subject}&body=${body}`;
    form.classList.add('sent');
    form.reset();
  });
}

const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// How we work: light the steps up one after another, draw the journey line, count the numbers
const cards = document.querySelector('#approach .cards');
if (cards) {
  const steps = [...cards.querySelectorAll('.step')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = (el) => {
    const to = +el.dataset.n; const t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 700); el.textContent = String(Math.round(to * p)).padStart(2, '0'); if (p < 1) requestAnimationFrame(tick); };
    el.textContent = '00'; requestAnimationFrame(tick);
  };
  const light = (s) => { if (s.classList.contains('lit')) return; s.classList.add('lit'); if (!reduce) count(s.querySelector('.num')); };
  if (window.matchMedia('(max-width: 900px)').matches) {
    // Stacked layout: light each step as it scrolls into view
    const po = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { light(e.target); po.unobserve(e.target); } }), { threshold: 0.45 });
    steps.forEach((s) => po.observe(s));
  } else {
    const run = () => steps.forEach((s, i) => setTimeout(() => light(s), reduce ? 0 : i * 650));
    const so = new IntersectionObserver((es) => { if (es[0].isIntersecting) { so.disconnect(); run(); } }, { threshold: 0.2 });
    so.observe(cards);
  }
}
