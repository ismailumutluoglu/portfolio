// ===== PROJECT FILTER MODULE =====

class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.loadMoreBtn = document.getElementById('loadMoreProjects');
    this.visibleProjects = 6;
    this.projectsPerLoad = 3;
    
    this.init();
  }

  init() {
    this.addFilterHandlers();
    this.addLoadMoreHandler();
    this.addProjectHoverEffects();
    this.setupInitialState();
  }

  // Filter functionality
  addFilterHandlers() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.filterProjects(filter);
        this.updateActiveFilter(button);
      });
    });
  }

  filterProjects(filter) {
    this.projectCards.forEach((card, index) => {
      const categories = card.getAttribute('data-category');
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        card.classList.remove('hidden');
        // Re-animate visible cards
        setTimeout(() => {
          card.style.animation = `projectCardSlideIn 0.6s ease-out ${index * 0.1}s forwards`;
        }, 100);
      } else {
        card.classList.add('hidden');
      }
    });

    // Update load more button visibility
    this.updateLoadMoreButton();
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }

  // Load more functionality
  addLoadMoreHandler() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', () => {
        this.loadMoreProjects();
      });
    }
  }

  loadMoreProjects() {
    // In a real application, this would load more projects from an API
    // For now, we'll simulate loading by showing hidden projects or duplicating existing ones
    
    const hiddenProjects = Array.from(this.projectCards).filter(card => 
      card.classList.contains('hidden') && 
      !card.style.display === 'none'
    );

    if (hiddenProjects.length === 0) {
      this.simulateLoadMore();
    } else {
      hiddenProjects.slice(0, this.projectsPerLoad).forEach(card => {
        card.classList.remove('hidden');
      });
    }

    this.updateLoadMoreButton();
  }

  simulateLoadMore() {
    // This would typically be replaced with actual API calls
    console.log('In a real app, this would load more projects from the server');
    
    // Hide load more button if no more projects
    if (this.loadMoreBtn) {
      this.loadMoreBtn.style.display = 'none';
    }
  }

  updateLoadMoreButton() {
    if (!this.loadMoreBtn) return;

    const visibleProjects = Array.from(this.projectCards).filter(card => 
      !card.classList.contains('hidden')
    );

    if (visibleProjects.length >= this.projectCards.length) {
      this.loadMoreBtn.style.display = 'none';
    } else {
      this.loadMoreBtn.style.display = 'inline-flex';
    }
  }

  setupInitialState() {
    // Show initial set of projects
    this.updateLoadMoreButton();
  }

  // Project hover effects
  addProjectHoverEffects() {
    this.projectCards.forEach(card => {
      const image = card.querySelector('.project-image');
      const techTags = card.querySelectorAll('.tech-tag');

      card.addEventListener('mouseenter', () => {
        // Animate tech tags on hover
        techTags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.transform = 'translateY(-2px)';
          }, index * 50);
        });
      });

      card.addEventListener('mouseleave', () => {
        techTags.forEach(tag => {
          tag.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // Add project click handlers for future modal functionality
  addProjectClickHandlers() {
    this.projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent click on action buttons
        if (e.target.closest('.project-actions')) return;
        
        // Future: Open project modal
        console.log('Project clicked:', card.querySelector('.project-title').textContent);
      });
    });
  }

  // Search functionality (for future enhancement)
  addSearchFunctionality() {
    const searchInput = document.getElementById('projectSearch');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        this.searchProjects(searchTerm);
      });
    }
  }

  searchProjects(searchTerm) {
    this.projectCards.forEach(card => {
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const description = card.querySelector('.project-description').textContent.toLowerCase();
      const technologies = Array.from(card.querySelectorAll('.tech-tag'))
        .map(tag => tag.textContent.toLowerCase())
        .join(' ');

      const matches = title.includes(searchTerm) || 
                     description.includes(searchTerm) || 
                     technologies.includes(searchTerm);

      if (matches || searchTerm === '') {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

// Initialize project filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectFilter();
});