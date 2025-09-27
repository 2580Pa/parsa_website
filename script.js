// Global variables
let currentLanguage = 'fa';
let currentSection = 0;
let isScrolling = false;
let isUserScrolling = false;
let autoScrollTriggered = false;
let autoScrollEnabled = false; // Disable auto-scroll by default
let sections = [];

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_mvmdv2j';
const EMAILJS_TEMPLATE_ID = 'template_pybdf5w';
const EMAILJS_PUBLIC_KEY = 'wa7tcKjwCB9_S7RU7';

// Professional Translation System
const translations = {
    fa: {
        // Navigation
        'nav-home': 'خانه',
        'nav-about': 'درباره من',
        'nav-skills': 'مهارت‌ها',
        'nav-education': 'تحصیلات',
        'nav-portfolio': 'نمونه کارها',
        'nav-contact': 'تماس',
        
        // Hero Section
        'hero-welcome': 'خوش آمدید به',
        'hero-website': 'وب‌سایت من!',
        'hero-frontend': 'برنامه‌نویس',
        'hero-developer': 'فرانت‌اند',
        'hero-see-works': 'نمونه کارهای من',
        'hero-contact': 'تماس با من',
        
        // About Section
        'about-title': 'درباره من',
        'about-description': 'با بیش از ۳ سال تجربه در توسعه فرانت‌اند و بک‌اند، مهارت‌های پیشرفته‌ای در HTML، CSS، JavaScript، React.js و Node.js دارم. در فریمورک‌های مدرن تخصص دارم و تجربه گسترده‌ای با Next.js، Vue.js و TypeScript دارم. همچنین در فریمورک‌های استایل‌دهی مانند Tailwind CSS و Sass مهارت دارم. توانایی کار تیمی قوی و تجربه گسترده در استانداردهای بهینه‌سازی وب و بهترین شیوه‌ها دارم.',
        'trait-learner': 'علاقه‌مند به یادگیری',
        'trait-passionate': 'پرشور',
        'trait-problem-solver': 'حل‌کننده مسئله',
        'trait-creative': 'خلاق',
        'trait-teamwork': 'کار تیمی',
        'trait-flexible': 'انطباق‌پذیر',
        'profile-name': 'پارسا نیکونهاد',
        'profile-title': 'برنامه‌نویس فرانت‌اند',
        'profile-location': 'یزد، ایران',
        'profile-email': 'parsa.nikoonahad2000@gmail.com',
        'profile-phone': '+98 919 409 7202',
        
        // Skills Section
        'skills-title': 'مهارت‌های من',
        'skills-frontend': 'فرانت‌اند',
        'skills-tools': 'ابزارها و تکنولوژی‌ها',
        
        // Education Section
        'education-title': 'تحصیلات و گواهینامه‌ها',
        'education-degree': 'کارشناسی مهندسی کامپیوتر',
        'education-university': 'دانشگاه تهران',
        'education-date': '۱۳۹۸ - ۱۴۰۲',
        'education-description': 'تحصیل در رشته مهندسی کامپیوتر با گرایش نرم‌افزار. تمرکز بر توسعه وب و الگوریتم‌های کامپیوتری.',
        'cert-react': 'گواهینامه React.js',
        'cert-meta': 'Meta (فیس‌بوک)',
        'cert-date-1': '۱۴۰۱',
        'cert-description-1': 'تکمیل دوره تخصصی React.js از Meta شامل Hooks، Context API و بهترین شیوه‌های توسعه.',
        'cert-js': 'گواهینامه JavaScript',
        'cert-fcc': 'freeCodeCamp',
        'cert-date-2': '۱۴۰۰',
        'cert-description-2': 'تکمیل دوره کامل JavaScript شامل ES6+، DOM Manipulation و API Integration.',
        
        // Portfolio Section
        'portfolio-title': 'نمونه کارهای من',
        'project-shop': 'پلتفرم تجارت الکترونیک',
        'project-shop-desc': 'پلتفرم خرید آنلاین ساخته شده با Next.js برای فرانت‌اند، Redux برای مدیریت state و Firebase برای بک‌اند. طراحی واکنش‌گرا با Tailwind CSS.',
        'project-todo': 'اپلیکیشن ToDo',
        'project-todo-desc': 'اپلیکیشن مدیریت کارها با React.js و TypeScript. شامل API های مختلف و استفاده از React Router DOM برای مسیریابی. طراحی واکنش‌گرا با Tailwind CSS.',
        'project-view': 'مشاهده پروژه',
        
        // Tech Tags
        'tech-nextjs': 'Next.js',
        'tech-redux': 'Redux',
        'tech-firebase': 'Firebase',
        'tech-tailwind': 'Tailwind CSS',
        'tech-react': 'React.js',
        'tech-typescript': 'TypeScript',
        'tech-router': 'React Router',
        
        // Contact Section
        'contact-title': 'تماس با من',
        'contact-email': 'ایمیل',
        'contact-phone': 'تلفن',
        'contact-telegram': 'تلگرام',
        'contact-instagram': 'اینستاگرام',
        'contact-name': 'نام شما',
        'contact-email-placeholder': 'ایمیل شما',
        'contact-message': 'پیام شما',
        'contact-send': 'ارسال پیام',
        
        // Footer
        'footer-rights': '۱۴۰۳ پارسا نیکونهاد. تمامی حقوق محفوظ است.'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-education': 'Education',
        'nav-portfolio': 'Portfolio',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-welcome': 'Welcome To',
        'hero-website': 'My Website!',
        'hero-frontend': 'Full Stack',
        'hero-developer': 'Developer',
        'hero-see-works': 'View My Work',
        'hero-contact': 'Get In Touch',
        
        // About Section
        'about-title': 'About Me',
        'about-description': 'With over 3 years of experience in full-stack development, I have advanced skills in HTML, CSS, JavaScript, React.js, and Node.js. I specialize in modern frameworks and have extensive experience with Next.js, Vue.js, and TypeScript. I\'m also proficient in styling frameworks like Tailwind CSS and Sass. I have strong teamwork abilities and extensive experience with web optimization standards and best practices.',
        'trait-learner': 'Eager Learner',
        'trait-passionate': 'Passionate',
        'trait-problem-solver': 'Problem Solver',
        'trait-creative': 'Creative',
        'trait-teamwork': 'Team Player',
        'trait-flexible': 'Adaptable',
        'profile-name': 'Parsa Nikoonahad',
        'profile-title': 'Full Stack Developer',
        'profile-location': 'Yazd, Iran',
        'profile-email': 'parsa.nikoonahad2000@gmail.com',
        'profile-phone': '+98 919 409 7202',
        
        // Skills Section
        'skills-title': 'My Skills',
        'skills-frontend': 'Frontend',
        'skills-tools': 'Tools & Technologies',
        
        // Education Section
        'education-title': 'Education & Certifications',
        'education-degree': 'Bachelor\'s Degree in Computer Engineering',
        'education-university': 'University of Tehran',
        'education-date': '2019 - 2023',
        'education-description': 'Studied Computer Engineering with a focus on Software Engineering. Concentrated on web development and computer algorithms.',
        'cert-react': 'React.js Certification',
        'cert-meta': 'Meta (Facebook)',
        'cert-date-1': '2022',
        'cert-description-1': 'Completed specialized React.js course from Meta including Hooks, Context API, and best development practices.',
        'cert-js': 'JavaScript Certification',
        'cert-fcc': 'freeCodeCamp',
        'cert-date-2': '2021',
        'cert-description-2': 'Completed comprehensive JavaScript course including ES6+, DOM Manipulation, and API Integration.',
        
        // Portfolio Section
        'portfolio-title': 'My Portfolio',
        'project-shop': 'E-Commerce Platform',
        'project-shop-desc': 'Online shopping platform built with Next.js for frontend, Redux for state management, and Firebase for backend. Responsive design with Tailwind CSS.',
        'project-todo': 'Todo Application',
        'project-todo-desc': 'Task management application built with React.js and TypeScript. Features various APIs and React Router DOM for navigation. Responsive design with Tailwind CSS.',
        'project-view': 'View Project',
        
        // Tech Tags
        'tech-nextjs': 'Next.js',
        'tech-redux': 'Redux',
        'tech-firebase': 'Firebase',
        'tech-tailwind': 'Tailwind CSS',
        'tech-react': 'React.js',
        'tech-typescript': 'TypeScript',
        'tech-router': 'React Router',
        
        // Contact Section
        'contact-title': 'Get In Touch',
        'contact-email': 'Email',
        'contact-phone': 'Phone',
        'contact-telegram': 'Telegram',
        'contact-instagram': 'Instagram',
        'contact-name': 'Your Name',
        'contact-email-placeholder': 'Your Email',
        'contact-message': 'Your Message',
        'contact-send': 'Send Message',
        
        // Footer
        'footer-rights': '© 2024 Parsa Nikoonahad. All rights reserved.'
    }
};

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const contactForm = document.getElementById('contact-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Set loading screen to always be LTR
    setLoadingScreenDirection();
    
    // Show loading screen immediately
    showLoadingScreen();
    
    // Initialize everything after loading screen
    setTimeout(() => {
        // Detect user's location and set language
        detectUserLocation();
        
        // Initialize sections
        initSections();
        
        // Initialize navigation after everything else
        initNavigation();
        
        // Initialize contact form
        initContactForm();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize auto scroll
        initAutoScroll();
        
        // Initialize scroll progress
        initScrollProgress();
        
        // Hide loading screen and start animations
        hideLoadingScreen();
        
        // Start animations after site fade-in begins
        setTimeout(() => {
            startEntryAnimations();
            initAnimations();
        }, 800); // Wait for site fade-in to start
    }, 3000);
});

