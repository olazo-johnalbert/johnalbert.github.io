document.addEventListener('DOMContentLoaded', () => {
    const carouselWrappers = document.querySelectorAll('[id^="project"] .carousel-wrapper');
    
    carouselWrappers.forEach(wrapper => {
        const items = wrapper.querySelectorAll('.carousel-card-item');
        const totalItems = items.length;
        if (totalItems === 0) return;

        // Get dimensions with margins
        const itemStyle = getComputedStyle(items[0]);
        const itemWidth = items[0].offsetWidth;
        const itemMargin = parseFloat(itemStyle.marginRight) || 0;
        const effectiveItemWidth = itemWidth + itemMargin;
        
        const wrapperWidth = wrapper.offsetWidth;
        const totalTravelDistance = wrapperWidth + effectiveItemWidth;

        // Set animation speed (pixels per second)
        const pixelsPerSecond = 50; // Adjust this value to control speed
        const scrollDuration = totalTravelDistance / pixelsPerSecond;
        const delayBetweenItems = effectiveItemWidth / pixelsPerSecond;

        // Set CSS custom properties
        wrapper.style.setProperty('--scroll-duration', `${scrollDuration}s`);
        wrapper.style.setProperty('--item-width', `${itemWidth}px`);
        wrapper.style.setProperty('--item-margin', `${itemMargin}px`);

        // Apply staggered delays
        items.forEach((item, index) => {
            const delay = index * delayBetweenItems * -1;
            item.style.animationDelay = `${delay}s`;
        });
    });
});