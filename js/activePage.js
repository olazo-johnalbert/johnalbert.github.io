document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll(".nav-bar a");
    const activeIndicator = document.querySelector(".nav-bar span");
    const navBar = document.querySelector(".nav-bar");

    function updateActiveIndicator(link) {
        if (!link || !activeIndicator || !navBar) return; // Prevent errors

        const linkRect = link.getBoundingClientRect();
        const navRect = navBar.getBoundingClientRect();

        activeIndicator.style.left = `${linkRect.left - navRect.left}px`;
        activeIndicator.style.width = `${linkRect.width}px`;
    }

    function updateOnResize() {
        requestAnimationFrame(() => { // Ensures smooth updates
            const activeLink = document.querySelector(".nav-bar a.active");
            if (activeLink) {
                updateActiveIndicator(activeLink);
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => updateActiveIndicator(link)); 
        link.addEventListener("mouseleave", () => {
            const activeLink = document.querySelector(".nav-bar a.active");
            if (activeLink) {
                updateActiveIndicator(activeLink);
            }
        });
    });

    // Set the active page on load
    const activePage = window.location.pathname;
    const activeLink = Array.from(navLinks).find(link => 
        new URL(link.href, window.location.origin).pathname === activePage
    );

    if (activeLink) {
        activeLink.classList.add('active');
        updateActiveIndicator(activeLink);
    }

    window.scrollTo(0, 0);

    // Listen for window resize events
    window.addEventListener("resize", updateOnResize);
});
