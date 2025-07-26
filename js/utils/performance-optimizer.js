// ===== PERFORMANCE OPTIMIZATION MODULE =====

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeScrollPerformance();
    this.addServiceWorker();
    this.measurePerformance();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    const criticalResources = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  optimizeScrollPerformance() {
    let ticking = false;

    function updateScrollEffects() {
      // Batch DOM reads and writes
      requestAnimationFrame(() => {
        // Your scroll-based animations here
        ticking = false;
      });
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        updateScrollEffects();
        ticking = true;
      }
    });
  }

  addServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  measurePerformance() {
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Send to analytics (optional)
        // this.sendPerformanceData({ loadTime });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PerformanceOptimizer();
});
