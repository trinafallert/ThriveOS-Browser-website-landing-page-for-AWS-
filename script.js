// ============================================================
// ThriveOS — Interactions & Animations
// ============================================================

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// --- Mobile hamburger ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// --- Scroll reveal ---
const revealEls = document.querySelectorAll(
  '.problem-card, .step-card, .feature-card, .uc-card, .value-card, ' +
  '.vision-inner, .compare-table, .hero-stats, .hero-visual, ' +
  '.section-title, .section-label, .section-sub, .waitlist-inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards in the same parent
      const siblings = Array.from(entry.target.parentElement.children)
        .filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// --- Waitlist form ---
const form = document.getElementById('waitlist-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.innerHTML = `
    <div class="form-success">
      ✓ You're on the list! We'll be in touch soon.
    </div>
  `;
});

// --- Smooth active nav highlighting ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// --- Subtle parallax on hero orbs ---
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translateX(-60%) translateY(${scrolled * 0.15}px)`;
  if (orb2) orb2.style.transform = `translateY(${scrolled * -0.1}px)`;
}, { passive: true });
