document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = slides.length;
    let autoSlideInterval;

    // Clone slides for seamless looping
    const cloneSlides = () => {
        slides.forEach(slide => {
            track.appendChild(slide.cloneNode(true));
            track.prepend(slide.cloneNode(true));
        });
    };

    cloneSlides();

    const totalSlides = track.children.length;

    const setPosition = (index) => {
        gsap.set(track, { x: -index * slideWidth });
    };

    // Set initial position
    setPosition(currentIndex);

    const moveToSlide = (newIndex, animate = true) => {
        let targetIndex = newIndex;

        if (targetIndex < 0) {
            targetIndex = totalSlides - 1;
        } else if (targetIndex >= totalSlides) {
            targetIndex = 0;
        }

        if (animate) {
            gsap.to(track, {
                duration: 0.5,
                x: -targetIndex * slideWidth,
                ease: "power2.out",
                onComplete: () => {
                    // Adjust position if needed
                    if (targetIndex >= 2 * slides.length) {
                        targetIndex = targetIndex - slides.length;
                        setPosition(targetIndex);
                    } else if (targetIndex < slides.length) {
                        targetIndex = targetIndex + slides.length;
                        setPosition(targetIndex);
                    }
                }
            });
        } else {
            setPosition(targetIndex);
        }

        currentIndex = targetIndex;
    };

    const startAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 3000);
    };

    // GSAP draggable setup
    const dragInstance = Draggable.create(track, {
        type: "x",
        inertia: true,
        edgeResistance: 0.85,
        bounds: { minX: -slideWidth * (totalSlides - 1), maxX: 0 },
        onDrag: function() {
            // Ensure continuous scrolling
            const currentX = this.x;
            const totalWidth = slideWidth * slides.length;

            if (currentX > 0) {
                this.x = currentX - totalWidth;
            } else if (currentX < -totalWidth) {
                this.x = currentX + totalWidth;
            }
        },
        onDragEnd: function() {
            const draggedIndex = Math.round(Math.abs(this.endX) / slideWidth);
            moveToSlide(draggedIndex, true);
            startAutoSlide();
        }
    })[0];

    prevButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        moveToSlide(currentIndex - 1);
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        moveToSlide(currentIndex + 1);
        startAutoSlide();
    });

    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
});