// Detect user location and set language
async function detectUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // If user is from Iran, use Persian, otherwise use English
        if (data.country_code === 'IR') {
            currentLanguage = 'fa';
            document.documentElement.lang = 'fa';
            document.documentElement.dir = 'rtl';
        } else {
            currentLanguage = 'en';
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
        
        // Update language button
        langBtn.textContent = currentLanguage === 'fa' ? 'EN' : 'FA';
        
        // Apply translations
        applyTranslations();
        
    } catch (error) {
        console.log('Could not detect location, using default language (Persian)');
        currentLanguage = 'fa';
        document.documentElement.lang = 'fa';
        document.documentElement.dir = 'rtl';
        langBtn.textContent = 'EN';
        applyTranslations();
    }
}

// Professional Translation System
function applyTranslations() {
    console.log('Applying translations for language:', currentLanguage);
    
    // Prevent layout jumping by temporarily disabling transitions
    document.body.style.transition = 'none';
    document.documentElement.style.transition = 'none';
    
    // Update HTML attributes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
    
    // Update language button
    langBtn.textContent = currentLanguage === 'fa' ? 'EN' : 'FA';
    
    // Re-enable transitions after a short delay
    setTimeout(() => {
        document.body.style.transition = '';
        document.documentElement.style.transition = '';
    }, 100);
    
    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Translate placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Update layout direction
    updateLayoutDirection();
    
    // Typing animation disabled to prevent conflicts with translation system
    
    console.log('Translations applied successfully');
}

