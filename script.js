// Global variables
let currentLanguage = 'fa';
let currentSection = 0;
let isScrolling = false;
let isUserScrolling = false;
let autoScrollTriggered = false;
let autoScrollEnabled = false; // Disable auto-scroll by default
let sections = [];
let typingIntervals = [];
let typingTimeout = null;

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
        'nav-resume': 'بررسی رزومه',
        'resume-view-text': 'مشاهده آنلاین',
        'resume-download-text': 'دانلود رزومه',
        
        // Hero Section
        'hero-welcome': 'خوش آمدید به',
        'hero-website': 'وب‌سایت من!',
        'hero-frontend': 'برنامه‌نویس',
        'hero-developer': 'فرانت‌اند',
        'hero-see-works': 'نمونه کارهای من',
        'hero-contact': 'تماس با من',
        
        // About Section
        'about-title': 'درباره من',
        'about-description': 'برنامه‌نویس جوان و باانگیزه با تسلط بر HTML، CSS، JavaScript و آشنایی با React و Git. علاقه‌مند به حل مسئله و یادگیری سریع تکنولوژی‌های جدید. آماده همکاری در پروژه‌های واقعی و رشد در تیم‌های حرفه‌ای.',
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
        'education-degree': 'پایه یازدهم - شبکه و نرم‌افزار',
        'education-university': 'دبیرستان دوره دوم پسرانه امام حسین',
        'education-date': '۱۴۰۵ - ۱۴۰۴',
        'education-description': 'تحصیل در رشته شبکه و نرم‌افزار با تمرکز بر مهارت‌های عملی فناوری اطلاعات و سیستم‌ها.',
        'cert-react': 'گواهینامه React.js',
        'cert-meta': 'Meta (فیس‌بوک)',
        'cert-date-1': '۱۴۰۳',
        'cert-description-1': 'تکمیل دوره تخصصی React.js از Meta شامل Hooks، Context API و بهترین شیوه‌های توسعه.',
        'cert-js': 'گواهینامه JavaScript',
        'cert-fcc': 'freeCodeCamp',
        'cert-date-2': '۱۴۰۲',
        'cert-description-2': 'تکمیل دوره کامل JavaScript شامل ES6+، DOM Manipulation و API Integration.',
        
        // Portfolio Section
        'portfolio-title': 'نمونه کارهای من',
        'project-shop': 'پلتفرم مشاوره دانشگاهی Intel Advisor',
        'project-shop-desc': 'پلتفرم جامع مشاوره و انتخاب دانشگاه با فرانت‌اند React، بک‌اند Django و پایگاه داده MySQL. در دسترس در inteladvisor.ir.',
        'project-todo': 'اپلیکیشن ToDo',
        'project-todo-desc': 'اپلیکیشن مدیریت کارها با React.js و TypeScript. شامل API های مختلف و استفاده از React Router DOM برای مسیریابی. طراحی واکنش‌گرا با Tailwind CSS.',
        'project-view': 'مشاهده پروژه',
        
        // Tech Tags
        'tech-nextjs': 'Next.js',
        'tech-redux': 'Redux',
        'tech-firebase': 'Firebase',
        'tech-tailwind': 'Tailwind CSS',
        'tech-django': 'Django',
        'tech-mysql': 'MySQL',
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
        'nav-resume': 'Resume',
        'resume-view-text': 'View Online',
        'resume-download-text': 'Download PDF',
        
        // Hero Section
        'hero-welcome': 'Welcome To',
        'hero-website': 'My Website!',
        'hero-frontend': 'Full Stack',
        'hero-developer': 'Developer',
        'hero-see-works': 'View My Work',
        'hero-contact': 'Get In Touch',
        
        // About Section
        'about-title': 'About Me',
        'about-description': 'Young and motivated developer proficient in HTML, CSS, and JavaScript with familiarity in React and Git. Passionate about problem-solving, learning new technologies quickly, and ready to collaborate on real-world projects while growing within professional teams.',
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
        'education-degree': '11th Grade - Network & Software',
        'education-university': 'Imam Hossein Boys High School',
        'education-date': '2025 - 2026',
        'education-description': 'Studying in the Network & Software major with emphasis on practical IT skills and systems.',
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
        'project-shop': 'Intel Advisor – University Counseling Platform',
        'project-shop-desc': 'Comprehensive university advising platform powered by React on the frontend, Django on the backend, and MySQL for data storage. Live on inteladvisor.ir.',
        'project-todo': 'Todo Application',
        'project-todo-desc': 'Task management application built with React.js and TypeScript. Features various APIs and React Router DOM for navigation. Responsive design with Tailwind CSS.',
        'project-view': 'View Project',
        
        // Tech Tags
        'tech-nextjs': 'Next.js',
        'tech-redux': 'Redux',
        'tech-firebase': 'Firebase',
        'tech-tailwind': 'Tailwind CSS',
        'tech-django': 'Django',
        'tech-mysql': 'MySQL',
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
const resumeToggle = document.getElementById('resume-toggle');
const resumeMenu = document.getElementById('resume-menu');
const contactForm = document.getElementById('contact-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Set loading screen to always be LTR
    setLoadingScreenDirection();
    
    // Show loading screen immediately
    showLoadingScreen();
    
    // Initialize everything after loading screen
    setTimeout(async () => {
        // First, detect user's location and set language
        await detectUserLocation();
        
        // Wait a bit more to ensure translations are fully applied
        setTimeout(() => {
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
                initParallax();
                initScrollingObject();
            }, 800); // Wait for site fade-in to start
        }, 200); // Wait for translations to be fully applied
    }, 1000);
});

