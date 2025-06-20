/*document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your quote request!');
});*/


// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Loading Screen
window.addEventListener('load', function () {
  setTimeout(() => {
    document.getElementById('loadingOverlay').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loadingOverlay').style.display = 'none';
    }, 500);
  }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navigation links
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

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const current = parseInt(counter.innerText);
    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(() => animateCounters(), 50);
    }
  });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(heroSection);

// Form submissions
document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert('Cotação enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

document.getElementById('modalQuoteForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Show loading state
  const submitBtn = document.querySelector('button[form="modalQuoteForm"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert('Cotação enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    bootstrap.Modal.getInstance(document.getElementById('quoteModal')).hide();
  }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add floating animation to elements
function addFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.hero-truck, .service-icon');
  floatingElements.forEach((element, index) => {
    element.style.animation = `float ${6 + index}s ease-in-out infinite`;
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

// Initialize floating animations
addFloatingAnimation();

// Add typewriter effect to hero title
function typewriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Apply typewriter effect when page loads
window.addEventListener('load', function () {
  setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typewriter(heroTitle, originalText, 50);
    }
  }, 2000);
});

// Add scroll-triggered animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);

// Mobile menu improvements
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', function () {
  this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', function () {
    if (window.innerWidth < 992) {
      navbarCollapse.classList.remove('show');
      navbarToggler.classList.remove('active');
    }
  });
});

// Add custom cursor effect
function addCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: var(--secondary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                display: none;
            `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
  });

  document.addEventListener('mouseleave', function () {
    cursor.style.display = 'none';
  });

  // Scale cursor on hover over interactive elements
  document.querySelectorAll('a, button, .service-card').forEach(element => {
    element.addEventListener('mouseenter', function () {
      cursor.style.transform = 'scale(1.5)';
    });

    element.addEventListener('mouseleave', function () {
      cursor.style.transform = 'scale(1)';
    });
  });
}

// Initialize custom cursor for desktop
if (window.innerWidth > 768) {
  addCustomCursor();
}

// Add particles background effect
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                overflow: hidden;
            `;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(74, 158, 255, 0.3);
                    border-radius: 50%;
                    animation: float-particle ${Math.random() * 10 + 5}s linear infinite;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
    particlesContainer.appendChild(particle);
  }

  document.querySelector('.hero').appendChild(particlesContainer);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function () {
  // Existing scroll functions
}, 16)); // ~60fps

console.log('🚛 Logisco Landing Page loaded successfully!');
