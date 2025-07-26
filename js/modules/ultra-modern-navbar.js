/**
 * ===== ULTRA MODERN NAVBAR CONTROLLER =====
 * Advanced navbar with glassmorphism, dynamic gradients, and spectacular animations
 */

class UltraModernNavbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.brand = document.querySelector('.navbar-brand');
        this.toggler = document.querySelector('.navbar-toggler');
        this.collapse = document.querySelector('.navbar-collapse');
        
        this.isScrolled = false;
        this.lastScrollY = 0;
        this.scrollDirection = 'up';
        this.ticking = false;
        
        this.init();
    }

    init() {
        if (!this.navbar) return;
        
        this.setupScrollEffects();
        this.setupInteractiveHovers();
        this.setupMobileMenu();
        this.setupAccessibility();
        this.setupPerformanceOptimization();
        this.startSpectacularAnimations();
        
        console.log('🚀 Ultra Modern Navbar initialized with spectacular effects');
    }

    setupScrollEffects() {
        const handleScroll = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollState();
                    this.updateNavbarVisibility();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        this.updateScrollState();
    }

    updateScrollState() {
        const currentScrollY = window.pageYOffset;
        const scrollThreshold = 100;
        
        // Update scroll direction
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
        
        // Update scrolled state
        const shouldBeScrolled = currentScrollY > scrollThreshold;
        
        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            this.navbar.classList.toggle('scrolled', this.isScrolled);
            
            // Add spectacular scroll animation
            if (this.isScrolled) {
                this.navbar.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    this.navbar.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    }

    updateNavbarVisibility() {
        const scrollThreshold = 200;
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > scrollThreshold) {
            if (this.scrollDirection === 'down') {
                this.navbar.classList.add('navbar-hidden');
                this.navbar.classList.remove('navbar-visible');
            } else {
                this.navbar.classList.remove('navbar-hidden');
                this.navbar.classList.add('navbar-visible');
            }
        } else {
            this.navbar.classList.remove('navbar-hidden');
            this.navbar.classList.add('navbar-visible');
        }
    }

    setupInteractiveHovers() {
        // Spectacular brand hover effect
        if (this.brand) {
            this.brand.addEventListener('mouseenter', () => {
                this.createBrandGlowEffect();
            });
            
            this.brand.addEventListener('mouseleave', () => {
                this.removeBrandGlowEffect();
            });
        }

        // Interactive nav links with particle effects
        this.navLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', (e) => {
                this.createHoverParticles(e.target);
                this.animateNavLink(e.target, 'enter');
            });
            
            link.addEventListener('mouseleave', (e) => {
                this.animateNavLink(e.target, 'leave');
            });
            
            link.addEventListener('click', (e) => {
                this.createClickRipple(e);
                this.setActiveLink(e.target);
            });
        });
    }

    createBrandGlowEffect() {
        const glowElement = document.createElement('div');
        glowElement.className = 'brand-glow-effect';
        glowElement.style.cssText = `
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
            border-radius: 25px;
            opacity: 0;
            z-index: -1;
            filter: blur(20px);
            animation: brandGlow 2s ease-in-out infinite;
            background-size: 400% 400%;
        `;
        
        this.brand.style.position = 'relative';
        this.brand.appendChild(glowElement);
        
        setTimeout(() => {
            glowElement.style.opacity = '0.8';
        }, 10);
    }

    removeBrandGlowEffect() {
        const glowEffect = this.brand.querySelector('.brand-glow-effect');
        if (glowEffect) {
            glowEffect.style.opacity = '0';
            setTimeout(() => glowEffect.remove(), 300);
        }
    }

    createHoverParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'hover-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat ${1 + Math.random()}s ease-out forwards;
            `;
            
            const rect = element.getBoundingClientRect();
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    }

    animateNavLink(link, action) {
        if (action === 'enter') {
            link.style.transform = 'translateY(-5px) scale(1.05)';
            link.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
        } else {
            link.style.transform = '';
            link.style.boxShadow = '';
        }
    }

    createClickRipple(event) {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('div');
        
        ripple.className = 'nav-ripple';
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${event.clientX - rect.left - size / 2}px;
            top: ${event.clientY - rect.top - size / 2}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: rippleEffect 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setActiveLink(clickedLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
        
        // Spectacular active animation
        clickedLink.style.animation = 'activeBounce 0.5s ease-out';
        setTimeout(() => {
            clickedLink.style.animation = '';
        }, 500);
    }

    setupMobileMenu() {
        if (!this.toggler || !this.collapse) return;
        
        this.toggler.addEventListener('click', () => {
            const isExpanded = this.toggler.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                this.openMobileMenu();
            } else {
                this.closeMobileMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.collapse.classList.contains('show')) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        this.collapse.style.opacity = '0';
        this.collapse.style.transform = 'translateY(-20px) scale(0.95)';
        
        setTimeout(() => {
            this.collapse.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.collapse.style.opacity = '1';
            this.collapse.style.transform = 'translateY(0) scale(1)';
            
            // Animate menu items
            const links = this.collapse.querySelectorAll('.nav-link');
            links.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(-50px) rotateY(90deg)';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0) rotateY(0)';
                }, 100 * (index + 1));
            });
        }, 10);
    }

    closeMobileMenu() {
        const links = this.collapse.querySelectorAll('.nav-link');
        
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(50px) rotateY(-90deg)';
            }, 50 * index);
        });
        
        setTimeout(() => {
            this.collapse.style.opacity = '0';
            this.collapse.style.transform = 'translateY(-20px) scale(0.95)';
        }, 200);
    }

    setupAccessibility() {
        // Enhanced keyboard navigation
        this.navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
            
            link.addEventListener('focus', () => {
                this.animateNavLink(link, 'enter');
            });
            
            link.addEventListener('blur', () => {
                this.animateNavLink(link, 'leave');
            });
        });
        
        // Screen reader announcements
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        this.announcer = announcer;
    }

    announceChange(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
        }
    }

    setupPerformanceOptimization() {
        // Intersection Observer for visibility
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.navbar.classList.add('navbar-visible');
                } else {
                    this.navbar.classList.remove('navbar-visible');
                }
            });
        }, observerOptions);
        
        observer.observe(this.navbar);
        
        // Passive event listeners for better performance
        this.usePassiveListeners();
    }

    usePassiveListeners() {
        const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
        
        passiveEvents.forEach(eventType => {
            document.addEventListener(eventType, () => {}, { passive: true });
        });
    }

    startSpectacularAnimations() {
        // Gradient animation for navbar background
        this.animateGradientBackground();
        
        // Floating particles effect
        this.startFloatingParticles();
        
        // Brand text shimmer effect
        this.startBrandShimmer();
    }

    animateGradientBackground() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes particleFloat {
                0%, 100% { transform: translateY(0) translateX(-50%); }
                50% { transform: translateY(-15px) translateX(-50%); }
            }
            
            @keyframes rippleEffect {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes activeBounce {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes brandGlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
        `;
        document.head.appendChild(style);
    }

    startFloatingParticles() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createFloatingParticle();
            }
        }, 2000);
    }

    createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            opacity: 0.7;
            animation: floatUp 8s linear;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '100vh';
        
        document.body.appendChild(particle);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                from {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.7;
                }
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 8000);
    }

    startBrandShimmer() {
        if (!this.brand) return;
        
        setInterval(() => {
            this.brand.style.animation = 'brandShimmer 2s ease-in-out';
            setTimeout(() => {
                this.brand.style.animation = '';
            }, 2000);
        }, 10000);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes brandShimmer {
                0%, 100% { filter: brightness(1) saturate(1); }
                50% { filter: brightness(1.2) saturate(1.3); }
            }
        `;
        document.head.appendChild(style);
    }

    // Public API methods
    showNavbar() {
        this.navbar.classList.remove('navbar-hidden');
        this.navbar.classList.add('navbar-visible');
    }

    hideNavbar() {
        this.navbar.classList.add('navbar-hidden');
        this.navbar.classList.remove('navbar-visible');
    }

    setActiveSection(sectionId) {
        const targetLink = document.querySelector(`[href="#${sectionId}"]`);
        if (targetLink) {
            this.setActiveLink(targetLink);
            this.announceChange(`Navigated to ${sectionId} section`);
        }
    }

    destroy() {
        // Cleanup event listeners and animations
        window.removeEventListener('scroll', this.handleScroll);
        
        // Remove all created elements
        document.querySelectorAll('.hover-particle, .nav-ripple, .brand-glow-effect').forEach(el => {
            el.remove();
        });
        
        console.log('🔄 Ultra Modern Navbar destroyed');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ultraModernNavbar = new UltraModernNavbar();
    });
} else {
    window.ultraModernNavbar = new UltraModernNavbar();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UltraModernNavbar;
}
