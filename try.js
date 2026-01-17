// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navigation
    const navigation = document.querySelector('.navigation');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add swipe animations for About section
    const aboutObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, aboutObserverOptions);

    // Observe About section elements
    const aboutText = document.querySelector('.about-text');
    const aboutImageWrapper = document.querySelector('.about-image-wrapper');

    if (aboutText) {
        aboutObserver.observe(aboutText);
    }
    if (aboutImageWrapper) {
        aboutObserver.observe(aboutImageWrapper);
    }

    // Add swipe animations for Projects section
    const projectsObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delay for project cards
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200); // Stagger animation by 200ms
                });
            }
        });
    }, projectsObserverOptions);

    // Observe Projects section
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
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

    // Parallax effect for hero image - commented out as per user request
    /*
    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        if (heroImage) {
            heroImage.style.transform = `translateY(${parallax}px)`;
        }
    });
    */

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Mobile menu toggle (if needed)
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.className = 'nav-toggle';
    navToggle.style.display = 'none';
    navToggle.style.background = 'none';
    navToggle.style.border = 'none';
    navToggle.style.fontSize = '24px';
    navToggle.style.cursor = 'pointer';
    
    const navRight = document.querySelector('.nav-right');
    const navContainer = document.querySelector('.nav-container');
    
    // Insert toggle button before nav-right
    navContainer.insertBefore(navToggle, navRight);
    
    // Show toggle on mobile
    function checkMobile() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navRight.style.display = 'none';
        } else {
            navToggle.style.display = 'none';
            navRight.style.display = 'flex';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    navToggle.addEventListener('click', function() {
        navRight.classList.toggle('is-open');
    });

    // Certificate Modal Functionality
    const certificateModal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalDate = document.getElementById('modal-date');
    const modalClose = document.querySelectorAll('.modal-close');

    // Add click event to certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const title = this.querySelector('.certificate-title').textContent;
            const issuer = this.querySelector('.certificate-issuer').textContent;
            const date = this.querySelector('.certificate-date').textContent;

            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalIssuer.textContent = issuer;
            modalDate.textContent = date;

            certificateModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Project Modal Functionality
    const projectModal = document.getElementById('project-modal');
    const projectTitleModal = document.getElementById('project-title-modal');
    const projectTitleLarge = document.getElementById('project-title-large');
    const projectDescriptionFull = document.getElementById('project-description-full');
    const techCount = document.getElementById('tech-count');
    const featuresCount = document.getElementById('features-count');
    const liveDemoBtn = document.getElementById('live-demo-btn');
    const githubBtn = document.getElementById('github-btn');
    const projectImage = document.getElementById('project-image');
    const techBadges = document.getElementById('tech-badges');
    const featuresList = document.getElementById('features-list');

    // Project data
    const projectData = {
        segbin: {
            title: 'SegBin App',
            description: 'A modern monitoring application for waste management and reward systems. Built with Flutter and Firebase to provide real-time tracking and gamification features.',
            image: 'Segbinpic.png',
            tech: ['Flutter', 'Dart', 'Firebase', 'Android'],
            features: [
                'Real-time waste monitoring',
                'Reward system integration',
                'Cross-platform mobile app',
                'Firebase backend services',
                'User-friendly interface'
            ],
            liveDemo: '#',
            github: '#'
        },
        weather: {
            title: 'Weather System Web',
            description: 'A simple weather system web application with real-time data results. Provides accurate weather information with an intuitive interface.',
            image: 'weathersytem.png',
            tech: ['Python', 'API'],
            features: [
                'Real-time weather data',
                'Location-based forecasts',
                'Responsive web design',
                'API integration',
                'Clean user interface'
            ],
            liveDemo: '#',
            github: 'https://github.com/MrEngineer2k03/Weather-System-Web'
        },
        university: {
            title: 'University Web',
            description: 'A modern university website with integrated student portal and course management. Features responsive design and comprehensive information system.',
            image: 'universitypic.png',
            tech: ['HTML', 'CSS', 'JavaScript'],
            features: [
                'Student portal integration',
                'Course management system',
                'Responsive design',
                'Administrative dashboard',
                'Information management'
            ],
            liveDemo: '#',
            github: '#'
        }
    };

    // Add click event to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                projectTitleModal.textContent = data.title;
                projectTitleLarge.textContent = data.title;
                projectDescriptionFull.textContent = data.description;
                projectImage.src = data.image;
                techCount.textContent = data.tech.length;
                featuresCount.textContent = data.features.length;

                liveDemoBtn.onclick = function() {
                    if (data.liveDemo !== '#') {
                        window.open(data.liveDemo, '_blank');
                    }
                };
                githubBtn.onclick = function() {
                    if (data.github !== '#') {
                        window.open(data.github, '_blank');
                    }
                };

                // Clear and populate tech badges
                techBadges.innerHTML = '';
                data.tech.forEach(tech => {
                    const badge = document.createElement('span');
                    badge.className = 'tech-badge';
                    badge.textContent = tech;
                    techBadges.appendChild(badge);
                });

                // Clear and populate features list
                featuresList.innerHTML = '';
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });

                projectModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal function
    function closeProjectModal() {
        projectModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Back button event listener
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking close button
    modalClose.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            if (this.closest('#certificate-modal')) {
                certificateModal.classList.remove('show');
                document.body.style.overflow = '';
            } else if (this.closest('#project-modal')) {
                closeProjectModal();
            }
        });
    });

    // Close modal when clicking outside the modal content
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            certificateModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (certificateModal.classList.contains('show')) {
                certificateModal.classList.remove('show');
                document.body.style.overflow = '';
            }
            if (projectModal.classList.contains('show')) {
                closeProjectModal();
            }
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.style.transform = 'rotate(360deg)';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            contactForm.reset();

            // Show success message
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');

            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.style.transform = '';

            // Clear message after 5 seconds
            setTimeout(() => {
                hideFormMessage();
            }, 5000);
        }, 2000);
    });

    function showFormMessage(message, type) {
        // Remove existing message
        hideFormMessage();

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Insert after form
        contactForm.appendChild(messageDiv);

        // Animate in
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }

    function hideFormMessage() {
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.style.opacity = '0';
            existingMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                existingMessage.remove();
            }, 300);
        }
    }

    // Add form message styles dynamically
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .form-message {
            margin-top: 16px;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }

        .form-message.success {
            background: rgba(34, 197, 94, 0.1);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .form-message.error {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }
    `;
    document.head.appendChild(formStyles);
});
