document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return; // If carousel-track doesn't exist, exit

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const cards = Array.from(track.children);
    if (cards.length === 0) return; // Exit if no cards are present

    const cardWidth = cards[0].offsetWidth;
    let index = 0;
    let autoplayInterval;

    // Initialize card positions
    cards.forEach((card, i) => {
        card.style.left = cardWidth * i + 'px';
    });

    function updateCarousel() {
        track.style.transform = `translateX(${-index * cardWidth}px)`;
        // Update the current card class
        cards.forEach((card, i) => {
            card.classList.toggle('current-card', i === index);
        });
    }

    function goToNextCard() {
        index = (index + 1) % cards.length; // Move to next card, loop back to first
        updateCarousel();
    }

    function goToPrevCard() {
        index = (index - 1 + cards.length) % cards.length; // Move to previous card, loop back to last
        updateCarousel();
    }

    prevButton.addEventListener('click', () => {
        goToPrevCard();
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        goToNextCard();
        resetAutoplay();
    });

    function startAutoplay() {
        autoplayInterval = setInterval(goToNextCard, 5000); // change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    // Initialize autoplay
    startAutoplay();

    // Set initial position
    updateCarousel();
});