// Update layout direction
function updateLayoutDirection() {
    const body = document.body;
        if (currentLanguage === 'fa') {
        body.classList.add('rtl');
        body.classList.remove('ltr');
        } else {
        body.classList.add('ltr');
        body.classList.remove('rtl');
    }
}

// Simple language toggle function
function toggleLanguage() {
    console.log('toggleLanguage called, current language:', currentLanguage);
    currentLanguage = currentLanguage === 'fa' ? 'en' : 'fa';
    console.log('Language switched to:', currentLanguage);
    applyTranslations();
}

// Toggle language - removed duplicate event listener

// Update layout direction
function updateLayoutDirection() {
    const body = document.body;
    if (currentLanguage === 'fa') {
        body.classList.add('rtl');
        body.classList.remove('ltr');
    } else {
        body.classList.add('ltr');
        body.classList.remove('rtl');
    }
}

// Initialize navigation
function initNavigation() {
    console.log('Initializing navigation...');
    console.log('navToggle:', navToggle);
    console.log('navMenu:', navMenu);
    console.log('langBtn:', langBtn);
    
    // Check if elements exist
    if (!navToggle || !navMenu || !langBtn) {
        console.error('Navigation elements not found!');
        return;
    }
    
    // Mobile menu toggle - only for hamburger button
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked');
        
        // Toggle menu
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        } else {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked');
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Language button - completely separate from menu
    langBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Language button clicked - event listener working!');
        
        // Close menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Toggle language
        toggleLanguage();
    });
    
    console.log('Language button event listener attached successfully');
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Only close if clicking outside both menu and toggle
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-content, .skills-grid, .timeline-item, .portfolio-item, .contact-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Also observe individual portfolio items and timeline items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    [...portfolioItems, ...timelineItems].forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize email functionality
function initEmailFunctionality() {
    const emailItems = document.querySelectorAll('.email-item');
    
    emailItems.forEach(item => {
        const emailBtn = item.querySelector('.email-btn');
        const emailAddress = item.getAttribute('data-email');
        
        if (emailBtn && emailAddress) {
            emailBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openEmailClient(emailAddress);
            });
        }
        
        // Make the entire email item clickable
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.contact-actions')) {
                openEmailClient(emailAddress);
            }
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
    });
}

