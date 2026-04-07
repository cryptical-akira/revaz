// ========== NAV: scrolled state + mobile toggle ==========
const nav = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');

const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ========== CLOCK (Tbilisi / GE time — browser local used as proxy) ==========
const clockEl = document.getElementById('clock');
const tickClock = () => {
  if (!clockEl) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
};
tickClock();
setInterval(tickClock, 1000);

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;

window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  if (cursorDot) { cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px'; }
});

const follow = () => {
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  if (cursor) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; }
  requestAnimationFrame(follow);
};
follow();

document.querySelectorAll('a, button, .card, .beyond-card, .spec, .c-link, .tags span, .project.featured').forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
});

// ========== REVEAL ON SCROLL ==========
const io = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ========== TEXT SCRAMBLE (for data-scramble elements on load) ==========
const chars = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Scramble {
  constructor(el) {
    this.el = el;
    this.original = el.textContent;
  }
  run() {
    const text = this.original;
    const len = text.length;
    const queue = [];
    for (let i = 0; i < len; i++) {
      const from = '';
      const to = text[i];
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 30) + 10;
      queue.push({ from, to, start, end, char: '' });
    }
    let frame = 0;
    const update = () => {
      let out = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) { complete++; out += to; }
        else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          out += char;
        } else out += from;
      }
      this.el.textContent = out;
      if (complete < queue.length) { frame++; requestAnimationFrame(update); }
      else this.el.textContent = this.original;
    };
    update();
  }
}
document.querySelectorAll('[data-scramble]').forEach((el, i) => {
  const s = new Scramble(el);
  setTimeout(() => s.run(), 200 + i * 150);
});

// ========== HERO: animated grid / particle network ==========
const canvas = document.getElementById('grid-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, points = [];
  const COUNT = 70;

  const resize = () => {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  };
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    points.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    // subtle background grid
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1;
    const g = 72 * devicePixelRatio;
    for (let x = 0; x < w; x += g) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += g) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // particles
    points.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });

    // connecting lines
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const max = 150 * devicePixelRatio;
        if (d < max) {
          ctx.strokeStyle = `rgba(255,255,255,${0.2 * (1 - d / max)})`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}
