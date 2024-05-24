function updateCardState() {
    if (!timer) {
        startTimer();
    }
    if (this === firstCard) return;
    if (firstCard === null) {
        firstCard = this;
    } else {
        secondCard = this;
    }

    setCardState('opened', this);

    openedCards.push(this);

    if (openedCards.length === 1) {
        startProgressLoader();
    } else if (openedCards.length === 2) {
        maxOpenedCardsReached = true;
        stopProgressLoader();
        checkForMatch();
    }
}

function cardStateChecker() {
    console.log('state is:', cardState);
    // debug line om cardstates te zien in inspector
}

function setCardState(cardState, card) {
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

function checkForMatch() {
    if (firstCard.innerText === secondCard.innerText) {
        setCardState('found', firstCard);
        setCardState('found', secondCard);
        amountOfPairsFound++;
        updateCardsFoundText();
    } else {
        setCardState('closed', firstCard);
        setCardState('closed', secondCard);
    }
    openedCards = [];
    firstCard = null;
    secondCard = null;
    maxOpenedCardsReached = false;
    if (checkIfAllFound()) {
        displayWin();
    }
}