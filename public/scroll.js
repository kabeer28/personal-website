document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');

    const slideWidth = slides[0].getBoundingClientRect().width;

    // arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        }
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        }
    });

    // auto-cycle through slides
    let autoSlideInterval = setInterval(() => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(track, currentSlide, nextSlide);
    }, 3000); // Change slide every 3 seconds

    // pause auto-cycle on hover
    track.addEventListener('mouseover', stopAutoSlide);
    track.addEventListener('mouseout', startAutoSlide);

    track.addEventListener('mouseout', () => {
        autoSlideInterval = setInterval(() => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            moveToSlide(track, currentSlide, nextSlide);
        }, 3000); // change slide every 3 seconds
    });

    // implement draggable scrolling
    gsap.registerPlugin(Draggable);
    Draggable.create(track, {
        type: "x",
        bounds: {minX: -((slides.length - 1) * slideWidth), maxX: 0},
        inertia: true,
        edgeResistance: 1,
        onDrag: function() {
            gsap.to(track, {duration: 0.5, x: this.x});
        },
        onThrowUpdate: function() {
            gsap.to(track, {duration: 0.5, x: this.x});
        },
        onDragEnd: function() {
            let closestIndex = Math.round(this.x / -slideWidth);
            closestIndex = Math.max(0, Math.min(closestIndex, slides.length - 1));
            const targetSlide = slides[closestIndex];
            moveToSlide(track, track.querySelector('.current-slide'), targetSlide);
        }
    });
});
