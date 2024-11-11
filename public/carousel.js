const carouselTrack = document.querySelector('.carousel-track');
const carouselCards = document.querySelectorAll('.carousel-card');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let cardWidth = carouselCards[0].offsetWidth;
let totalCards = carouselCards.length;
let currentIndex = 0;
let isTransitioning = false;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// clone cards for infinite scroll
carouselCards.forEach((card) => {
  const clone = card.cloneNode(true);
  carouselTrack.appendChild(clone);
});

// update card width on resize
window.addEventListener('resize', () => {
  cardWidth = carouselCards[0].offsetWidth;
  goToCard(currentIndex, false);
});

// scroll to a specific card
function goToCard(index, animate = true) {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex = index;

  if (animate) {
    carouselTrack.style.transition = 'transform 2s ease';
  } else {
    carouselTrack.style.transition = 'none';
  }

  carouselTrack.style.transform = `translateX(${-index * cardWidth}px)`;

  if (index >= totalCards) {
    setTimeout(() => {
      carouselTrack.style.transition = 'none';
      currentIndex = 0;
      carouselTrack.style.transform = `translateX(0)`;
    }, 2000);
  } else if (index < 0) {
    setTimeout(() => {
      carouselTrack.style.transition = 'none';
      currentIndex = totalCards - 1;
      carouselTrack.style.transform = `translateX(${-(totalCards - 1) * cardWidth}px)`;
    }, 2000);
  }

  setTimeout(() => {
    isTransitioning = false;
  }, 2000);
}

// next button click
nextButton.addEventListener('click', () => {
  goToCard(currentIndex + 1);
});

// previous button click
prevButton.addEventListener('click', () => {
  goToCard(currentIndex - 1);
});

// drag to scroll functionality
function dragStart(e) {
  if (e.type === 'touchstart') {
    startPos = e.touches[0].clientX;
  } else {
    startPos = e.clientX;
    e.preventDefault(); // prevent text selection
    carouselTrack.style.cursor = 'grabbing';
  }
  
  isDragging = true;
  animationID = requestAnimationFrame(animation);
}

function dragMove(e) {
  if (!isDragging) return;
  
  let currentPosition;
  if (e.type === 'touchmove') {
    currentPosition = e.touches[0].clientX;
  } else {
    currentPosition = e.clientX;
  }

  currentTranslate = prevTranslate + currentPosition - startPos;
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  carouselTrack.style.cursor = 'grab';

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -cardWidth / 4 && currentIndex < totalCards - 1) {
    currentIndex += 1;
  } else if (movedBy > cardWidth / 4 && currentIndex > 0) {
    currentIndex -= 1;
  }

  goToCard(currentIndex);
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

carouselTrack.addEventListener('touchstart', dragStart);
carouselTrack.addEventListener('touchmove', dragMove);
carouselTrack.addEventListener('touchend', dragEnd);
carouselTrack.addEventListener('mousedown', dragStart);
carouselTrack.addEventListener('mousemove', dragMove);
carouselTrack.addEventListener('mouseup', dragEnd);
carouselTrack.addEventListener('mouseleave', dragEnd);

// prevent context menu on long press
carouselTrack.addEventListener('contextmenu', (e) => e.preventDefault());

// auto-scroll functionality
let timeoutId;

function startAutoScroll() {
  stopAutoScroll();
  timeoutId = setInterval(() => {
    goToCard(currentIndex + 1);
  }, 8000);
}

function stopAutoScroll() {
  clearInterval(timeoutId);
}

carouselTrack.addEventListener('mouseenter', stopAutoScroll);
carouselTrack.addEventListener('mouseleave', startAutoScroll);

startAutoScroll();