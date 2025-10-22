/**
 * MasterMind Clothing - Main JavaScript
 * Handles navigation, animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-list');
    const navItems = document.querySelectorAll('.nav-item a');
    const header = document.querySelector('.header');
    const navOverlay = document.createElement('div');
    
    // Add overlay for mobile menu
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    // Mobile Menu Toggle
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !isExpanded);
    }
    
    // Close mobile menu when clicking on a nav item
    function closeMenu() {
        if (hamburger.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking on nav links
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle internal links
            if (targetId === '#' || targetId.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Header scroll effects
    let lastScroll = 0;
    const headerHeight = header.offsetHeight;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }
    
    // Initialize header state
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.classList.add('lazy');
        });
    } else {
        // Fallback for browsers that don't support loading="lazy"
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            let active = false;
            
            const lazyLoad = function() {
                if (active === false) {
                    active = true;
                    
                    setTimeout(() => {
                        lazyImages.forEach(img => {
                            if ((img.getBoundingClientRect().top <= window.innerHeight && 
                                 img.getBoundingClientRect().bottom >= 0) && 
                                getComputedStyle(img).display !== 'none') {
                                img.src = img.dataset.src || img.src;
                                img.classList.add('loaded');
                            }
                        });
                        
                        active = false;
                    }, 200);
                }
            };
            
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationchange', lazyLoad);
            
            // Initial load
            lazyLoad();
        }
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .hero__content, .hero__image, .about__content, .newsletter__content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.category-card, .hero__content, .hero__image, .about__content, .newsletter__content');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transitionDelay = `${Math.min(index * 0.1, 0.5)}s`;
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 500);
    
    // Listen for scroll events with debounce
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(animateOnScroll, 50);
    }, { passive: true });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Here you would typically send the email to your server
                console.log('Subscribing email:', email);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = '¡Gracias por suscribirte a nuestro boletín!';
                this.parentNode.insertBefore(successMessage, this.nextSibling);
                
                // Reset form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-error';
                errorMessage.textContent = 'Por favor, introduce un correo electrónico válido.';
                this.parentNode.insertBefore(errorMessage, this.nextSibling);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 300);
                }, 5000);
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add loading class to body while page is loading
    document.body.classList.add('page-loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', function() {
        document.body.classList.remove('page-loading');
    });
});