// Open email client
function openEmailClient(emailAddress) {
    const subject = encodeURIComponent('Contact from Website');
    const body = encodeURIComponent('Hello Parsa,\n\nI would like to get in touch with you regarding...\n\nBest regards,');
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Opening email client...', 'success');
}

// Initialize contact form
function initContactForm() {
    // Initialize email functionality
    initEmailFunctionality();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification(
                currentLanguage === 'fa' 
                    ? 'لطفاً تمام فیلدها را پر کنید' 
                    : 'Please fill in all fields',
                'error'
            );
            return;
        }
        
        // Simulate form submission
        showNotification(
            currentLanguage === 'fa' 
                ? 'پیام شما با موفقیت ارسال شد!' 
                : 'Your message has been sent successfully!',
            'success'
        );
        
        // Reset form
        contactForm.reset();
    });
}

// Show notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize typing animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Add typing effect to hero title
    const titleLines = heroTitle.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        
        // Only apply typing effect if text is not empty and not already processed
        if (text && text.trim() !== '' && !line.classList.contains('typing-processed')) {
            line.classList.add('typing-processed');
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 1000);
        }
    });
}

// Type text effect
function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Combined scroll effects for better performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    // Throttle scroll events for better performance
    if (scrollTimeout) {
        return;
    }
    
    scrollTimeout = setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        // Navbar effect
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(15, 15, 35, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
        
        // Parallax effect - only on desktop for performance
        if (window.innerWidth > 768) {
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
        
        scrollTimeout = null;
    }, 16); // ~60fps
});

// Initialize sections
function initSections() {
    sections = [
        document.getElementById('home'),
        document.getElementById('about'),
        document.getElementById('skills'),
        document.getElementById('education'),
        document.getElementById('portfolio'),
        document.getElementById('contact')
    ];
}

// Initialize auto scroll functionality - Simplified for mobile performance
function initAutoScroll() {
    // Auto scroll indicator click handler
    const autoScrollIndicator = document.querySelector('.current-section-indicator');
    if (autoScrollIndicator) {
        autoScrollIndicator.addEventListener('click', function() {
            scrollToNextSection();
        });
    }
    
    // Hero scroll indicator click handler
    const heroScrollIndicator = document.querySelector('.hero .scroll-indicator');
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener('click', function() {
            scrollToNextSection();
        });
    }
    
    // Keyboard navigation - only next/prev (desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                scrollToNextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollToPrevSection();
            }
        });
    }
    
    // Simplified scroll behavior - no auto-scroll on mobile
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        
        // Only check section end on desktop
        if (window.innerWidth > 768) {
            scrollTimeout = setTimeout(() => {
                if (!isScrolling) {
                    checkSectionEnd();
                }
                isUserScrolling = false;
            }, 1000);
        } else {
            // On mobile, just reset the flag quickly
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 100);
        }
    });
}

// Check if user reached end of current section
function checkSectionEnd() {
    // Disable auto-scroll completely
    if (!autoScrollEnabled) return;
    
    if (isScrolling || isUserScrolling || autoScrollTriggered) return;
    
    const currentSectionElement = sections[currentSection];
    if (!currentSectionElement) return;
    
    const sectionTop = currentSectionElement.offsetTop;
    const sectionBottom = sectionTop + currentSectionElement.offsetHeight;
    const scrollTop = window.pageYOffset + window.innerHeight;
    
    // Only auto-scroll if user is very close to the end (within 20px) AND has been there for a while
    if (scrollTop >= sectionBottom - 20) {
        if (currentSection < sections.length - 1) {
            // Check if user has been at the bottom for at least 3 seconds
            if (!window.scrollEndTimer) {
                window.scrollEndTimer = setTimeout(() => {
                    if (!isScrolling && !isUserScrolling && !autoScrollTriggered) {
                        autoScrollTriggered = true;
                        smoothTransitionToNext();
                        setTimeout(() => {
                            autoScrollTriggered = false;
                        }, 2000);
                    }
                    window.scrollEndTimer = null;
                }, 3000); // Wait 3 seconds at the bottom
            }
        }
    } else {
        // Reset timer if user scrolls away from bottom
        if (window.scrollEndTimer) {
            clearTimeout(window.scrollEndTimer);
            window.scrollEndTimer = null;
        }
    }
}

