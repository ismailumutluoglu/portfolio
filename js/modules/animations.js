// ===== ANIMATIONS MODULE =====

class Animations {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number[data-count]');
    this.observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupProjectAnimations();
  }

  // Counter animation
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;
    const stepValue = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      element.textContent = Math.floor(current);
      element.classList.add('animate');
    }, stepTime);
  }

  // Intersection Observer for animations
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate counters
          if (entry.target.classList.contains('about-section')) {
            entry.target.classList.add('animate');
            
            // Start counter animations
            this.counters.forEach(counter => {
              if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                this.animateCounter(counter);
              }
            });
          }
          
          // Animate skill tags
          const skillTags = entry.target.querySelectorAll('.skill-tag');
          skillTags.forEach((tag, index) => {
            setTimeout(() => {
              tag.style.animation = `aboutFadeIn 0.5s ease-out ${index * 0.1}s both`;
            }, 500);
          });
        }
      });
    }, this.observerOptions);

    // Observe about section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      observer.observe(aboutSection);
    }
  }

  // Scroll-based animations
  setupScrollAnimations() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Parallax effect for decorative elements
      const aboutSection = document.querySelector('.about-section');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const speed = 0.5;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const yPos = -(scrolled * speed);
          aboutSection.style.backgroundPosition = `center ${yPos}px`;
        }
      }
    });
  }

  // Skill tag hover effects
  addSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.animation = 'none';
        tag.style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Project animations on scroll
  setupProjectAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const projectCards = entry.target.querySelectorAll('.project-card');
          
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 150);
          });
        }
      });
    }, observerOptions);

    // Observe projects section
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
      observer.observe(projectsSection);
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Animations();
});