// Detect user location and set language
async function detectUserLocation() {
    // Set default language immediately to prevent mixing
    currentLanguage = 'fa';
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
    if (langBtn) {
        langBtn.textContent = 'EN';
    }
    applyTranslations();
    
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // If user is NOT from Iran, change to English
        if (data.country_code !== 'IR') {
            currentLanguage = 'en';
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            if (langBtn) {
                langBtn.textContent = 'FA';
            }
            applyTranslations();
        }
        
    } catch (error) {
        console.log('Could not detect location, using default language (Persian)');
        // Already set to Persian above, so no need to change anything
    }
}

// Professional Translation System
function applyTranslations() {
    console.log('Applying translations for language:', currentLanguage);
    
    // Prevent layout jumping by temporarily disabling transitions
    document.body.style.transition = 'none';
    document.documentElement.style.transition = 'none';
    
    // Update HTML attributes FIRST
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
    
    // Update language button
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'fa' ? 'EN' : 'FA';
    }
    
    // Force a reflow to ensure HTML attributes are applied
    document.documentElement.offsetHeight;
    
    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
            // Add translated class to show the element
            element.classList.add('translated');
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
    
    // Force another reflow to ensure all changes are applied
    document.documentElement.offsetHeight;
    
    // Re-enable transitions after a short delay
    setTimeout(() => {
        document.body.style.transition = '';
        document.documentElement.style.transition = '';
    }, 100);
    
    // Force another reflow to ensure all translations are applied
    setTimeout(() => {
        document.documentElement.offsetHeight;
    }, 50);
    
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    clearTypingAnimations();
    typingTimeout = setTimeout(() => {
        initTypingAnimation();
    }, 200);
    
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
            if (resumeMenu) {
                resumeMenu.classList.remove('open');
            }
        });
    });

    const closeResumeMenu = () => {
        if (resumeMenu) {
            resumeMenu.classList.remove('open');
        }
    };

    if (resumeToggle && resumeMenu) {
        resumeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            resumeMenu.classList.toggle('open');
        });
    }
    
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

        if (resumeMenu && resumeToggle &&
            !resumeMenu.contains(event.target) &&
            !resumeToggle.contains(event.target)) {
            closeResumeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            closeResumeMenu();
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
    
    // Observe elements for animation, EXCLUDING those managed by data-reveal system
    const animatedElements = document.querySelectorAll('.about-content, .skills-grid, .timeline-item, .portfolio-item, .contact-content');
    const filtered = Array.from(animatedElements).filter(el => {
        // Skip any element that is inside a gated reveal section or has its own data-reveal
        const inRevealSection = !!el.closest('section[data-reveal-section]');
        const selfReveal = el.hasAttribute('data-reveal') || !!el.querySelector('[data-reveal]');
        return !inRevealSection && !selfReveal;
    });
    
    filtered.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize email functionality
function initEmailFunctionality() {
    const emailItems = document.querySelectorAll('.email-item');
    
    emailItems.forEach(item => {
        const emailAddress = item.getAttribute('data-email');
        
        // Make the entire email item clickable
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openEmailClient(emailAddress);
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

// Initialize typing animation
function clearTypingAnimations() {
    typingIntervals.forEach(interval => clearInterval(interval));
    typingIntervals = [];
}

function initTypingAnimation() {
    clearTypingAnimations();
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const titleLines = heroTitle.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        const text = line.textContent && line.textContent.trim().length > 0
            ? line.textContent
            : (line.getAttribute('data-full-text') || '');
        
        if (!text) return;
        
        line.setAttribute('data-full-text', text);
        line.textContent = '';
        line.style.opacity = '1';
        
        const startTyping = () => {
            const timer = setInterval(() => {
                const currentText = line.textContent || '';
                if (currentText.length < text.length) {
                    line.textContent += text.charAt(currentText.length);
                } else {
                    clearInterval(timer);
                }
            }, 50);
            typingIntervals.push(timer);
        };
        
        setTimeout(startTyping, index * 400);
    });
}

// Navbar scroll effect (like backup)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Parallax effect for hero background (supports window or inner scroller)
// Simple parallax effect - only mountains move
function updateParallax() {
    const mountains = document.querySelector('.mountains');
    if (mountains) {
        // Try all scroll sources
        const scrolled = Math.max(
            window.pageYOffset || 0,
            document.documentElement.scrollTop || 0,
            document.body.scrollTop || 0
        );
        // More noticeable and smooth parallax movement
        const parallaxAmount = scrolled * 0.6;
        mountains.style.transform = `translateY(${parallaxAmount}px)`;
    }
}

// Listen to body scroll since that's what works
document.body.addEventListener('scroll', updateParallax, { passive: true });
window.addEventListener('scroll', updateParallax, { passive: true });
document.addEventListener('scroll', updateParallax, { passive: true });

// Initialize parallax
document.addEventListener('DOMContentLoaded', updateParallax);
setTimeout(updateParallax, 500);

updateParallax(); // Set initial position

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
    
    console.log('Sections initialized:', sections.length);
    sections.forEach((section, index) => {
        console.log(`Section ${index}:`, section ? section.id : 'null');
    });
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
            const target = e.target;
            const isInput =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable;
            if (isInput) {
                return;
            }
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
        
        // Smooth easing function for better animation
        const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentPosition = start + distance * easeInOutCubic;
        window.scrollTo(0, currentPosition);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Scroll to specific section - Simple and working
function scrollToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    const targetSection = sections[sectionIndex];
    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
    
    // Update current section
    currentSection = sectionIndex;
    
    // Update active states
    updateActiveStates();
    
    // Simple smooth scroll
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}


// Scroll to next section
function scrollToNextSection() {
    if (currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
    }
}

// Scroll to previous section
function scrollToPrevSection() {
    if (currentSection > 0) {
        scrollToSection(currentSection - 1);
    }
}

// Simple section transition effect
function addSectionTransitionEffect(targetSectionIndex) {
    const targetSection = sections[targetSectionIndex];
    if (targetSection) {
        // Simple fade in effect
        targetSection.style.opacity = '0.8';
        targetSection.style.transition = 'opacity 0.3s ease';
        
        // Reset opacity
        setTimeout(() => {
            targetSection.style.opacity = '1';
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
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
    console.log('Updating active states, current section:', currentSection);
    
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

// Working smooth scrolling for navigation links
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    const links = document.querySelectorAll('a[href^="#"]');
    console.log('Found links:', links.length);
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Clicked link:', targetId);
            console.log('Target section:', targetSection);
            
            if (targetSection) {
                console.log('Section found, scrolling...');
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Simple and reliable scroll method
                console.log('Using simple scroll method');
                
                // Calculate target position
                const targetPosition = targetSection.offsetTop - 80;
                
                console.log('Section top:', targetSection.offsetTop);
                console.log('Target position:', targetPosition);
                
                // Simple scroll - just set the scroll position
                document.documentElement.scrollTop = targetPosition;
                document.body.scrollTop = targetPosition;
                
                console.log('Simple scroll executed');
                
                // Update current section
                const sectionIndex = sections.indexOf(targetSection);
                if (sectionIndex !== -1) {
                    currentSection = sectionIndex;
                    updateActiveStates();
                }
            } else {
                console.log('Section not found!');
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
        
        // Email copy functionality
        const emailCopyBtn = document.querySelector('.email-copy-btn');
        if (emailCopyBtn) {
            emailCopyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const emailItem = this.closest('.email-item');
                const email = emailItem.getAttribute('data-email');
                
                copyToClipboard(email);
            });
        }
        
        // Email send functionality
        const emailBtn = document.querySelector('.email-btn');
        if (emailBtn) {
            emailBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const emailItem = this.closest('.email-item');
                const email = emailItem.getAttribute('data-email');
                
                // Open email client
                window.location.href = `mailto:${email}`;
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
        
        // Click on email address to copy
        const emailAddress = document.querySelector('.email-address');
        if (emailAddress) {
            emailAddress.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const emailItem = this.closest('.email-item');
                const email = emailItem.getAttribute('data-email');
                
                copyToClipboard(email);
            });
            
            // Add cursor pointer
            emailAddress.style.cursor = 'pointer';
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
                    showNotification(
                        currentLanguage === 'fa'
                            ? 'لطفاً تمام فیلدها را پر کنید'
                            : 'Please fill in all fields',
                        'error'
                    );
                    return;
                }
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                const sendingText = currentLanguage === 'fa' ? 'در حال ارسال...' : 'Sending...';
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText}`;
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
                        showNotification(
                            currentLanguage === 'fa'
                                ? 'پیام شما با موفقیت ارسال شد!'
                                : 'Your message was sent successfully!',
                            'success'
                        );
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        showNotification(
                            currentLanguage === 'fa'
                                ? 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.'
                                : 'Failed to send the message. Please try again.',
                            'error'
                        );
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
        
        // Keep scrolling enabled during loading
        
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
                mainContent.classList.remove('loaded');
                mainContent.classList.add('site-entrance');
                
                const handleAnimationEnd = () => {
                    mainContent.classList.remove('site-entrance');
                    mainContent.classList.add('loaded');
                    mainContent.removeEventListener('animationend', handleAnimationEnd);
                };
                
                mainContent.addEventListener('animationend', handleAnimationEnd);
                
                // Fallback in case animationend does not fire
                setTimeout(() => {
                    if (!mainContent.classList.contains('loaded')) {
                        mainContent.classList.remove('site-entrance');
                        mainContent.classList.add('loaded');
                    }
                }, 2000);
            }
        }, 200); // Start fade-in slightly before loading screen is completely hidden
        
        // Remove loading screen from DOM after transition completes
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
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
// Parallax engine for depth and motion
function initParallax() {
    try {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return; // Respect user preference
        }

        const layers = Array.from(document.querySelectorAll('.parallax-layer'));
        if (!layers.length) return;

        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        }, { passive: true });

        const updateTransforms = () => {
            const vh = window.innerHeight;
            layers.forEach(layer => {
                const section = layer.closest('section') || document.body;
                const rect = section.getBoundingClientRect();
                const depth = parseFloat(layer.dataset.depth || '0.3');
                const progress = ((vh / 2) - rect.top) / vh; // center-based influence

                const translateY = progress * depth * 160; // stronger parallax
                const translateX = mouseX * depth * 40;   // noticeable tilt
                const rotateZ = mouseX * depth * 3;       // slight rotation

                layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateZ}deg)`;
            });
        };

        let ticking = false;
        const onScrollOrResize = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    updateTransforms();
                    ticking = false;
                });
            }
        };

        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);
        onScrollOrResize();

        // Activate sections when entering viewport
        if ('IntersectionObserver' in window) {
            const sections = new Set(layers.map(l => l.closest('section')).filter(Boolean));
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const el = entry.target;
                    if (entry.isIntersecting) {
                        el.classList.add('parallax-active');
                    } else {
                        el.classList.remove('parallax-active');
                    }
                });
            }, { threshold: 0.1 });
            sections.forEach(s => io.observe(s));
        }
    } catch (err) {
        console.error('Parallax init error:', err);
    }
}

