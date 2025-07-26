// ===== THEME SWITCHER MODULE =====

class ThemeSwitcher {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    
    this.init();
  }

  init() {
    this.setInitialTheme();
    this.addThemeToggleHandler();
    this.updateThemeIcon();
    this.updateFooterTheme();
  }

  setInitialTheme() {
    // Check for saved theme or system preference
    if (this.currentTheme === 'dark' || 
        (!this.currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.currentTheme = 'dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.currentTheme = 'light';
    }
  }

  addThemeToggleHandler() {
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const icon = this.themeToggle.querySelector('i');
    
    if (this.currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }

  updateFooterTheme() {
    const footer = document.querySelector('.footer');
    if (footer) {
      // Footer theme elements can be updated here if needed
      console.log(`Footer theme updated to: ${this.currentTheme}`);
    }
  }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
});