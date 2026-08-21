// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text)';
        }
    });
});

// Subtle fade-in on scroll (progressive enhancement - content always visible)
if ('IntersectionObserver' in window) {
    const animatedEls = document.querySelectorAll('.project-card, .about-text, .skills, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Only start invisible and observe if element is BELOW the viewport
    animatedEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            // Add stagger to cards
            if (el.classList.contains('project-card') || el.classList.contains('contact-card')) {
                const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains(el.classList[0]));
                const idx = siblings.indexOf(el);
                el.style.transitionDelay = `${idx * 0.1}s`;
            }
            observer.observe(el);
        }
    });
}
