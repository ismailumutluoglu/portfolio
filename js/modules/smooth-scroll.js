// ===== SMOOTH SCROLL MODULE =====

class SmoothScroll {
  constructor() {
    this.scrollIndicator = document.querySelector('.scroll-indicator');
    this.init();
  }

  init() {
    this.addScrollIndicatorHandler();
    this.addParallaxEffect();
  }

  // Scroll indicator click handler
  addScrollIndicatorHandler() {
    if (this.scrollIndicator) {
      this.scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
  }

  // Parallax effect for hero elements
  addParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero-section');
      
      if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll();
});