const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const cardWidth = cards[0].getBoundingClientRect().width;

cards.forEach((card, index) => {
    card.style.left = cardWidth * index + 'px';
});

const moveToCard = (track, currentCard, targetCard) => {
    track.style.transform = 'translateX(-' + targetCard.style.left + ')';
    currentCard.classList.remove('current-card');
    targetCard.classList.add('current-card');
}

prevButton.addEventListener('click', e => {
    const currentCard = track.querySelector('.current-card');
    const prevCard = currentCard.previousElementSibling;

    if (prevCard) {
        moveToCard(track, currentCard, prevCard);
    }
});

nextButton.addEventListener('click', e => {
    const currentCard = track.querySelector('.current-card');
    const nextCard = currentCard.nextElementSibling;

    if (nextCard) {
        moveToCard(track, currentCard, nextCard);
    }
});

document.querySelector('.carousel-card').classList.add('current-card');
