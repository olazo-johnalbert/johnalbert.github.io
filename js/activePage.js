document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll(".nav-bar a");
    const activeIndicator = document.querySelector(".nav-bar span");

    function updateActiveIndicator(link) {
        const linkRect = link.getBoundingClientRect();
        const navRect = document.querySelector(".nav-bar").getBoundingClientRect();
        
        activeIndicator.style.left = `${linkRect.left - navRect.left}px`;
        activeIndicator.style.width = `${linkRect.width}px`;
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
    const activeLink = Array.from(navLinks).find(link => new URL(link.href, window.location.origin).pathname === activePage);

    if (activeLink) {
        activeLink.classList.add('active');
        updateActiveIndicator(activeLink);
    }
});