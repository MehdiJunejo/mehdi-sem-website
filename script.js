/* ============================================
   Mehdi Ali — Personal Website Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Language Bar Animation ---
  const langBars = document.querySelectorAll('.lang-bar');

  const langObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth + '%';
          bar.classList.add('animated');
          langObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  langBars.forEach((bar) => langObserver.observe(bar));

  // --- Nav Scroll Effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // --- Staggered Card Animation ---
  const staggerCards = (selector) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.glass-card, .skill-group');
            cards.forEach((card, index) => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 50);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
  };

  staggerCards('.research-grid');
  staggerCards('.interests-grid');
  staggerCards('.languages-grid');
  staggerCards('.skills-container');
  staggerCards('.about-grid');

  // --- Smooth Parallax on Hero ---
  const heroBg = document.querySelector('.hero-bg-glow');

  window.addEventListener('scroll', () => {
    if (heroBg) {
      const scroll = window.scrollY;
      heroBg.style.transform = `translateX(-50%) translateY(${scroll * 0.3}px)`;
      heroBg.style.opacity = Math.max(0.15 - scroll * 0.0003, 0);
    }
  });

  // --- Typing effect for hero tagline ---
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--accent)';
    let i = 0;

    const type = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40);
      } else {
        // Remove cursor after typing
        setTimeout(() => {
          tagline.style.borderRight = 'none';
        }, 1000);
      }
    };

    // Start typing after reveal animation
    setTimeout(type, 800);
  }
});
