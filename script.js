// Desktop Hamburger Menu Toggle
const desktopHamburger = document.getElementById('desktopHamburger');
const hamburgerMenu = document.getElementById('hamburgerMenu');

if (desktopHamburger && hamburgerMenu) {
    const setMenuOpen = (isOpen) => {
        hamburgerMenu.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        desktopHamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    desktopHamburger.setAttribute('aria-expanded', 'false');
    desktopHamburger.setAttribute('aria-controls', 'hamburgerMenu');

    desktopHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenuOpen(!hamburgerMenu.classList.contains('active'));
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!desktopHamburger.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            setMenuOpen(false);
        }
    });

    // Close dropdown when clicking on a link
    hamburgerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setMenuOpen(false);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100) {
            setMenuOpen(false);
        }
    });
}

// Mobile Navigation Toggle (using desktop hamburger on mobile)
const navMenu = document.querySelector('.nav-menu');

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Countdown Timer
function updateCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }

    // Set your event date here (format: YYYY-MM-DD HH:MM:SS)
    const eventDate = new Date('2026-10-10 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

function scrollPageToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

function isHomePage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return /(?:^|\/)(index\.html)?$/.test(path) || path.endsWith('/PickleFest') || path.endsWith('/PickleFest/');
}

if (isHomePage() && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Landing on #home should always be the absolute top of the page
if (window.location.hash === '#home') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    scrollPageToTop();
}

if (isHomePage() && (!window.location.hash || window.location.hash === '#home')) {
    scrollPageToTop();
}

// Logo / Home links: always scroll fully to top when already on the homepage
document.querySelectorAll('a.logo-link, a[href="index.html"], a[href="index.html#home"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!isHomePage()) return;
        e.preventDefault();
        history.replaceState(null, '', 'index.html');
        scrollPageToTop();
        if (typeof hamburgerMenu !== 'undefined' && hamburgerMenu) {
            hamburgerMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

// Smooth scroll for in-page anchor links (About, etc.)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') {
            e.preventDefault();
            history.replaceState(null, '', window.location.pathname + window.location.search);
            scrollPageToTop();
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = navbar ? navbar.offsetHeight : 100;
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .activity-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Randomize sponsor logos below presenting sponsors on each page load.
document.querySelectorAll('[data-randomize-sponsors]').forEach(container => {
    const cards = Array.from(container.children);

    cards
        .sort(() => Math.random() - 0.5)
        .forEach(card => container.appendChild(card));
});

document.querySelectorAll('[data-copy-email]').forEach(button => {
    const email = button.dataset.copyEmail;
    const defaultText = button.textContent;

    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
            button.textContent = 'Email copied!';
        } catch (error) {
            button.textContent = email;
        }

        setTimeout(() => {
            button.textContent = defaultText;
        }, 2200);
    });
});

/* Keep page content below the fixed mobile header (logo + tab grid) */
(function syncHeaderOffset() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const applyOffset = () => {
        if (window.innerWidth > 1180) {
            document.documentElement.style.removeProperty('--header-offset');
            return;
        }
        const height = Math.ceil(nav.getBoundingClientRect().height);
        document.documentElement.style.setProperty('--header-offset', `${height + 10}px`);
    };

    applyOffset();
    window.addEventListener('resize', applyOffset);
    window.addEventListener('load', applyOffset);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(applyOffset);
    }
})();

