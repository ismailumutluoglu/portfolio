// ===== ANALYTICS MODULE =====

class Analytics {
  constructor() {
    this.init();
  }

  init() {
    this.setupGoogleAnalytics();
    this.trackUserInteractions();
    this.trackPerformance();
    this.trackErrors();
  }

  setupGoogleAnalytics() {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    
    // Make gtag available globally
    window.gtag = gtag;
  }

  trackUserInteractions() {
    // Track button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn, a[href^="#"]')) {
        this.trackEvent('click', {
          element_type: e.target.tagName.toLowerCase(),
          element_text: e.target.textContent.trim(),
          element_class: e.target.className
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      this.trackEvent('form_submit', {
        form_id: e.target.id,
        form_name: e.target.name || 'unnamed_form'
      });
    });

    // Track scroll depth
    this.trackScrollDepth();
  }

  trackScrollDepth() {
    const milestones = [25, 50, 75, 100];
    const triggered = new Set();

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone);
          this.trackEvent('scroll_depth', {
            depth_percentage: milestone
          });
        }
      });
    });
  }

  trackPerformance() {
    window.addEventListener('load', () => {
      // Core Web Vitals
      this.trackWebVitals();
      
      // Page load metrics
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      
      this.trackEvent('page_performance', {
        load_time: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        dom_content_loaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
        first_paint: performance.getEntriesByType('paint')[0]?.startTime || 0
      });
    });
  }

  trackWebVitals() {
    // Placeholder for Web Vitals tracking
    // In production, use the web-vitals library
    console.log('Web Vitals tracking would be implemented here');
  }

  trackErrors() {
    window.addEventListener('error', (e) => {
      this.trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_line: e.lineno,
        error_column: e.colno
      });
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.trackEvent('promise_rejection', {
        error_message: e.reason?.message || 'Unknown promise rejection'
      });
    });
  }

  trackEvent(eventName, parameters = {}) {
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }

    // Send to custom analytics (if needed)
    console.log(`Analytics Event: ${eventName}`, parameters);
  }

  // Custom tracking methods
  trackProjectView(projectName) {
    this.trackEvent('project_view', {
      project_name: projectName
    });
  }

  trackContactFormSubmission(formData) {
    this.trackEvent('contact_form_submit', {
      contact_method: 'website_form',
      subject: formData.subject || 'unknown'
    });
  }

  trackDownload(fileName) {
    this.trackEvent('file_download', {
      file_name: fileName
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Analytics();
});