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

// ===== EMAIL MODAL =====
// "Email Me" opens a composer, then hands a fully-written message to the visitor's own mail app
// via `mailto:`. Follows the cert-lightbox pattern above: role=dialog, Escape to close, backdrop
// click, focus trap, focus return, scroll lock.
//
// WHY mailto: AND NOT EmailJS — there is no email backend on this host. The repo deploys to GitHub
// Pages, which cannot run serverless functions (the same reason the chatbot needs a non-Pages
// host), and the EmailJS public key / service ID / template ID were removed in Phase 7 and are
// not in the repo. Rather than fake a "sent" state or hard-code credentials, the form composes a
// real message. To upgrade to silent sending later, replace the body of `sendMessage()` with an
// EmailJS `emailjs.send(...)` call and add the three IDs to a server-side function — the markup,
// validation and UX here do not change.
(function () {
  const modal = document.getElementById('email-modal');
  if (!modal) return;

  const form = document.getElementById('email-form');
  const error = document.getElementById('email-error');
  const panel = modal.querySelector('.email-modal-panel');
  const openers = document.querySelectorAll('[data-email-open]');
  if (!form || !openers.length) return;

  const firstField = form.querySelector('#email-name');
  let lastFocused = null;

  const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

  function showError(message, field) {
    error.textContent = message;
    error.hidden = false;
    if (field) {
      field.classList.add('is-invalid');
      field.focus();
    }
  }

  function clearError() {
    error.hidden = true;
    error.textContent = '';
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  }

  function open(trigger) {
    lastFocused = trigger;
    clearError();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (firstField) firstField.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  openers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      // The trigger is a real mailto: link, so if this script ever fails to load the visitor
      // still reaches the inbox. Only intercept when the modal can actually be shown.
      e.preventDefault();
      open(trigger);
    });
  });

  modal.querySelectorAll('[data-email-close]').forEach((btn) => {
    btn.addEventListener('click', close);
  });

  // Backdrop click closes, but a click inside the panel must not.
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const name = form.elements.name.value.trim();
    const replyTo = form.elements.email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();
    const to = form.dataset.emailTo;

    if (!message) {
      showError('Please write a message before sending.', form.elements.message);
      return;
    }
    // Only validate the address when the visitor actually typed one — an optional field should
    // not block sending just because it is empty.
    if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
      showError('That email address does not look right — or leave it blank.', form.elements.email);
      return;
    }

    const lines = [
      message,
      '',
      '—',
      name ? `From: ${name}` : '',
      replyTo ? `Reply to: ${replyTo}` : '',
    ].filter(Boolean);

    const href = `mailto:${to}` +
      `?subject=${encodeURIComponent(subject || 'Message from your portfolio')}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = href;
    close();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Tab') {
      // Trap focus inside the dialog while it is open.
      const items = panel.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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