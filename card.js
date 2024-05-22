function updateCardState() {
    if (this === firstCard) return;
    if (firstCard === null) {
        firstCard = this;
    }

    setCardColor('opened', this);

    openedCards.push(this);
    setCardColor();

    if (openedCards.length === 1) {
        startProgressLoader();
    } else if (openedCards.length === 2) {
        maxOpenedCardsReached = true;
        stopProgressLoader();
    }
}

function cardStateChecker() {
    console.log('state is:', cardState);
    // debug line om cardstates te zien in inspector
}

function setCardColor(cardState, card) {
    switch (cardState) {
        case 'closed':
            card.style.backgroundColor = getComputedStyle(document.getElementById('closed-card-button')).backgroundColor;
            break;
        case 'opened':
            card.style.backgroundColor = getComputedStyle(document.getElementById('opened-card-button')).backgroundColor;
            break;
        case 'found':
            card.style.backgroundColor = getComputedStyle(document.getElementById('found-card-button')).backgroundColor;
            break;
        default:
            console.log('geen matchende state')
            break;
    }
}