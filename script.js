document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- UTILITIES ---
    const updateScrollProgress = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        document.querySelector('.scroll-progress').style.width = `${progress}%`;
    };

    window.addEventListener('scroll', () => {
        updateScrollProgress();

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');

            if (navLinksList.classList.contains('active')) {
                gsap.from('.nav-links li', {
                    opacity: 0,
                    x: 20,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });

        // Close menu on link click
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }

    // --- ANIMATIONS ---

    // Hero Entry Animation
    const heroTl = gsap.timeline();
    heroTl.from('.hero-tag', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
        .from('.hero-title', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-actions', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');

    // Section Content Reveals
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const content = Array.from(section.querySelectorAll('p, .spec-card, .portfolio-item, .contact-content')).filter(el => !el.closest('.method-card'));

        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        if (content.length > 0) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });

    // About Image Parallax
    gsap.to('.image-wrapper img', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        ease: 'none'
    });

    // Navbar Link Interactions
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            gsap.to(window, {
                duration: 1.2,
                scrollTo: target,
                ease: 'power3.inOut'
            });
        });
    });

    // --- INFINITE MARQUEE SPECIALTIES ---
    const wrapper = document.querySelector('.methods-wrapper');
    const scrollContent = document.querySelector('.methods-scroll');
    const cards = gsap.utils.toArray('.method-card');

    if (wrapper && scrollContent && cards.length > 0) {
        // Clone items to create seamless loop
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            scrollContent.appendChild(clone);
        });

        const totalWidth = scrollContent.offsetWidth;
        const speed = 50; // Pixels per second

        const marquee = gsap.to(scrollContent, {
            x: -(totalWidth / 2) - 5, // Account for half the width + a bit of gap adjustment
            duration: (totalWidth / 2) / speed,
            ease: 'none',
            repeat: -1,
            onReverseComplete: () => marquee.restart()
        });

        // Pause/Resumo on Hover
        wrapper.addEventListener('mouseenter', () => marquee.pause());
        wrapper.addEventListener('mouseleave', () => marquee.play());
    }
});
