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
