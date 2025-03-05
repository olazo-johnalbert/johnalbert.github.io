function onClickMenu() {
    document.getElementById("hamburger-bar").classList.toggle("bar-change");
    document.getElementById("nav").classList.toggle("show-nav-list");
}

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slide-container");

    slider.addEventListener("wheel", function (event) {
        event.preventDefault();
        slider.scrollBy({
            left: event.deltaY * 2,
            behavior: "smooth",
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dots-indicator li")
    let activeIndex = 0; // Start at first slide

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "flex" : "none"; // Show only the active slide
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index); // Highlight the active dot
        });
    }

    // Initialize first slide
    showSlide(activeIndex);

    // Handle scrolling (optional: change on scroll)
    document.querySelector(".slide-container").addEventListener("wheel", function (event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            activeIndex = Math.min(activeIndex + 1, slides.length - 1);
        } else {
            activeIndex = Math.max(activeIndex - 1, 0);
        }
        showSlide(activeIndex);
    });

    // Handle click navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function (event) {
            event.preventDefault();
            activeIndex = index;
            showSlide(activeIndex);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dots-indicator li");
    const slideContainer = document.querySelector(".slide-container");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const activeIndex = Array.from(slides).indexOf(entry.target);
                    
                    // Update active dot
                    dots.forEach((dot, i) => {
                        dot.classList.toggle("active", i === activeIndex);
                    });
                }
            });
        },
        { threshold: 0.6 } // Adjust threshold to detect majority visibility
    );

    slides.forEach((slide) => observer.observe(slide));
});
