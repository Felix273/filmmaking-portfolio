// Navigation scroll effects
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroTitle = document.getElementById('heroTitle');
    const navLogo = document.getElementById('navLogo');
    const floatingFooter = document.getElementById('floatingFooter');
    
    // Hero title fade (only on homepage)
    if (heroTitle) {
        if (scrolled > 100) {
            heroTitle.classList.add('scrolled');
            navLogo.classList.add('visible');
        } else {
            heroTitle.classList.remove('scrolled');
            navLogo.classList.remove('visible');
        }
    } else {
        // On other pages, always show nav logo
        if (navLogo) {
            navLogo.classList.add('visible');
        }
    }
    
    // Floating footer (shows when scrolling up or near bottom)
    if (floatingFooter) {
        const scrollingUp = scrolled < lastScroll;
        const nearBottom = (window.innerHeight + scrolled) >= document.body.offsetHeight - 500;
        
        if ((scrollingUp && scrolled > 300) || nearBottom) {
            floatingFooter.classList.add('visible');
        } else {
            floatingFooter.classList.remove('visible');
        }
    }
    
    lastScroll = scrolled;
});