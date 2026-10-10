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
const roles = ['Peddineni Nanditha.','Integrated MTech Student.', 'Creator.', 'Designer.','Developer.', 'Perpectual Learner.'];
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
  '.about__panel, .timeline__item, .project-card, .cert-card, .contact__grid, ' +
  '.skills__filters, .profiles__avatar, .profile-card'
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
  window.location.href = `mailto:nanda.kongie45@gmail.com?subject=${subject}&body=${body}`;

  status.textContent = 'Opening your email client…';
  form.reset();
});

/* =========================================================
   7. RESUME MODAL
   
========================================================= */
const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeBackdrop = document.getElementById('resumeModalBackdrop');
const closeResumeModal = document.getElementById('closeResumeModal');
const resumeIframe = document.getElementById('resumeIframe');
const RESUME_PATH = '/assets/Nanditha_resume.pdf';

function openResumeModal() {
  resumeIframe.src = RESUME_PATH;
  resumeModal.classList.add('is-open');
  resumeModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeResumeModalFn() {
  resumeModal.classList.remove('is-open');
  resumeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  resumeIframe.src = ''; 
}

viewResumeBtn.addEventListener('click', openResumeModal);
closeResumeModal.addEventListener('click', closeResumeModalFn);
resumeBackdrop.addEventListener('click', closeResumeModalFn);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && resumeModal.classList.contains('is-open')) {
    closeResumeModalFn();
  }
});

/* =========================================================
   8. FOOTER YEAR
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   9. timeline
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const timelineSections = document.querySelectorAll(".timeline");

    function updateTimelines() {
        timelineSections.forEach((timelineSection) => {
            const timelineProgress =
                timelineSection.querySelector(".timeline-progress");

            const timelineDots =
                timelineSection.querySelectorAll(".timeline-dot");

            if (!timelineProgress) return;

            const sectionRect = timelineSection.getBoundingClientRect();
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Start filling the timeline when its top reaches
            // the middle of the viewport
            const startOffset = windowHeight / 2;
            const scrollDistance = startOffset - sectionRect.top;

            let progressPercentage =
                (scrollDistance / sectionHeight) * 100;

            progressPercentage = Math.max(
                0,
                Math.min(100, progressPercentage)
            );

            timelineProgress.style.height = `${progressPercentage}%`;

            // Activate dots as the progress line reaches them
            const lineBottom =
                timelineProgress.getBoundingClientRect().bottom;

            timelineDots.forEach((dot) => {
                const dotRect = dot.getBoundingClientRect();

                if (lineBottom >= dotRect.top + dotRect.height / 2) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        });
    }

    // Update on scroll and resize
    window.addEventListener("scroll", updateTimelines, {
        passive: true
    });

    window.addEventListener("resize", updateTimelines);

    // Set the correct initial state
    updateTimelines();
});