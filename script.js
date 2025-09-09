// Loading Screen Management
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('progress-bar');
        this.percentageText = document.getElementById('loading-percentage');
        this.progress = 0;
        this.isComplete = false;
        
        this.init();
    }


    init() {
        // Start loading simulation
        this.simulateLoading();
        
        // Force complete after 3 seconds maximum
        setTimeout(() => {
            this.completeLoading();
        }, 3000);
    }

    simulateLoading() {
        const interval = setInterval(() => {
            if (this.progress < 95 && !this.isComplete) {
                // Simulate realistic loading progress
                const increment = Math.random() * 20 + 10;
                this.progress = Math.min(this.progress + increment, 95);
                this.updateProgress(this.progress);
            } else {
                clearInterval(interval);
            }
        }, 150);
    }

    updateProgress(percentage) {
        if (this.progressBar && this.percentageText) {
            this.progressBar.style.width = percentage + '%';
            this.percentageText.textContent = Math.round(percentage) + '%';
            
            // Update loading message based on progress
            const messageElement = document.querySelector('.loading-message');
            if (messageElement) {
                if (percentage < 30) {
                    messageElement.textContent = 'Preparing Portfolio...';
                } else if (percentage < 60) {
                    messageElement.textContent = 'Optimizing Experience...';
                } else if (percentage < 90) {
                    messageElement.textContent = 'Loading Skills & Projects...';
                } else {
                    messageElement.textContent = 'Almost there...';
                }
            }
        }
    }

    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;
        
        // Complete progress bar
        this.updateProgress(100);
        
        // Wait a moment then fade out
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('fade-out');
                
                // Remove loading screen after fade animation
                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }, 800);
            }
        }, 500);
    }
}

// FAQ Accordion Functionality (outside the class)
function initializeFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items || items.length === 0) return;

    items.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle current
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item.open').forEach(it => it.classList.remove('open'));
            // Open if it was closed
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Open first item by default
    const first = items[0];
    if (first) first.classList.add('open');
}

// Projects See More Functionality
function initializeProjectsSeeMore() {
    const seeMoreBtn = document.getElementById('projectsSeeMore');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isExpanded = false;
    
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Add loading state to button
                seeMoreBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    seeMoreBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Show all hidden projects simultaneously with synchronized animation
                setTimeout(() => {
                    hiddenProjects.forEach((project) => {
                        // Use flex to preserve card layout (align CTA at bottom)
                        project.style.display = 'flex';
                        // Force reflow for smooth animation
                        void project.offsetHeight;
                    });
                    
                    // Add show class to all projects at once for simultaneous animation
                    setTimeout(() => {
                        hiddenProjects.forEach((project) => {
                            project.classList.add('show');
                        });
                    }, 50);
                }, 200);
                
                // Update button text and icon with delay
                setTimeout(() => {
                    seeMoreBtn.querySelector('.btn-text').textContent = 'See Less Projects';
                    seeMoreBtn.classList.add('expanded');
                }, 100);
            } else {
                // Hide all projects simultaneously
                hiddenProjects.forEach((project) => {
                    project.classList.remove('show');
                    // Hide after animation completes
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 600);
                });
                
                // Update button text and icon
                seeMoreBtn.querySelector('.btn-text').textContent = 'See More Projects';
                seeMoreBtn.classList.remove('expanded');
                
                // Smooth scroll to see more button after collapse
                setTimeout(() => {
                    seeMoreBtn.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            }
        });
    }
}

// Initialize App Function
function initializeApp() {
    // Initialize loading screen
    new LoadingManager();
    
    // Initialize skills filter functionality
    initializeSkillsFilter();
    // Initialize FAQ accordion
    initializeFAQ();
    // Initialize Projects see more
    initializeProjectsSeeMore();
}

// Skills Filter Functionality
function initializeSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter skill cards using their data-category attribute
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Education Tabs Functionality
function initializeEducationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Initialize certificates see more functionality
    initializeCertificatesSeeMore();
}

