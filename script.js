// Global variables
let currentLanguage = 'fa';
let translations = {};
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

// Translations object
translations = {
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
        'about-description': 'با بیش از ۳ سال تجربه در توسعه فرانت‌اند، مهارت‌های پیشرفته‌ای در HTML، CSS و JavaScript کسب کرده‌ام. در برنامه‌نویسی با فریمورک‌های مدرن مانند React.js و Next.js مهارت دارم. همچنین با فریمورک‌های طراحی مانند Tailwind CSS و Sass آشنا هستم. توانایی کار تیمی قوی دارم و تجربه کار با استانداردهای بهینه‌سازی وب را دارم.',
        'trait-learner': 'یادگیرنده مشتاق',
        'trait-passionate': 'پرشور و علاقه‌مند',
        'trait-problem-solver': 'حل‌کننده مسئله',
        'trait-creative': 'خلاق',
        'trait-teamwork': 'کار تیمی',
        'trait-flexible': 'انعطاف‌پذیر',
        
        // Skills Section
        'skills-title': 'مهارت‌های من',
        'skills-frontend': 'فرانت‌اند',
        'skills-tools': 'ابزارها و تکنولوژی',
        
        // Education Section
        'education-title': 'تحصیلات و گواهینامه‌ها',
        'education-degree': 'کارشناسی مهندسی کامپیوتر',
        'education-university': 'دانشگاه تهران',
        'education-date': '۱۳۹۸ - ۱۴۰۲',
        'education-description': 'تحصیل در رشته مهندسی کامپیوتر با گرایش نرم‌افزار. تمرکز بر روی توسعه وب و الگوریتم‌های کامپیوتری.',
        'cert-react': 'گواهینامه React.js',
        'cert-meta': 'Meta (Facebook)',
        'cert-date-1': '۱۴۰۱',
        'cert-description-1': 'تکمیل دوره تخصصی React.js از Meta شامل Hooks، Context API، و بهترین شیوه‌های توسعه.',
        'cert-js': 'گواهینامه JavaScript',
        'cert-fcc': 'freeCodeCamp',
        'cert-date-2': '۱۴۰۰',
        'cert-description-2': 'تکمیل دوره کامل JavaScript شامل ES6+، DOM Manipulation، و API Integration.',
        
        // Portfolio Section
        'portfolio-title': 'نمونه کارهای من',
        'project-shop': 'فروشگاه آنلاین',
        'project-shop-desc': 'پروژه فروشگاه آنلاین با استفاده از Next.js برای فرانت‌اند، Redux برای مدیریت state، و Firebase برای بک‌اند. طراحی واکنش‌گرا با Tailwind CSS.',
        'project-todo': 'اپلیکیشن ToDo',
        'project-todo-desc': 'اپلیکیشن مدیریت کارها با React.js و TypeScript. شامل API های مختلف و استفاده از React Router DOM برای مسیریابی. طراحی واکنش‌گرا با Tailwind CSS.',
        'project-view': 'مشاهده پروژه',
        
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
        'hero-frontend': 'Front-End',
        'hero-developer': 'Web Developer',
        'hero-see-works': 'See My Latest Works',
        'hero-contact': 'Contact Me',
        
        // About Section
        'about-title': 'About Me',
        'about-description': 'With over 3 years of experience in Front-End development, I have acquired advanced skills in HTML, CSS, and JavaScript. I am proficient in programming using modern frameworks such as React.js and Next.js. Additionally, I am familiar with design frameworks like Tailwind CSS & Sass. I possess strong teamwork abilities and have experience working with web optimization standards.',
        'trait-learner': 'Hungry Learner',
        'trait-passionate': 'Passionate',
        'trait-problem-solver': 'Problem Solver',
        'trait-creative': 'Creative',
        'trait-teamwork': 'Team Work',
        'trait-flexible': 'Flexibility',
        
        // Skills Section
        'skills-title': 'My Skills',
        'skills-frontend': 'Frontend',
        'skills-tools': 'Tools & Technologies',
        
        // Education Section
        'education-title': 'Education & Certifications',
        'education-degree': 'Bachelor of Computer Engineering',
        'education-university': 'University of Tehran',
        'education-date': '2019 - 2023',
        'education-description': 'Studied Computer Engineering with a focus on software development. Concentrated on web development and computer algorithms.',
        'cert-react': 'React.js Certificate',
        'cert-meta': 'Meta (Facebook)',
        'cert-date-1': '2022',
        'cert-description-1': 'Completed specialized React.js course from Meta including Hooks, Context API, and best development practices.',
        'cert-js': 'JavaScript Certificate',
        'cert-fcc': 'freeCodeCamp',
        'cert-date-2': '2021',
        'cert-description-2': 'Completed comprehensive JavaScript course including ES6+, DOM Manipulation, and API Integration.',
        
        // Portfolio Section
        'portfolio-title': 'My Portfolio',
        'project-shop': 'Online Shop',
        'project-shop-desc': 'An online store project developed using Next.js for the frontend, utilizing Redux for state management. The backend is implemented as a Serverless architecture with Firebase. The design system is built with Tailwind CSS, ensuring responsiveness across various devices.',
        'project-todo': 'ToDo App',
        'project-todo-desc': 'A ToDo project has been developed using React.js for the frontend, written in TypeScript. It incorporates various APIs and utilizes the React Router DOM library for routing. The design system is implemented with Tailwind CSS to ensure responsiveness across different devices.',
        'project-view': 'See Demo',
        
        // Contact Section
        'contact-title': 'Contact Me Anytime',
        'contact-email': 'Mail',
        'contact-phone': 'Phone',
        'contact-telegram': 'Telegram',
        'contact-instagram': 'Instagram',
        'contact-name': 'Your Name',
        'contact-email-placeholder': 'Your Email',
        'contact-message': 'Your Message',
        'contact-send': 'Submit',
        
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
    // Detect user's location and set language
    detectUserLocation();
    
    // Initialize sections
    initSections();
    
    // Initialize animations
    initAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize auto scroll
    initAutoScroll();
    
    // Initialize scroll progress
    initScrollProgress();
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
        applyTranslations();
    }
}

