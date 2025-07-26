
/**
 * Simple Navbar Module
 * Clean and minimal navigation functionality
 */
class EnhancedNavbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isScrolled = false;
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    if (!this.navbar) return;
    
    this.setupScrollEffects();
    this.setupActiveNavDetection();
    this.setupSmoothScrolling();
  }

  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset;

      // Add/remove scrolled class
      if (currentScrollY > 50 && !this.isScrolled) {
        this.navbar.classList.add('scrolled');
        this.isScrolled = true;
      } else if (currentScrollY <= 50 && this.isScrolled) {
        this.navbar.classList.remove('scrolled');
        this.isScrolled = false;
      }

      this.lastScrollY = currentScrollY;
    }, { passive: true });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }

        // Close mobile menu if open
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(collapse);
          bsCollapse.hide();
        }
      });
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  setupActiveNavDetection() {
    window.addEventListener('scroll', () => {
      this.updateActiveNavLink();
    }, { passive: true });

    // Set initial active state
    this.updateActiveNavLink();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedNavbar();
});

export default EnhancedNavbar;
