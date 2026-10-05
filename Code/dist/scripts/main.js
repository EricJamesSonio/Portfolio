// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.05, rootMargin: '0px 0px 0px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
  observer.observe(el);
});


// ===== VIDEO LAZY LOADING =====
// Videos no longer autoplay on load (Phase 5): they start loading only when the
// card scrolls near the viewport, then play when in view and pause when off screen.
document.querySelectorAll('.project-video').forEach(video => {
  const source = video.querySelector('source[data-src]');
  if (!source) return;
  video.classList.add('video-pending');
});

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const video = entry.target;
    const source = video.querySelector('source[data-src]');
    if (!source) return;

    source.src = source.dataset.src;
    source.removeAttribute('data-src');
    video.load();
    video.classList.remove('video-pending');
    video.classList.add('video-loading');

    video.addEventListener('canplay', () => {
      video.classList.remove('video-loading');
      video.classList.add('video-ready');
      video.play().catch(() => {});
    }, { once: true });

    videoObserver.unobserve(video);
  });
}, { rootMargin: '0px 0px 200px 0px', threshold: 0 });

document.querySelectorAll('.project-video').forEach(video => {
  videoObserver.observe(video);
});

// Play when in view, pause when off screen (keeps at most one or two playing).
const playObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) video.play().catch(() => {});
    else video.pause();
  });
}, { threshold: 0.35 });

document.querySelectorAll('.project-video').forEach(video => {
  playObserver.observe(video);
});



// ===== PROJECT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});


// ===== CERTIFICATE LIGHTBOX =====
// Plain script (no React needed). Only active when a certificate with an image exists.
(function () {
  const lightbox = document.getElementById('cert-lightbox');
  if (!lightbox) return;

  const img = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const triggers = document.querySelectorAll('[data-cert-src]');
  if (!triggers.length) return;

  let lastFocused = null;

  function open(trigger) {
    lastFocused = trigger;
    img.src = trigger.dataset.certSrc;
    img.alt = trigger.dataset.certName || 'Certificate';
    lightbox.hidden = false;
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.hidden = true;
    img.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  closeBtn.addEventListener('click', close);

  // Backdrop click closes (but not clicks on the image itself)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Tab') {
      // Trap focus inside the dialog while it is open.
      e.preventDefault();
      closeBtn.focus();
    }
  });
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // The navbar was removed from the page flow in Phase 3, so it may not exist.
      const nav = document.querySelector('.navbar');
      const navHeight = nav ? nav.offsetHeight : 0;
      window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
    }
  });
});