// Ultra smooth transition to next section
function smoothTransitionToNext() {
    if (currentSection < sections.length - 1) {
        const nextSection = currentSection + 1;
        const targetSection = sections[nextSection];

        // Update current section
        currentSection = nextSection;
        updateActiveStates();

        // Perfect linear scroll - completely uniform speed
        const offsetTop = targetSection.offsetTop - 70;
        perfectLinearScroll(offsetTop, 1200);
    }
}

// Perfect linear scroll function - completely uniform speed
function perfectLinearScroll(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    const startTime = performance.now();
    
    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Perfect linear progression - no easing curves
        const currentPosition = start + distance * progress;
        window.scrollTo(0, currentPosition);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Scroll to specific section - Ultra smooth
function scrollToSection(sectionIndex) {
    if (isScrolling || sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    isScrolling = true;
    autoScrollTriggered = false;
    const previousSection = currentSection;
    currentSection = sectionIndex;
    
    const targetSection = sections[sectionIndex];
    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
    
    // Update active states immediately
    updateActiveStates();
    
    // Perfect linear scroll
    perfectLinearScroll(offsetTop, 1000);
    
    // Reset scrolling flag
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}


// Scroll to next section with smooth transition
function scrollToNextSection() {
    if (currentSection < sections.length - 1) {
        // Add smooth transition effect
        addSectionTransitionEffect(currentSection + 1);
        scrollToSection(currentSection + 1);
    }
}

// Scroll to previous section with smooth transition
function scrollToPrevSection() {
    if (currentSection > 0) {
        // Add smooth transition effect
        addSectionTransitionEffect(currentSection - 1);
        scrollToSection(currentSection - 1);
    }
}

// Add smooth transition effect between sections
function addSectionTransitionEffect(targetSectionIndex) {
    const targetSection = sections[targetSectionIndex];
    if (targetSection) {
        // Add fade in effect
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        targetSection.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Ultra smooth scroll with professional easing
function smoothScrollTo(target, duration, easing) {
    const start = window.pageYOffset;
    const distance = target - start;
    const startTime = performance.now();
    
    // Professional easing functions
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }
    
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function easeInOutExpo(t) {
        return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
    }
    
    function easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
    
    // Ultra smooth easing functions for professional transitions
    function easeOutCirc(t) {
        return Math.sqrt(1 - Math.pow(t - 1, 2));
    }
    
    function easeInOutCirc(t) {
        return t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    }
    
    function easeOutElastic(t) {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
    
    function easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }
    
    // Perfect linear easing for uniform speed
    function linear(t) {
        return t;
    }
    
    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        let ease;
        switch(easing) {
            case 'easeInOutCubic':
                ease = easeInOutCubic(progress);
                break;
            case 'easeOutQuart':
                ease = easeOutQuart(progress);
                break;
            case 'easeInOutQuart':
                ease = easeInOutQuart(progress);
                break;
            case 'easeOutExpo':
                ease = easeOutExpo(progress);
                break;
            case 'easeInOutExpo':
                ease = easeInOutExpo(progress);
                break;
            case 'easeOutBack':
                ease = easeOutBack(progress);
                break;
            case 'easeOutCirc':
                ease = easeOutCirc(progress);
                break;
            case 'easeInOutCirc':
                ease = easeInOutCirc(progress);
                break;
            case 'easeOutElastic':
                ease = easeOutElastic(progress);
                break;
            case 'easeInOutSine':
                ease = easeInOutSine(progress);
                break;
            case 'linear':
                ease = linear(progress);
                break;
            default:
                ease = linear(progress);
        }
        
        const currentPosition = start + distance * ease;
        window.scrollTo(0, currentPosition);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Update active states with smooth animations
function updateActiveStates() {
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.classList.toggle('active', index === currentSection);
    });
}

// Initialize scroll progress - optimized for mobile
function initScrollProgress() {
    // Skip scroll progress on mobile for better performance
    if (window.innerWidth <= 768) {
        return;
    }
    
    const progressBar = document.getElementById('progress-bar');
    let progressTimeout;
    
    window.addEventListener('scroll', function() {
        // Throttle progress bar updates
        if (progressTimeout) {
            return;
        }
        
        progressTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
            
            // Update current section based on scroll position
            updateCurrentSection();
            
            progressTimeout = null;
        }, 16); // ~60fps
    });
}

