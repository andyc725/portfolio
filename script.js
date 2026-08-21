// Fade in animation on scroll
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and sections
const animatedElements = document.querySelectorAll('.project-card, .about-text, .skills, .contact-card');
animatedElements.forEach(el => {
    // Start hidden
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stagger the project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger contact cards
document.querySelectorAll('.contact-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

// Fallback: if IntersectionObserver isn't supported or something goes wrong,
// show everything after 2 seconds
setTimeout(() => {
    animatedElements.forEach(el => {
        if (el.style.opacity === '0') {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}, 2000);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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
