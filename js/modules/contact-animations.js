// ===== CONTACT ANIMATIONS MODULE =====

class ContactAnimations {
  constructor() {
    this.contactSection = document.querySelector('.contact-section');
    this.observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.addInteractiveEffects();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Animate form fields with delay
          setTimeout(() => {
            this.animateFormFields();
          }, 600);
        }
      });
    }, this.observerOptions);

    if (this.contactSection) {
      observer.observe(this.contactSection);
    }
  }

  animateFormFields() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.style.opacity = '1';
        group.style.transform = 'translateY(0)';
        group.style.transition = 'all 0.4s ease-out';
      }, index * 100);
    });
  }

  addInteractiveEffects() {
    // Typing effect for form inputs
    this.addTypingEffects();
    
    // Social links hover animations
    this.addSocialHoverEffects();
    
    // Contact cards interactive effects
    this.addContactCardEffects();
  }

  addTypingEffects() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentNode.classList.remove('focused');
        }
      });
      
      input.addEventListener('input', () => {
        if (input.value) {
          input.parentNode.classList.add('has-content');
        } else {
          input.parentNode.classList.remove('has-content');
        }
      });
    });
  }

  addSocialHoverEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Create ripple effect
        this.createRippleEffect(link);
      });
    });
  }

  createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = 50;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      top: 50%;
      left: 50%;
      margin-top: -${size/2}px;
      margin-left: -${size/2}px;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addContactCardEffects() {
    const contactCards = document.querySelectorAll('.contact-info-card');
    
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-2px) scale(1)';
      });
    });
  }

  // Add particle effect for background
  addParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    
    this.contactSection.appendChild(canvas);
    
    // Simple particle animation
    let particles = [];
    const particleCount = 30;
    
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);
  }
}

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .form-group {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .form-group.focused .form-label {
    color: var(--primary-600);
    transform: translateY(-2px);
  }
`;

document.head.appendChild(style);

// Initialize contact animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactAnimations();
});