// Update current section based on scroll position
function updateCurrentSection() {
    const scrollTop = window.pageYOffset + 100; // Offset for navbar
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            if (currentSection !== index) {
                currentSection = index;
                updateActiveStates();
            }
        }
    });
}

// Enhanced smooth scrolling for regular links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionIndex = sections.indexOf(targetSection);
                if (sectionIndex !== -1) {
                    scrollToSection(sectionIndex);
                }
            }
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Vazirmatn', sans-serif;
        font-weight: 500;
    }
    
    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Disable scroll during auto scroll */
    body.scrolling-disabled {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize phone actions (copy and call)
function initPhoneActions() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        // Copy phone number functionality
        const copyBtn = document.querySelector('.copy-btn');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const phoneItem = this.closest('.phone-item');
                const phoneNumber = phoneItem.getAttribute('data-phone');
                
                copyToClipboard(phoneNumber);
            });
        }
        
        // Telegram functionality
        const telegramBtn = document.querySelector('.telegram-btn');
        const telegramUsername = document.querySelector('.telegram-username');
        const telegramItem = document.querySelector('.telegram-item');
        
        if (telegramBtn) {
            telegramBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const telegramItem = this.closest('.telegram-item');
                const telegram = telegramItem.getAttribute('data-telegram');
                
                openTelegram(telegram);
            });
        }
        
        if (telegramUsername) {
            telegramUsername.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const telegramItem = this.closest('.telegram-item');
                const telegram = telegramItem.getAttribute('data-telegram');
                
                openTelegram(telegram);
            });
        }
        
        if (telegramItem) {
            telegramItem.addEventListener('click', function(e) {
                // Only if not clicking on buttons or username
                if (!e.target.closest('.contact-actions') && !e.target.classList.contains('telegram-username')) {
                    const telegram = this.getAttribute('data-telegram');
                    openTelegram(telegram);
                }
            });
        }
        
        // Instagram functionality
        const instagramBtn = document.querySelector('.instagram-btn');
        const instagramUsername = document.querySelector('.instagram-username');
        const instagramItem = document.querySelector('.instagram-item');
        
        if (instagramBtn) {
            instagramBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const instagramItem = this.closest('.instagram-item');
                const instagram = instagramItem.getAttribute('data-instagram');
                
                openInstagram(instagram);
            });
        }
        
        if (instagramUsername) {
            instagramUsername.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const instagramItem = this.closest('.instagram-item');
                const instagram = instagramItem.getAttribute('data-instagram');
                
                openInstagram(instagram);
            });
        }
        
        if (instagramItem) {
            instagramItem.addEventListener('click', function(e) {
                // Only if not clicking on buttons or username
                if (!e.target.closest('.contact-actions') && !e.target.classList.contains('instagram-username')) {
                    const instagram = this.getAttribute('data-instagram');
                    openInstagram(instagram);
                }
            });
        }
        
        // Direct call functionality
        const callBtn = document.querySelector('.call-btn');
        if (callBtn) {
            callBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const phoneItem = this.closest('.phone-item');
                const phoneNumber = phoneItem.getAttribute('data-phone');
                
                // Open phone app
                window.location.href = `tel:${phoneNumber}`;
            });
        }
        
        // Click on phone number to copy
        const phoneNumber = document.querySelector('.phone-number');
        if (phoneNumber) {
            phoneNumber.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const phoneItem = this.closest('.phone-item');
                const phone = phoneItem.getAttribute('data-phone');
                
                copyToClipboard(phone);
            });
            
            // Add cursor pointer
            phoneNumber.style.cursor = 'pointer';
        }
    }, 100);
}

