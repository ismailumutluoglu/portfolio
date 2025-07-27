// ===== EXPERIENCE TABS MODULE =====

class ExperienceTabs {
  constructor() {
    this.tabButtons = document.querySelectorAll('.tab-button');
    this.timelineContents = document.querySelectorAll('.timeline-content');
    
    this.init();
  }

  init() {
    this.addTabClickHandlers();
    this.addTimelineAnimations();
  }

  // Tab switching functionality
  addTabClickHandlers() {
    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        this.switchTab(targetTab, button);
      });
    });
  }

  switchTab(targetTab, clickedButton) {
    // Remove active class from all buttons and contents
    this.tabButtons.forEach(btn => btn.classList.remove('active'));
    this.timelineContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button
    clickedButton.classList.add('active');

    // Show target timeline content
    const targetContent = document.getElementById(`${targetTab}-timeline`);
    if (targetContent) {
      targetContent.classList.add('active');
      
      // Re-trigger animations for timeline items
      this.animateTimelineItems(targetContent);
    }
  }

  // Animate timeline items on tab switch
  animateTimelineItems(container) {
    const timelineItems = container.querySelectorAll('.timeline-item');
    
    // Reset animations
    timelineItems.forEach(item => {
      item.style.animation = 'none';
      item.offsetHeight; // Trigger reflow
    });

    // Re-apply animations with delay
    setTimeout(() => {
      timelineItems.forEach((item, index) => {
        item.style.animation = `timelineItemSlideIn 0.6s ease-out ${index * 0.2}s forwards`;
      });
    }, 100);
  }

  // Intersection Observer for timeline animations
  addTimelineAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate timeline items when they come into view
          const timelineItems = entry.target.querySelectorAll('.timeline-item');
          
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in');
            }, index * 200);
          });
        }
      });
    }, observerOptions);

    // Observe experience section
    const experienceSection = document.querySelector('.experience-section');
    if (experienceSection) {
      observer.observe(experienceSection);
    }
  }

  // Add hover effects to timeline cards
  addHoverEffects() {
    const timelineCards = document.querySelectorAll('.timeline-content-card');
    
    timelineCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('active');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('active');
      });
    });
  }

  // Keyboard navigation support
  addKeyboardNavigation() {
    this.tabButtons.forEach((button, index) => {
      button.addEventListener('keydown', (e) => {
        let newIndex;
        
        switch(e.key) {
          case 'ArrowLeft':
            newIndex = index > 0 ? index - 1 : this.tabButtons.length - 1;
            break;
          case 'ArrowRight':
            newIndex = index < this.tabButtons.length - 1 ? index + 1 : 0;
            break;
          default:
            return;
        }
        
        e.preventDefault();
        this.tabButtons[newIndex].focus();
        this.tabButtons[newIndex].click();
      });
    });
  }
}

// Initialize experience tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ExperienceTabs();
});