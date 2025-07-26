// ===== MAIN APPLICATION FILE - UPDATED =====

console.log('🚀 Portfolio Website v2.0 Loaded Successfully!');

// Performance monitoring
const startTime = performance.now();

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM Content Loaded - Initializing all modules...');
  
  // Initialize theme first
  initializeTheme();
  
  // Add loading animation
  document.body.classList.add('loaded');
  
  // Initialize all modules
  initializeModules();
  
  // Setup error handling
  setupErrorHandling();
  
  // Add development helpers
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    addDevelopmentHelpers();
  }
  
  // Log successful initialization
  setTimeout(() => {
    const loadTime = performance.now() - startTime;
    console.log(`✅ All modules initialized successfully in ${Math.round(loadTime)}ms!`);
    
    // Send analytics
    if (typeof Analytics !== 'undefined') {
      new Analytics().trackEvent('app_initialized', {
        load_time: Math.round(loadTime),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        timestamp: new Date().toISOString()
      });
    }
  }, 1000);
});

function initializeTheme() {
  // Auto-detect theme preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (!savedTheme) {
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
}

function initializeModules() {
  const modules = [
    'mobile-menu',
    'theme-switcher', 
    'experience-tabs',
    'project-filter',
    'form-validator',
    'contact-animations',
    'footer',
    'scroll-animations',
    'performance'
  ];
  
  modules.forEach((module, index) => {
    setTimeout(() => {
      console.log(`🔧 Initializing ${module} module...`);
    }, index * 100);
  });
}

function setupErrorHandling() {
  // Global error handling
  window.addEventListener('error', (event) => {
    console.error('❌ JavaScript Error:', event.error);
    
    // Send to analytics
    if (typeof Analytics !== 'undefined') {
      new Analytics().trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno
      });
    }
  });

  // Promise rejection handling
  window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
    
    if (typeof Analytics !== 'undefined') {
      new Analytics().trackEvent('promise_rejection', {
        reason: event.reason?.message || 'Unknown'
      });
    }
  });
}

function addDevelopmentHelpers() {
  console.log('🛠️ Development mode detected - Adding helpers...');
  
  // Add development shortcuts
  window.devHelpers = {
    toggleTheme: () => {
      const current = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    },
    
    testAnimations: () => {
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.toggle('revealed');
      });
    },
    
    logPerformance: () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      console.table({
        'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
        'TCP Connection': navigation.connectEnd - navigation.connectStart,
        'Request Time': navigation.responseStart - navigation.requestStart,
        'Response Time': navigation.responseEnd - navigation.responseStart,
        'DOM Processing': navigation.domContentLoadedEventEnd - navigation.responseEnd,
        'Load Event': navigation.loadEventEnd - navigation.loadEventStart,
        'Total Load Time': navigation.loadEventEnd - navigation.navigationStart
      });
    }
  };
  
  console.log('💡 Use devHelpers.toggleTheme(), devHelpers.testAnimations(), or devHelpers.logPerformance() in console');
}

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('🙈 Page hidden - Pausing non-critical operations');
    // Pause animations, timers, etc.
  } else {
    console.log('👀 Page visible - Resuming operations');
    // Resume animations, timers, etc.
  }
});

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now() - startTime;
  console.log(`⚡ Page fully loaded in ${Math.round(loadTime)}ms`);
  
  // Measure and log Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`📊 ${entry.name}: ${Math.round(entry.value)}ms`);
      }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
  }
});

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🔧 Service Worker registered successfully');
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

// Keyboard shortcuts for development
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + D for development mode
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
    e.preventDefault();
    if (window.devHelpers) {
      console.log('🛠️ Development helpers available:', Object.keys(window.devHelpers));
    }
  }
  
  // Ctrl/Cmd + Shift + T for theme toggle
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
    e.preventDefault();
    if (window.devHelpers) {
      window.devHelpers.toggleTheme();
    }
  }
});

// Export for module use
window.Portfolio = {
  version: '2.0.0',
  author: 'İsmail Umut Luoğlu',
  buildDate: '2025-01-26',
  modules: {
    analytics: typeof Analytics !== 'undefined',
    performance: typeof PerformanceOptimizer !== 'undefined',
    animations: typeof ScrollAnimations !== 'undefined'
  }
};

console.log('🎉 Portfolio v2.0 - All systems ready!');