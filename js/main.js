// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate GSAP with Lenis
gsap.registerPlugin(ScrollTrigger);

/* Custom Cursor Logic */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (handled by CSS transition or GSAP lag)
    // Using GSAP for smoother trailing effect
    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true
    });
});

// Interactive elements hover effect for cursor
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {
            scale: 1.5,
            borderColor: "transparent",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.3
        });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {
            scale: 1,
            borderColor: "rgba(255, 255, 255, 0.5)",
            backgroundColor: "transparent",
            duration: 0.3
        });
    });
});
