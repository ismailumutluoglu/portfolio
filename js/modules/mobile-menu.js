// ===== MOBILE MENU MODULE =====

class MobileMenu {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navbarToggler = document.querySelector('.navbar-toggler');
    this.navbarCollapse = document.querySelector('.navbar-collapse');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }

  init() {
    this.addScrollEffect();
    this.addMobileMenuHandlers();
    this.addSmoothScrolling();
  }

  // Scroll effect for navbar
  addScrollEffect() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scrolled class when scrolled
      if (scrollTop > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Mobile menu handlers
  addMobileMenuHandlers() {
    // Close menu when clicking nav links on mobile
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 991.98) {
          this.navbarCollapse.classList.remove('show');
          this.navbarToggler.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.navbarCollapse.classList.contains('show')) {
        this.navbarCollapse.classList.remove('show');
        this.navbarToggler.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scrolling for anchor links
  addSmoothScrolling() {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
            
            // Update active nav link
            this.updateActiveNavLink(link);
          }
        });
      }
    });
  }

  // Update active navigation link
  updateActiveNavLink(activeLink) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
});