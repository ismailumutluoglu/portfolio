// ===== MAIN APPLICATION FILE =====

console.log('🚀 Portfolio Website Loaded Successfully!');

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM Content Loaded - Initializing modules...');
  
  // Add loading animation
  document.body.classList.add('loaded');
  
  // Log successful initialization
  setTimeout(() => {
    console.log('✅ All modules initialized successfully!');
  }, 1000);
});

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});

// Global error handling
window.addEventListener('error', (event) => {
  console.error('❌ JavaScript Error:', event.error);
});