// Apply translations to the page
function applyTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update specific elements that don't have data-translate attribute
    updateSpecificElements();
}

// Update specific elements
function updateSpecificElements() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const navTexts = currentLanguage === 'fa' 
        ? ['خانه', 'درباره من', 'مهارت‌ها', 'تحصیلات', 'نمونه کارها', 'تماس']
        : ['Home', 'About', 'Skills', 'Education', 'Portfolio', 'Contact'];
    
    navLinks.forEach((link, index) => {
        if (navTexts[index]) {
            link.textContent = navTexts[index];
        }
    });
    
    // Hero section
    const heroWelcome = document.querySelector('.title-line:first-child');
    const heroWebsite = document.querySelector('.title-line:nth-child(2)');
    const heroFrontend = document.querySelector('.subtitle-line:first-child');
    const heroDeveloper = document.querySelector('.subtitle-line:nth-child(2)');
    
    if (currentLanguage === 'fa') {
        if (heroWelcome) heroWelcome.textContent = 'خوش آمدید به';
        if (heroWebsite) heroWebsite.textContent = 'وب‌سایت من!';
        if (heroFrontend) heroFrontend.textContent = 'برنامه‌نویس';
        if (heroDeveloper) heroDeveloper.textContent = 'فرانت‌اند';
    } else {
        if (heroWelcome) heroWelcome.textContent = 'Welcome To';
        if (heroWebsite) heroWebsite.textContent = 'My Website!';
        if (heroFrontend) heroFrontend.textContent = 'Front-End';
        if (heroDeveloper) heroDeveloper.textContent = 'Web Developer';
    }
    
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const titles = currentLanguage === 'fa'
        ? ['درباره من', 'مهارت‌های من', 'تحصیلات و گواهینامه‌ها', 'نمونه کارهای من', 'تماس با من']
        : ['About Me', 'My Skills', 'Education & Certifications', 'My Portfolio', 'Contact Me Anytime'];
    
    sectionTitles.forEach((title, index) => {
        if (titles[index]) {
            title.textContent = titles[index];
        }
    });
    
    // Update button texts
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.textContent.includes('نمونه کارهای من') || button.textContent.includes('See My Latest Works')) {
            button.textContent = currentLanguage === 'fa' ? 'نمونه کارهای من' : 'See My Latest Works';
        } else if (button.textContent.includes('تماس با من') || button.textContent.includes('Contact Me')) {
            button.textContent = currentLanguage === 'fa' ? 'تماس با من' : 'Contact Me';
        } else if (button.textContent.includes('مشاهده پروژه') || button.textContent.includes('See Demo')) {
            button.textContent = currentLanguage === 'fa' ? 'مشاهده پروژه' : 'See Demo';
        } else if (button.textContent.includes('ارسال پیام') || button.textContent.includes('Submit')) {
            button.textContent = currentLanguage === 'fa' ? 'ارسال پیام' : 'Submit';
        }
    });
}

// Toggle language
langBtn.addEventListener('click', function() {
    currentLanguage = currentLanguage === 'fa' ? 'en' : 'fa';
    
    // Update HTML attributes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
    
    // Update language button
    langBtn.textContent = currentLanguage === 'fa' ? 'EN' : 'FA';
    
    // Apply translations
    applyTranslations();
    
    // Update CSS for RTL/LTR
    updateLayoutDirection();
});

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
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
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
}

// Initialize contact form
function initContactForm() {
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
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 1000);
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
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

// Initialize auto scroll functionality
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
    
    // Keyboard navigation - only next/prev
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            scrollToNextSection();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToPrevSection();
        }
    });
    
    // Normal scroll behavior - let user scroll freely within sections
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        
        // Check if user reached end of current section after they stop scrolling
        scrollTimeout = setTimeout(() => {
            if (!isScrolling) {
                checkSectionEnd();
            }
            isUserScrolling = false;
        }, 1000); // Increased delay to 1 second
    });
    
    // Touch navigation for mobile - improved
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let touchEndTime = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = Date.now();
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        touchEndTime = Date.now();
        handleSwipe();
    });
    
    function handleSwipe() {
        if (isScrolling) return;
        
        const swipeThreshold = 80;
        const timeThreshold = 300;
        const diff = touchStartY - touchEndY;
        const timeDiff = touchEndTime - touchStartTime;
        
        if (Math.abs(diff) > swipeThreshold && timeDiff < timeThreshold) {
            if (diff > 0) {
                scrollToNextSection();
            } else {
                scrollToPrevSection();
            }
        }
    }
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

// Initialize scroll progress
function initScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Update current section based on scroll position
        updateCurrentSection();
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functions
    initSmoothScrolling();
    initAutoScroll();
    initScrollProgress();
    initTypingAnimation();
    initPhoneActions();
    initFormHandling();
});