// Floating React icon: appears after hero, spins near skills, then explodes
function initScrollingObject() {
    try {
        if (initScrollingObject._initialized) return;
        initScrollingObject._initialized = true;

        const object = document.getElementById('scrollingObject');
        const hero = document.getElementById('home');
        const skills = document.getElementById('skills');
        if (!object || !hero || !skills) return;

        const skillItems = Array.from(document.querySelectorAll('.skills .skill-item'));
        let exploded = false;

        const compute = () => {
            const y = window.scrollY || window.pageYOffset;
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const skillsTop = skills.offsetTop;
            
            // نشان دادن زودتر آیکون پس از عبور از بخش هیرو
            const showThreshold = heroBottom - window.innerHeight * 0.5;
            if (!exploded && y > showThreshold) {
                object.classList.add('visible');
            } else if (!exploded) {
                object.classList.remove('visible');
            }
            
            const range = Math.max(skillsTop - heroBottom, 1);
            const progress = Math.min(Math.max((y - heroBottom) / range, 0), 1);
            
            const rotateDeg = progress * 720; // two full spins
            const yOffset = (progress - 0.5) * 60; // small vertical drift
            object.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) rotate(${rotateDeg}deg)`;
            
            // آماده‌سازی بخش مهارت‌ها کمی قبل از رسیدن
            const nearSkillsThreshold = skillsTop - window.innerHeight * 0.35;
            if (!exploded && y > nearSkillsThreshold && !skills.classList.contains('prepare')) {
                skills.classList.add('prepare');
                // اطمینان از مخفی بودن اولیه آیتم‌ها قبل از reveal
                skillItems.forEach(el => el.classList.remove('revealed'));
            }

            // Trigger explosion near skills
            if (!exploded && y > skillsTop - window.innerHeight * 0.2) {
                exploded = true;
                object.classList.add('explode');
                object.addEventListener('animationend', () => {
                    object.classList.remove('visible');
                    object.style.opacity = '0';
                }, { once: true });
                
                // Progressive reveal for skills
                skillItems.forEach((el, i) => {
                    setTimeout(() => el.classList.add('revealed'), i * 70);
                });
            }
        };

        window.addEventListener('scroll', compute, { passive: true });
        window.addEventListener('resize', compute);
        compute();
    } catch (err) {
        console.error('ScrollingObject init error:', err);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functions
    initSmoothScrolling();
    initAutoScroll();
    initScrollProgress();
    
    // Initialize contact actions with a small delay to ensure DOM is ready
    setTimeout(() => {
        initPhoneActions();
    }, 500);
    
    initFormHandling();
    initParallax();
    initScrollingObject();
    initScrollReveal();

});

// Scroll-based reveal animation system
function initScrollReveal() {
    try {
        const allRevealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
        if (!allRevealNodes.length) return;

        // Cleanup: remove legacy one-shot classes that lock visibility
        allRevealNodes.forEach(el => {
            el.classList.remove('visible', 'fade-in');
        });

        // Annotate all reveal nodes with base class and delay
        allRevealNodes.forEach(el => {
            el.classList.add('reveal');
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) el.style.transitionDelay = `${parseFloat(delay)}ms`;
        });

        // Section-level gating: only re-trigger animations when the section fully exits and re-enters
        const sections = Array.from(document.querySelectorAll('section[data-reveal-section]'));
        const sectionChildrenMap = new Map();
        sections.forEach(sec => {
            const children = Array.from(sec.querySelectorAll('[data-reveal]'));
            sectionChildrenMap.set(sec, children);
        });

        // Observe elements NOT inside a gated section (hero, skills, etc.)
        const elementNodes = allRevealNodes.filter(el => !el.closest('section[data-reveal-section]'));
        const ioElements = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                if (entry.isIntersecting) {
                    el.classList.add('in-view');
                } else {
                    el.classList.remove('in-view');
                }
            });
        }, { threshold: 0.25, rootMargin: '-10% 0px' });
        elementNodes.forEach(el => ioElements.observe(el));

        // Per-section observers with configurable enter threshold and rootMargin
        sections.forEach(sec => {
            const children = sectionChildrenMap.get(sec) || [];
            const enterThresholdAttr = parseFloat(sec.getAttribute('data-reveal-enter-threshold'));
            const enterThreshold = isNaN(enterThresholdAttr) ? 0.35 : enterThresholdAttr; // default 35%
            const rootMarginAttr = sec.getAttribute('data-reveal-root-margin');
            const rootMarginVal = rootMarginAttr || '0px 0px -15% 0px';

            const ioSec = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.target !== sec) return;
                    const ratio = entry.intersectionRatio;
                    if (ratio >= enterThreshold) {
                        children.forEach(el => el.classList.add('in-view'));
                    } else if (ratio === 0) {
                        children.forEach(el => el.classList.remove('in-view'));
                    }
                });
            }, { threshold: [0, enterThreshold], rootMargin: rootMarginVal });

            ioSec.observe(sec);
        });
    } catch (err) {
        console.error('ScrollReveal init error:', err);
    }
}

