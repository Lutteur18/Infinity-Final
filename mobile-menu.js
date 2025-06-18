// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const desktopNav = document.querySelector('.desktop-nav');
const skipLink = document.querySelector('.skip-link');
const sections = document.querySelectorAll('section');

// Debounce function for performance optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Intersection Observer for lazy loading
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => observer.observe(img));
};

// Initialize mobile menu
const initMobileMenu = () => {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    desktopNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      mobileMenu.classList.remove('active');
      desktopNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  skipLink.addEventListener('click', (event) => {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  });
};

// Smooth scrolling for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Intersection Observer for fade-in animations
const initFadeInAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
};

// Form handling
const handleFormSubmission = async (endpoint, formData, statusElement) => {
  try {
    statusElement.textContent = 'Sending...';
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    const data = await response.json();
    
    if (response.ok) {
      statusElement.textContent = data.message;
      return true;
    } else {
      statusElement.textContent = data.error || 'An error occurred';
      return false;
    }
  } catch (error) {
    statusElement.textContent = 'Sorry, there was an error. Please try again.';
    console.error('Form submission error:', error);
    return false;
  }
};

// FAQ Form
document.addEventListener('DOMContentLoaded', () => {
  const faqForm = document.getElementById('faq-form');
  if (faqForm) {
    faqForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(faqForm);
      const statusDiv = faqForm.querySelector('#faq-form-status');
      
      await handleFormSubmission('submit-question', formData, statusDiv);
      faqForm.reset();
    });
  }
});

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const statusDiv = contactForm.querySelector('#contact-form-status');
    
    await handleFormSubmission('submit-contact', formData, statusDiv);
    contactForm.reset();
  });
}

// Quote Request Form
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(quoteForm);
    const statusDiv = quoteForm.querySelector('#quote-form-status');
    
    await handleFormSubmission('submit-quote', formData, statusDiv);
    quoteForm.reset();
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  lazyLoadImages();
  initFadeInAnimations();
});
