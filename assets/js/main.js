// ===========================
// TYPED.JS INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  // ===========================
  // THEME TOGGLE (DARK/LIGHT MODE)
  // ===========================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.querySelector('.theme-toggle-icon');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);
  
  // Update icon based on current theme
  if (themeIcon) {
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const theme = htmlElement.getAttribute('data-theme');
      const newTheme = theme === 'light' ? 'dark' : 'light';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Update icon
      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      }

      // Add a ripple effect
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  }

  // Typing animation on homepage
  const typedElement = document.querySelector('.typed-text');
  if (typedElement && typeof Typed !== 'undefined') {
    new Typed('.typed-text', {
      strings: [
        'I am a Data Scientist.',
        'I am a Machine Learning Researcher.',
        'I am a Mathematics Student.',
        'I am a Python Expert.',
        'I am a Statistical Analyst.',
        'I am a Problem Solver.'
      ],
      typeSpeed: 70,
      backSpeed: 50,
      startDelay: 1400,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // ===========================
  // BACKGROUND CAROUSEL FOR SPLIT-SCREEN HERO
  // ===========================
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  if (carouselSlides.length > 0) {
    let currentSlide = 0;
    let autoTimer = null;

    const captionEl = document.querySelector('.carousel-caption');
    const quoteEl = document.querySelector('.carousel-quote');
    const authorEl = document.querySelector('.carousel-author');

    function updateCaption(slide) {
      if (!captionEl || !quoteEl) return;
      const quote = slide.getAttribute('data-quote') || '';
      const author = slide.getAttribute('data-author') || '';
      // fade out immediately, then wait for the slide cross-fade to take hold
      // before swapping text and fading the new caption in
      captionEl.classList.remove('is-visible');
      setTimeout(() => {
        quoteEl.textContent = quote;
        if (authorEl) authorEl.textContent = author;
        if (quote) captionEl.classList.add('is-visible');
      }, 1100);
    }

    function goToSlide(index) {
      carouselSlides[currentSlide].classList.remove('active');
      currentSlide = (index + carouselSlides.length) % carouselSlides.length;
      carouselSlides[currentSlide].classList.add('active');
      updateCaption(carouselSlides[currentSlide]);
    }

    function showNextSlide() { goToSlide(currentSlide + 1); }
    function showPrevSlide() { goToSlide(currentSlide - 1); }

    // initial caption for the first active slide
    updateCaption(carouselSlides[currentSlide]);

    // Respect reduced-motion preference, otherwise advance every 6s (longer so quotes can be read)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function startAuto() {
      if (!reduceMotion.matches) {
        autoTimer = setInterval(showNextSlide, 6000);
      }
    }
    function resetAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
      startAuto();
    }
    startAuto();

    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { showPrevSlide(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showNextSlide(); resetAuto(); });
  }

  // ===========================
  // MOBILE MENU TOGGLE
  // ===========================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.dropdown');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a:not(.dropbtn)');
    links.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav-container')) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Handle dropdown on mobile
    if (dropdown) {
      const dropbtn = dropdown.querySelector('.dropbtn');
      if (dropbtn) {
        dropbtn.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            const isOpen = dropdown.classList.toggle('active');
            dropbtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
        });
        // keep ARIA accurate when desktop hover opens the dropdown
        dropdown.addEventListener('mouseenter', () => {
          if (window.innerWidth > 768) dropbtn.setAttribute('aria-expanded', 'true');
        });
        dropdown.addEventListener('mouseleave', () => {
          if (window.innerWidth > 768) dropbtn.setAttribute('aria-expanded', 'false');
        });
      }
    }
  }

  // ===========================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===========================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ===========================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animations
  document.querySelectorAll('.skill-category, .project-card, .news-item, .edu-item').forEach(el => {
    observer.observe(el);
  });

  // ===========================
  // CTA BUTTONS ANIMATION
  // ===========================
  const ctaButtons = document.querySelectorAll('.cta-btn');
  ctaButtons.forEach((button, index) => {
    setTimeout(() => {
      button.style.opacity = '1';
      button.style.transform = 'translateY(0)';
    }, index * 150 + 700);
  });

  // ===========================
  // SCROLL TO TOP BUTTON
  // ===========================
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    // Scroll to top when clicked with smooth animation
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Add pulse animation on click
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // ===========================
  // NAVBAR BACKGROUND ON SCROLL
  // ===========================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }
    });
  }

  // ===========================
  // PARALLAX EFFECT FOR HERO SECTION
  // ===========================
  const heroSection = document.querySelector('.hero-home');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }

  // ===========================
  // ADD HOVER EFFECT TO CARDS
  // ===========================
  const cards = document.querySelectorAll('.project-card, .skill-category, .edu-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // ===========================
  // LOADING ANIMATION
  // ===========================
  window.addEventListener('load', function() {
    // Remove page loader if it exists
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
      setTimeout(() => {
        pageLoader.classList.add('hidden');
        setTimeout(() => {
          pageLoader.remove();
        }, 500);
      }, 300);
    }
    
    // Fade in body content
    document.body.style.opacity = '0';
    setTimeout(function() {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

  // ===========================
  // CONSOLE MESSAGE
  // ===========================
  console.log('%c👋 Welcome to my website!', 'font-size: 20px; color: #007bff; font-weight: bold;');
  console.log('%cBuilt with ❤️ and modern web technologies', 'font-size: 14px; color: #6b7280;');
  console.log('%cInterested in collaboration? Contact me!', 'font-size: 14px; color: #10b981;');
});

// ===========================
// CERTIFICATION ACCORDION TOGGLE
// ===========================
function toggleCertCategory(header) {
  // Toggle active state on header
  const isOpen = header.classList.toggle('active');

  // Get the body element
  const body = header.nextElementSibling;

  // Toggle active state on body
  body.classList.toggle('active');

  // Keep ARIA in sync for screen readers
  header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// a11y: make accordion headers keyboard-operable
document.querySelectorAll('.cert-category-header').forEach((header, idx) => {
  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-expanded', 'false');
  const body = header.nextElementSibling;
  if (body) {
    const bodyId = body.id || `cert-body-${idx}`;
    body.id = bodyId;
    header.setAttribute('aria-controls', bodyId);
  }
  header.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCertCategory(this);
    }
  });
});

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      // Optional: stop observing after reveal
      // revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// ===========================
// MOBILE FLIP CARDS (TOUCH SUPPORT)
// ===========================
const skillCards = document.querySelectorAll('.skill-card-flip');

skillCards.forEach(card => {
  // a11y: make each flip card keyboard-focusable and announce its toggle state
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-pressed', 'false');

  const toggle = function (e) {
    e.stopPropagation();
    skillCards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('is-flipped');
        otherCard.setAttribute('aria-pressed', 'false');
      }
    });
    const flipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
  };

  card.addEventListener('click', toggle);
  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(e);
    }
  });
});

// Close all cards when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.skill-card-flip')) {
    skillCards.forEach(card => {
      card.classList.remove('is-flipped');
      card.setAttribute('aria-pressed', 'false');
    });
  }
});
