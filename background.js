/* =========================================================
   CONSTELLATION BACKGROUND
   Plain Canvas2D — no external library needed.
   Stars drift slowly; nearby stars link with lines;
   the mouse acts like an extra "star" that pulls in links.
========================================================= */

(function () {
  const canvas = document.getElementById('constellation');
  const ctx = canvas.getContext('2d');

  let width, height, stars, mouse = { x: null, y: null };
  const STAR_COUNT_DESKTOP = 140;
  const STAR_COUNT_MOBILE = 70;
  const LINK_DISTANCE = 130;
  const MOUSE_LINK_DISTANCE = 180;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createStars() {
    const count = window.innerWidth < 700 ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.4,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // update + draw stars
    stars.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0 || s.x > width) s.vx *= -1;
      if (s.y < 0 || s.y > height) s.vy *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 243, 255, 0.8)';
      ctx.fill();
    });

    // star-to-star links
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DISTANCE) {
          const opacity = 1 - dist / LINK_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(124, 92, 255, ${opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // mouse links (the "you are part of the constellation" touch)
    if (mouse.x !== null) {
      stars.forEach((s) => {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_LINK_DISTANCE) {
          const opacity = 1 - dist / MOUSE_LINK_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 232, 212, ${opacity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // respect reduced-motion users
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  resize();
  createStars();
  if (!prefersReducedMotion) {
    step();
  } else {
    // draw a single static frame
    step_once();
  }

  function step_once() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 243, 255, 0.8)';
      ctx.fill();
    });
  }
})();