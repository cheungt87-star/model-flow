// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Respect reduced motion for the hero video
const video = document.querySelector('.hero-card video');
if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.removeAttribute('autoplay');
  video.pause();
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
    window.location.href = `mailto:hello@modelflow.ae?subject=${subject}&body=${body}`;
    form.classList.add('sent');
    form.reset();
  });
}

const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
