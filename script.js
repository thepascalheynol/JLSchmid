/**
 * J.L. Schmid & Kollegen - Website JavaScript
 * Handles navigation, smooth scrolling, and form interactions
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYearSpan = document.getElementById('currentYear');
    const contactForm = document.querySelector('.kontakt-form');

    /**
     * Update header style on scroll
     */
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * Toggle mobile navigation
     */
    function toggleMobileNav() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    }

    /**
     * Close mobile navigation
     */
    function closeMobileNav() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Smooth scroll to section
     */
    function smoothScrollToSection(e) {
        const href = e.currentTarget.getAttribute('href');

        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                closeMobileNav();

                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        }
    }

    /**
     * Update current year in footer
     */
    function updateCurrentYear() {
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    /**
     * Simple form validation and handling
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const privacy = formData.get('privacy');

        // Basic validation
        let isValid = true;
        let errorMessages = [];

        if (!name || name.trim().length < 2) {
            isValid = false;
            errorMessages.push('Bitte geben Sie Ihren Namen ein.');
        }

        if (!email || !isValidEmail(email)) {
            isValid = false;
            errorMessages.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        }

        if (!message || message.trim().length < 10) {
            isValid = false;
            errorMessages.push('Bitte geben Sie eine Nachricht ein (mindestens 10 Zeichen).');
        }

        if (!privacy) {
            isValid = false;
            errorMessages.push('Bitte stimmen Sie der Datenschutzerklärung zu.');
        }

        if (!isValid) {
            alert('Bitte korrigieren Sie folgende Fehler:\n\n' + errorMessages.join('\n'));
            return;
        }

        // Show success message (in production, this would submit to a server)
        alert('Vielen Dank für Ihre Nachricht!\n\nWir werden uns schnellstmöglich bei Ihnen melden.');
        form.reset();
    }

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeydown(e) {
        // Close mobile nav on Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileNav();
            navToggle.focus();
        }
    }

    /**
     * Initialize intersection observer for animations
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.feature-card, .rechtsgebiet-card, .achievement').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Initialize all event listeners
     */
    function init() {
        // Scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        // Mobile navigation
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileNav);
        }

        // Navigation links - smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToSection);
        });

        // Also handle footer links and other anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            if (!link.classList.contains('nav-link')) {
                link.addEventListener('click', smoothScrollToSection);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Update year
        updateCurrentYear();

        // Form handling
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Initialize scroll animations
        initScrollAnimations();

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                closeMobileNav();
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