// Certificates See More Functionality
function initializeCertificatesSeeMore() {
    const seeMoreBtn = document.getElementById('certificatesSeeMore');
    const hiddenCertificates = document.querySelectorAll('.hidden-certificate');
    let isExpanded = false;
    
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Show hidden certificates with staggered animation
                hiddenCertificates.forEach((cert, index) => {
                    setTimeout(() => {
                        cert.classList.add('show');
                    }, index * 100);
                });
                
                // Update button text and icon
                seeMoreBtn.querySelector('.btn-text').textContent = 'See Less';
                seeMoreBtn.classList.add('expanded');
            } else {
                // Hide certificates
                hiddenCertificates.forEach(cert => {
                    cert.classList.remove('show');
                });
                
                // Update button text and icon
                seeMoreBtn.querySelector('.btn-text').textContent = 'See More';
                seeMoreBtn.classList.remove('expanded');
            }
        });
    }
}

// Certificate Modal Functionality
let currentCertificateData = {};

function openCertificateModal(imageSrc, title, issuer, date) {
    currentCertificateData = { imageSrc, title, issuer, date };
    
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertificateImage');
    const modalTitle = document.getElementById('modalCertificateTitle');
    const modalIssuer = document.getElementById('modalCertificateIssuer');
    const modalDate = document.getElementById('modalCertificateDate');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalDate.textContent = date;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function downloadCertificate() {
    if (currentCertificateData.imageSrc) {
        const link = document.createElement('a');
        link.href = currentCertificateData.imageSrc;
        link.download = `${currentCertificateData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('certificateModal');
    if (e.target === modal) {
        closeCertificateModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeApp();
    initializeEducationTabs();
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Professional Scroll Animation System
class ScrollAnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class when element comes into view
                    entry.target.classList.add('animate-in');
                    
                    // Optional: Stop observing after animation (for performance)
                    // this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
        });

        // Start observing elements when DOM is loaded
        this.observeElements();
    }

    observeElements() {
        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('scroll-fade-up');
            this.observer.observe(section);
        });

        // Observe section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('scroll-fade-up');
            this.observer.observe(header);
        });

        // Observe cards with staggered animation
        const cards = document.querySelectorAll('.about-card, .service-card, .portfolio-item, .insight-card, .pricing-card, .process-step, .tech-card');
        cards.forEach(card => {
            card.classList.add('scroll-stagger');
            this.observer.observe(card);
        });

        // Observe stats with scale animation
        const stats = document.querySelectorAll('.stat-card, .stats-container .stat');
        stats.forEach(stat => {
            stat.classList.add('scroll-scale');
            this.observer.observe(stat);
        });

        // Observe contact items with left/right animations
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.classList.add(index % 2 === 0 ? 'scroll-fade-left' : 'scroll-fade-right');
            this.observer.observe(item);
        });

        // Observe footer sections
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            section.classList.add('scroll-fade-up');
            this.observer.observe(section);
        });
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimationManager();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .about-text, .about-image');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h4');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Floating cards animation enhancement
document.addEventListener('DOMContentLoaded', () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service cards hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Portfolio items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const image = item.querySelector('.portfolio-image');
            image.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            const image = item.querySelector('.portfolio-image');
            image.style.transform = 'scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't add loading to form submit buttons (handled separately)
            if (this.type === 'submit') return;
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Professional Typing Animation System
class TypewriterEffect {
    constructor() {
        this.typeElements = document.querySelectorAll('.type');
        this.started = false;
        this.init();
    }

    init() {
        if (this.typeElements.length === 0) return;

        const loadingScreen = document.getElementById('loading-screen');

        // If a loading screen exists, wait for app:ready; otherwise fallback to small delay
        if (loadingScreen) {
            const startIfReady = () => {
                if (this.started) return;
                this.started = true;
                this.startTypingSequence();
            };
            window.addEventListener('app:ready', startIfReady, { once: true });
            // Safety fallback in case event is missed
            setTimeout(() => startIfReady(), 3500);
        } else {
            setTimeout(() => this.startTypingSequence(), 800);
        }
    }

    async startTypingSequence() {
        for (let i = 0; i < this.typeElements.length; i++) {
            const element = this.typeElements[i];
            const text = element.getAttribute('data-text');
            
            // Clear element content
            element.textContent = '';
            element.style.opacity = '1';
            
            // Type the text with smooth animation
            await this.typeText(element, text, this.getTypingSpeed(i));
            
            // Hide cursor from current element when moving to next
            if (i < this.typeElements.length - 1) {
                element.classList.add('typing-done');
                await this.delay(300);
            }
        }
        
        // Hide cursor after all typing is complete
        setTimeout(() => {
            const lastElement = this.typeElements[this.typeElements.length - 1];
            if (lastElement) {
                lastElement.classList.add('typing-done');
            }
        }, 1000);
    }

    async typeText(element, text, baseSpeed) {
        return new Promise((resolve) => {
            let charIndex = 0;
            
            const typeChar = () => {
                if (charIndex < text.length) {
                    const char = text.charAt(charIndex);
                    element.textContent += char;
                    charIndex++;
                    
                    // Variable speed for natural typing
                    let speed = baseSpeed;
                    if (char === ' ') speed *= 0.5; // Faster for spaces
                    if (char === ',' || char === '.') speed *= 2; // Slower for punctuation
                    
                    // Add slight randomness for natural feel
                    speed += Math.random() * 30 - 15;
                    
                    setTimeout(typeChar, Math.max(speed, 20));
                } else {
                    resolve();
                }
            };
            
            typeChar();
        });
    }

    getTypingSpeed(elementIndex) {
        // Different speeds for different elements
        const speeds = [80, 60]; // First element slower, second faster
        return speeds[elementIndex] || 70;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new TypewriterEffect();
});

// Portfolio Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    
    portfolioButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            // Simulate project loading
            setTimeout(() => {
                // Reset button
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
                
                // Show project modal or redirect
                showProjectModal(index);
            }, 1000);
        });
    });
});

// Project Modal System
function showProjectModal(projectIndex) {
    const projects = [
        {
            title: 'E-commerce Platform',
            description: 'A comprehensive online shopping platform with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            features: ['Real-time inventory', 'Secure payments', 'User analytics', 'Mobile responsive'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Analytics Dashboard',
            description: 'Real-time analytics dashboard with interactive charts and data visualization for business intelligence and performance monitoring.',
            technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Chart.js'],
            features: ['Real-time data', 'Interactive charts', 'Export reports', 'Custom filters'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Learning Management System',
            description: 'Complete LMS platform for online education with course management, progress tracking, and interactive learning tools.',
            technologies: ['Angular', 'Django', 'MySQL', 'WebRTC'],
            features: ['Course management', 'Progress tracking', 'Video streaming', 'Assessments'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Fitness Mobile App',
            description: 'Cross-platform fitness application with workout tracking, nutrition planning, and social features for health enthusiasts.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Health APIs'],
            features: ['Workout tracking', 'Nutrition plans', 'Social features', 'Health sync'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'AI Chatbot Platform',
            description: 'Intelligent chatbot platform with natural language processing and machine learning capabilities for customer service automation.',
            technologies: ['Python', 'TensorFlow', 'NLP', 'WebSocket'],
            features: ['Natural language', 'Machine learning', 'Multi-language', 'Analytics'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Cybersecurity Suite',
            description: 'Comprehensive cybersecurity solution with threat detection, vulnerability assessment, and real-time monitoring capabilities.',
            technologies: ['Java', 'Spring Boot', 'Elasticsearch', 'Docker'],
            features: ['Threat detection', 'Vulnerability scan', 'Real-time alerts', 'Compliance reports'],
            demoUrl: '#',
            githubUrl: '#'
        }
    ];
    
    const project = projects[projectIndex];
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${project.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="project-description">${project.description}</p>
                
                <div class="project-technologies">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-actions">
                    <a href="${project.demoUrl}" class="btn-demo" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" class="btn-github" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore scroll when modal closes
    modal.addEventListener('transitionend', () => {
        if (modal.style.opacity === '0') {
            document.body.style.overflow = 'auto';
        }
    });
}

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Skills Filter Functionality
function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Add scroll reveal functionality
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to sections
    const sections = document.querySelectorAll('.about, .skills, .portfolio, .experience, .education, .contact, .location-map');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });
}

// Initialize skill filters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillFilters();
    
    // Add scroll reveal after a short delay
    setTimeout(() => {
        initializeScrollReveal();
    }, 1000);
});