// Simple copy to clipboard function
function copyToClipboard(text) {
    // Simple method that works in most browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// Open Telegram function
function openTelegram(username) {
    // Remove @ if present
    const cleanUsername = username.replace('@', '');
    
    // Try different methods to open Telegram
    const telegramUrl = `https://t.me/${cleanUsername}`;
    
    // Method 1: Try to open in Telegram app first
    const telegramAppUrl = `tg://resolve?domain=${cleanUsername}`;
    
    // Create a temporary link to try app first
    const tempLink = document.createElement('a');
    tempLink.href = telegramAppUrl;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    
    // Try to open in app, fallback to web
    tempLink.click();
    
    // Fallback to web version after a short delay
    setTimeout(() => {
        window.open(telegramUrl, '_blank');
    }, 1000);
    
    // Clean up
    document.body.removeChild(tempLink);
    
    console.log('Opening Telegram:', username);
}

// Open Instagram function
function openInstagram(username) {
    // Remove @ if present
    const cleanUsername = username.replace('@', '');
    
    // Try different methods to open Instagram
    const instagramUrl = `https://instagram.com/${cleanUsername}`;
    
    // Method 1: Try to open in Instagram app first
    const instagramAppUrl = `instagram://user?username=${cleanUsername}`;
    
    // Create a temporary link to try app first
    const tempLink = document.createElement('a');
    tempLink.href = instagramAppUrl;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    
    // Try to open in app, fallback to web
    tempLink.click();
    
    // Fallback to web version after a short delay
    setTimeout(() => {
        window.open(instagramUrl, '_blank');
    }, 1000);
    
    // Clean up
    document.body.removeChild(tempLink);
    
    console.log('Opening Instagram:', username);
}


// Show copy success notification
function showCopySuccess() {
    // Remove existing notification
    const existingNotification = document.querySelector('.copy-success');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copy-success';
    notification.innerHTML = '<i class="fas fa-check"></i>شماره کپی شد!';
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Show copy error notification
function showCopyError() {
    // Remove existing notification
    const existingNotification = document.querySelector('.copy-success');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create error notification with manual copy option
    const notification = document.createElement('div');
    notification.className = 'copy-success';
    notification.style.background = 'rgba(239, 68, 68, 0.9)';
    notification.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>کپی نشد! شماره را انتخاب کنید:</span>
        <input type="text" value="+989194097202" readonly style="
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            margin: 5px 0;
            font-size: 0.9rem;
            width: 150px;
        " onclick="this.select()">
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 6 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 6000);
}

// Initialize form handling with EmailJS
function initFormHandling() {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        console.log('Initializing form handling...');
        
        // Get form element
        const contactForm = document.getElementById('contact-form');
        console.log('Contact form found:', contactForm);
        
        if (contactForm) {
            // Fix textarea spacing issue
            const textarea = contactForm.querySelector('textarea[name="message"]');
            if (textarea) {
                // Remove any CSS that might interfere
                textarea.style.whiteSpace = 'pre-wrap';
                textarea.style.wordSpacing = 'normal';
                textarea.style.letterSpacing = 'normal';
                textarea.style.fontFamily = 'Vazirmatn, sans-serif';
                textarea.style.direction = 'rtl';
                textarea.style.textAlign = 'right';
                
                // Force spaces to work
                textarea.addEventListener('keydown', function(e) {
                    if (e.key === ' ') {
                        e.preventDefault();
                        const start = this.selectionStart;
                        const end = this.selectionEnd;
                        const value = this.value;
                        this.value = value.substring(0, start) + ' ' + value.substring(end);
                        this.selectionStart = this.selectionEnd = start + 1;
                        formValues.message = this.value;
                        console.log('Space added:', this.value);
                    }
                });
                
                textarea.addEventListener('input', function(e) {
                    console.log('Textarea input:', this.value);
                    formValues.message = this.value;
                });
            }
            
            // Test input values on focus
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            if (nameInput) {
                nameInput.addEventListener('input', function(e) {
                    console.log('Name input:', this.value);
                });
            }
            
            if (emailInput) {
                emailInput.addEventListener('input', function(e) {
                    console.log('Email input:', this.value);
                });
            }
            
            // Store values globally to prevent interference
            let formValues = { name: '', email: '', message: '' };
            
            // Update values on input
            if (nameInput) {
                nameInput.addEventListener('input', function(e) {
                    formValues.name = this.value;
                    console.log('Name updated:', formValues.name);
                });
            }
            
            if (emailInput) {
                emailInput.addEventListener('input', function(e) {
                    formValues.email = this.value;
                    console.log('Email updated:', formValues.email);
                });
            }
            
            if (textarea) {
                textarea.addEventListener('input', function(e) {
                    formValues.message = this.value;
                    console.log('Message updated:', formValues.message);
                });
            }
            
            // Add event listener directly to form
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted!');
                console.log('Stored values:', formValues);
                
                // Use stored values instead of reading from DOM
                const name = formValues.name || '';
                const email = formValues.email || '';
                const message = formValues.message || '';
                
                console.log('Final values:', { name, email, message });
                
                // Validate form
                if (!name || !email || !message || name.trim() === '' || email.trim() === '' || message.trim() === '') {
                    console.log('Validation failed:', { 
                        name: name, 
                        email: email, 
                        message: message,
                        nameEmpty: name.trim() === '',
                        emailEmpty: email.trim() === '',
                        messageEmpty: message.trim() === ''
                    });
                    showNotification('لطفاً تمام فیلدها را پر کنید', 'error');
                    return;
                }
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
                submitBtn.disabled = true;
                
                // Prepare email parameters
                const templateParams = {
                    name: name,
                    email: email,
                    message: message,
                    time: new Date().toLocaleString('fa-IR'),
                    to_email: 'parsa.nikoonahad2000@gmail.com' // Your email
                };
                
                // Send email
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully:', response);
                        showNotification('پیام شما با موفقیت ارسال شد!', 'success');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        showNotification('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.', 'error');
                    })
                    .finally(function() {
                        // Reset button state
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            });
        } else {
            console.error('Contact form not found!');
        }
    }, 2000); // Wait 2 seconds for DOM to be ready
}

