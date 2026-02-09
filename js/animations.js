document.addEventListener("DOMContentLoaded", () => {

    // --- Hero Animations ---
    const heroTl = gsap.timeline();

    heroTl.to('.hero-title span', {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    })
        .to('.hero-title span', { // Fill effect simulation
            color: "#f0f0f0",
            webkitTextStroke: "0px",
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5")
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 1
        }, "-=0.5");


    // --- About Section Parallax/Reveal ---
    gsap.from(".text-block", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
        },
        y: 50,
        opacity: 0
    });

    gsap.to(".image-block", {
        scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: -50, // Slight parallax
        ease: "none"
    });


    // --- Horizontal Scroll (Signature Menu) ---
    // Refined logic: Pin the section, move the container left based on its width excess

    const showcaseSection = document.querySelector('.showcase-section');
    const scrollContainer = document.querySelector('.horizontal-scroll-container');

    function getScrollAmount() {
        let scrollWidth = scrollContainer.scrollWidth;
        return -(scrollWidth - window.innerWidth);
    }

    const tween = gsap.to(scrollContainer, {
        x: getScrollAmount,
        ease: "none",
    });

    ScrollTrigger.create({
        trigger: ".showcase-section",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
    });

    // --- Footer Reveal ---
    gsap.from("footer h2", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

});
