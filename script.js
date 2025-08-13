document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // AOS
    // ============================
    if (typeof AOS !== "undefined") {
        AOS.init();
    }

    // ============================
    // NAVBAR
    // ============================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;

    // Toggle menu mobile
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    // Chiudi menu mobile al click su un link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll: colore navbar + mostra/nascondi
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Cambia colore navbar
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }

        // Mostra/Nascondi navbar
        if (currentScroll > lastScrollY && currentScroll > 100) {
            // Scroll verso il basso → nascondi
            navbar.style.top = '-120px';
        } else {
            // Scroll verso l’alto → mostra
            navbar.style.top = '0';
        }

        lastScrollY = currentScroll;
    });

    // ============================
    // COOKIE BANNER
    // ============================
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (banner && acceptBtn) {
        if (localStorage.getItem('cookieAccepted') !== 'true') {
            setTimeout(() => banner.classList.add('show'), 100);

            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieAccepted', 'true');
                banner.classList.remove('show');
                setTimeout(() => banner.style.display = 'none', 500);
            });
        } else {
            banner.style.display = 'none';
        }
    }

    // ============================
    // SCROLL FLUIDO PER LINK INTERNI
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});