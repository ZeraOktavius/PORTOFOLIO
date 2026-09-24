document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. NAVBAR SCROLL & MOBILE TOGGLE ---------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      });
    });
  }

  /* ---------- 2. SMOOTH SCROLL ---------- */
  function scrollToTarget(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Nav links
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget(link.getAttribute('href'));
    });
  });

  // Any element with data-scroll
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget(el.getAttribute('data-scroll'));
    });
  });

  /* ---------- 3. REVEAL ON SCROLL (Dijalankan Lebih Awal & Aman) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback jika browser lama
    revealEls.forEach(el => el.classList.add('active'));
  }

  /* ---------- 4. NEWSLETTER FORM (Optional / Safe) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMessage = document.getElementById('newsletterMessage');

  if (newsletterForm && newsletterEmail && newsletterMessage) {
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNewsletterMessage(text, type) {
      newsletterMessage.textContent = text;
      newsletterMessage.className = 'newsletter__message ' + type;
    }

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();

      if (email === '') {
        showNewsletterMessage('Email tidak boleh kosong.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNewsletterMessage('Format email tidak valid.', 'error');
        return;
      }

      showNewsletterMessage('Terima kasih! Email kamu berhasil didaftarkan.', 'success');
      newsletterForm.reset();
    });
  }

  /* ---------- 5. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});