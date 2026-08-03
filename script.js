/* =========================================================
   1. NAV: mobile toggle + active link on scroll
========================================================= */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

document.querySelectorAll('.nav__links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

/* =========================================================
   2. TYPING ROLE EFFECT
========================================================= */
const roles = ['Developer', 'Creator', 'Designer', 'Writer' , 'Lifelong Learner'];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

/* =========================================================
   3. SCROLL REVEAL (IntersectionObserver)
========================================================= */
const revealTargets = document.querySelectorAll(
  '.section__eyebrow, .section__title, .section__lead, ' +
  '.about__grid, .timeline__item, .project-card, .cert-card, .contact__grid, .skills__filters'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

/* =========================================================
   4. SKILLS FILTER TABS
   Each .skill-tile has a data-category attribute (can hold more
   than one, space-separated, e.g. "frontend backend") for skills
   that span categories, like Next.js.
========================================================= */
const filterPills = document.querySelectorAll('.filter-pill');
const skillTiles = document.querySelectorAll('.skill-tile');

filterPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    filterPills.forEach((p) => p.classList.remove('is-active'));
    pill.classList.add('is-active');

    const filter = pill.dataset.filter;
    skillTiles.forEach((tile) => {
      const categories = tile.dataset.category.split(' ');
      const show = filter === 'all' || categories.includes(filter);
      tile.classList.toggle('is-hidden', !show);
    });
  });
});

/* =========================================================
   5. CONTACT FORM
   Default: opens the user's email client via mailto.
   Swap this out for EmailJS / Formspree / your own backend —
   see the "Wiring up the contact form" step in the guide.
========================================================= */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:nandithapeddineni@example.com?subject=${subject}&body=${body}`;

  status.textContent = 'Opening your email client…';
  form.reset();
});

/* =========================================================
   6. FOOTER YEAR
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();