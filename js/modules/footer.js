// ===== FOOTER MODULE =====

class Footer {
  constructor() {
    this.footer = document.querySelector('.footer');
    this.backToTopBtn = document.getElementById('backToTop');
    this.newsletterForm = document.getElementById('newsletterForm');
    this.currentYear = new Date().getFullYear();
    
    this.init();
  }

  init() {
    this.updateCopyright();
    this.setupBackToTop();
    this.setupNewsletterForm();
    this.setupFooterAnimations();
    this.addScrollEffects();
  }

  // Update copyright year automatically
  updateCopyright() {
    const copyrightText = document.querySelector('.footer-copyright span');
    if (copyrightText) {
      copyrightText.innerHTML = `&copy; ${this.currentYear} İsmail Umut Luoğlu. Made with love in İstanbul.`;
    }
  }

  // Back to top functionality
  setupBackToTop() {
    if (!this.backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.backToTopBtn.classList.add('visible');
      } else {
        this.backToTopBtn.classList.remove('visible');
      }
    });

    // Smooth scroll to top
    this.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Add click animation
      this.backToTopBtn.style.transform = 'translateY(-3px) scale(0.95)';
      setTimeout(() => {
        this.backToTopBtn.style.transform = '';
      }, 150);
    });
  }

  // Newsletter form functionality
  setupNewsletterForm() {
    if (!this.newsletterForm) return;

    this.newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = this.newsletterForm.querySelector('.newsletter-input');
      const submitBtn = this.newsletterForm.querySelector('.newsletter-btn');
      const email = emailInput.value.trim();

      // Validate email
      if (!this.isValidEmail(email)) {
        this.showNewsletterMessage('Lütfen geçerli bir email adresi giriniz.', 'error');
        return;
      }

      // Show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
      submitBtn.disabled = true;

      try {
        // Simulate API call (replace with actual implementation)
        await this.submitNewsletterSubscription(email);
        
        this.showNewsletterMessage('🎉 Başarıyla abone oldunuz! Teşekkürler.', 'success');
        emailInput.value = '';
        
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        this.showNewsletterMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async submitNewsletterSubscription(email) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true });
        } else {
          reject(new Error('Subscription failed'));
        }
      }, 1500);
    });

    // In a real application, you would make an API call:
    /*
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        timestamp: new Date().toISOString(),
        source: 'footer'
      })
    });
    
    if (!response.ok) {
      throw new Error('Newsletter subscription failed');
    }
    
    return response.json();
    */
  }

  showNewsletterMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = this.newsletterForm.querySelector('.newsletter-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `newsletter-message newsletter-message-${type}`;
    messageEl.innerHTML = message;
    
    // Add styles
    messageEl.style.cssText = `
      margin-top: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-lg);
      font-size: var(--text-sm);
      text-align: center;
      animation: slideInUp 0.3s ease-out;
      ${type === 'success' ? `
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: var(--success);
      ` : `
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: var(--error);
      `}
    `;

    this.newsletterForm.appendChild(messageEl);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.style.animation = 'slideOutDown 0.3s ease-out forwards';
        setTimeout(() => messageEl.remove(), 300);
      }
    }, 5000);
  }

  // Footer scroll animations
  setupFooterAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    if (this.footer) {
      observer.observe(this.footer);
    }
  }

  // Add scroll effects
  addScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const footerOffset = this.footer.offsetTop;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for footer background
    if (scrolled + windowHeight > footerOffset) {
      const rate = (scrolled + windowHeight - footerOffset) * 0.1;
      this.footer.style.backgroundPosition = `center ${rate}px`;
    }
  }

  // Add keyboard navigation for footer links
  addKeyboardNavigation() {
    const footerLinks = this.footer.querySelectorAll('a');
    
    footerLinks.forEach(link => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  // Add footer statistics counter animation
  animateStats() {
    const stats = this.footer.querySelectorAll('.footer-stat-number');
    
    stats.forEach(stat => {
      const target = parseInt(stat.textContent.replace(/\D/g, ''));
      const duration = 2000;
      const stepTime = 50;
      const steps = duration / stepTime;
      const stepValue = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
      }, stepTime);
    });
  }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideOutDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

document.head.appendChild(style);

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Footer();
});