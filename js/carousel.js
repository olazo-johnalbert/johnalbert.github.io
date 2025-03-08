document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slide-container");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dots-indicator li");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    let activeIndex = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => slide.style.display = i === index ? "flex" : "none");
        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    };

    const updateActiveSlide = (direction) => {
        activeIndex = Math.max(0, Math.min(activeIndex + direction, slides.length - 1));
        showSlide(activeIndex);
    };

    const handleScroll = (event) => {
        if (window.matchMedia("(max-width: 765)").matches || window.matchMedia("(max-height: 600)")) return; 
        event.preventDefault();
        updateActiveSlide(event.deltaY > 0 ? 1 : -1);
    };

    const handleDotClick = (event, index) => {
        event.preventDefault();
        activeIndex = index;
        showSlide(activeIndex);
    };

    const observeSlides = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeIndex = Array.from(slides).indexOf(entry.target);
                    dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
                }
            });
        }, { threshold: 0.6 });

        slides.forEach((slide) => observer.observe(slide));
    };

    // Function to navigate to a specific slide or section from a hash link
    const navigateToHash = () => {
        const hash = window.location.hash.substring(1);
        if (!hash) return;
    
        // Wait until elements are available
        const targetSlide = document.getElementById(hash);
        const targetSection = document.getElementById(hash);
    
        if (!targetSlide && !targetSection) {
            console.warn(`Element with ID '${hash}' not found!`);
            return;
        }
    
        if (targetSlide) {
            activeIndex = Array.from(slides).indexOf(targetSlide);
            showSlide(activeIndex);
        } else if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
            console.log(targetSection);
        }
    };
    

    // Initialize
    showSlide(activeIndex);
    slider.addEventListener("wheel", handleScroll);
    dots.forEach((dot, index) => dot.addEventListener("click", (event) => handleDotClick(event, index)));
    prevButton.addEventListener("click", () => updateActiveSlide(-1));
    nextButton.addEventListener("click", () => updateActiveSlide(1));
    observeSlides();

    // Section Observer
    const observeSections = () => {
        const sections = document.querySelectorAll(".section");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => entry.target.classList.toggle("active", entry.isIntersecting));
        }, { threshold: 0.8 });

        sections.forEach(section => observer.observe(section));
    };

    observeSections();
    navigateToHash();

    

    // Handle hash changes dynamically
    window.addEventListener("hashchange", navigateToHash);
});
