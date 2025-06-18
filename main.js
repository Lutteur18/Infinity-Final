document.addEventListener('DOMContentLoaded', function() {
  // Add parallax effect to hero section
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }

  // Initialize Intersection Observer for animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe solution cards
  const cards = document.querySelectorAll('.solution-card');
  cards.forEach(card => observer.observe(card));

  // Add floating elements to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    // Add multiple floating elements
    for (let i = 0; i < 3; i++) {
      const floatElement = document.createElement('div');
      floatElement.className = 'floating-element';
      floatElement.style.left = `${Math.random() * 100}vw`;
      floatElement.style.animationDelay = `${Math.random() * 3}s`;
      section.appendChild(floatElement);
    }
  });

  // Add smooth scrolling
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

  // Add water droplet effect on button hover
  document.querySelectorAll('button, .cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
      const droplet = document.createElement('div');
      droplet.className = 'droplet';
      
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      droplet.style.left = `${x - 5}px`;
      droplet.style.top = `${y - 5}px`;
      
      this.appendChild(droplet);
      setTimeout(() => droplet.remove(), 500);
    });
  });

  // Add parallax effect
  window.addEventListener('scroll', () => {
    const solutions = document.querySelector('.solutions');
    if (solutions) {
      const scrolled = window.pageYOffset;
      solutions.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });



  // Add raindrop animation
  function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    
    const width = window.innerWidth;
    const x = Math.random() * width;
    
    raindrop.style.left = `${x}px`;
    document.body.appendChild(raindrop);
    
    setTimeout(() => raindrop.remove(), 2000);
  }

  // Create raindrops randomly
  setInterval(createRaindrop, Math.random() * 2000 + 1000);





  // Handle FAQ form
  var faqForm = document.getElementById('faq-form');
  if (faqForm) {
    faqForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('faq-form-status').textContent =
        "Thank you for your question! We'll review and post a reply soon.";
      this.reset();
    });
  }

  // Handle quote modal
  const quoteBtn = document.getElementById('quote-btn');
  const quoteModal = document.getElementById('quote-modal');
  const closeBtn = document.querySelector('.close');
  const quoteForm = document.getElementById('quote-form');

  console.log('Modal elements:', {
    quoteBtn: !!quoteBtn,
    quoteModal: !!quoteModal,
    closeBtn: !!closeBtn,
    quoteForm: !!quoteForm
  });

  if (quoteBtn && quoteModal) {
    quoteBtn.addEventListener('click', function() {
      console.log('Quote button clicked');
      quoteModal.classList.add('visible');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === quoteModal) {
        console.log('Clicked outside modal');
        quoteModal.classList.remove('visible');
      }
    });

    // Close modal when clicking the close button
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        console.log('Close button clicked');
        quoteModal.classList.remove('visible');
      });
    }
  }

  // Handle quote form submission
  if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Form submitted with data:', {
        name: document.getElementById('quote-name').value,
        email: document.getElementById('quote-email').value,
        phone: document.getElementById('quote-phone').value,
        message: document.getElementById('quote-message').value
      });
      
      const formData = {
        name: document.getElementById('quote-name').value,
        email: document.getElementById('quote-email').value,
        phone: document.getElementById('quote-phone').value,
        message: document.getElementById('quote-message').value
      };

      try {
        const response = await fetch('http://localhost:3000/submit-quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          document.getElementById('quote-form-status').textContent =
            "Thank you for your quote request! We'll contact you shortly.";
          quoteForm.reset();
          quoteModal.classList.remove('visible');
        } else {
          document.getElementById('quote-form-status').textContent =
            "Sorry, there was an error submitting your request. Please try again.";
        }
      } catch (error) {
        document.getElementById('quote-form-status').textContent =
          "Sorry, there was an error submitting your request. Please try again.";
        console.error('Error:', error);
      }
    });
  }
});