// Show notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s linear;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Loading Screen Functions
function setLoadingScreenDirection() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Force loading screen to always be LTR
        loadingScreen.style.direction = 'ltr';
        loadingScreen.style.textAlign = 'center';
        
        const loaderWrapper = loadingScreen.querySelector('.loader-wrapper');
        if (loaderWrapper) {
            loaderWrapper.style.direction = 'ltr';
            loaderWrapper.style.textAlign = 'center';
        }
    }
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
        
        // Disable scrolling during loading
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        console.log('Loading screen shown');
    } else {
        console.error('Loading screen element not found!');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        // Start site fade-in animation after loading screen starts fading
        setTimeout(() => {
            if (mainContent) {
                mainContent.classList.add('site-entrance');
            }
        }, 200); // Start fade-in slightly before loading screen is completely hidden
        
        // Remove loading screen from DOM after transition completes
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
            
            // Enable scrolling after loading screen is completely removed
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }, 500); // Match the CSS transition duration
    }
}

// Start entry animations after loading screen
function startEntryAnimations() {
    // Reset hero animations to start fresh
    const titleLines = document.querySelectorAll('.title-line');
    const subtitleLines = document.querySelectorAll('.subtitle-line');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Reset all hero elements to initial state - completely hidden
    titleLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        line.style.visibility = 'hidden';
        line.style.animation = 'none';
    });
    
    subtitleLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        line.style.visibility = 'hidden';
        line.style.animation = 'none';
    });
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        heroButtons.style.visibility = 'hidden';
        heroButtons.style.animation = 'none';
    }
    
    // Start animations with proper timing - synchronized with site fade-in
    setTimeout(() => {
        // First title line
        if (titleLines[0]) {
            titleLines[0].style.visibility = 'visible';
            titleLines[0].style.animation = 'slideInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }
        
        // Second title line
        setTimeout(() => {
            if (titleLines[1]) {
                titleLines[1].style.visibility = 'visible';
                titleLines[1].style.animation = 'slideInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            }
        }, 400);
        
        // Subtitle lines
        setTimeout(() => {
            subtitleLines.forEach(line => {
                line.style.visibility = 'visible';
                line.style.animation = 'slideInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            });
        }, 700);
        
        // Hero buttons
        setTimeout(() => {
            if (heroButtons) {
                heroButtons.style.visibility = 'visible';
                heroButtons.style.animation = 'slideInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            }
        }, 1000);
    }, 200);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functions
    initSmoothScrolling();
    initAutoScroll();
    initScrollProgress();
    initTypingAnimation();
    initPhoneActions();
    initFormHandling();
    
    // Detect user location and apply translations
    detectUserLocation();
});
