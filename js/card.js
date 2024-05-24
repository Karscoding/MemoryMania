function updateCardState() {
    if (getCardState(this) === 'found') {
        return;
    }

    if (progressRunning) {
        closeOpenedCards();
    }

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

    if (openedCards.length === 2) {
        maxOpenedCardsReached = true;
        stopProgressLoader();
        checkForMatch();
    }
}

function closeOpenedCards() {
    stopProgressLoader();
    progress.style.animation = ''; //voor amimatiereset
    progress.style.width = '0%';

    openedCards.forEach(card => setCardState('closed', card));
    openedCards = [];

    progressLoader.style.visibility = 'hidden';
    maxOpenedCardsReached = false;
}

function getCardState(card) {
    return card.className.split(' ')[1];
}

function setCardState(cardState, card) {
    switch (cardState) {
        case 'closed':
            makeCardInvisible(card);
            card.style.backgroundColor = closedCardColor.value;
            break;
        case 'opened':
            makeCardVisible(card);
            card.style.backgroundColor = openedCardColor.value;
            break;
        case 'found':
            card.style.backgroundColor = foundCardColor.value;
            break;
        default:
            console.log('geen matchende state')
            break;
    }
    card.className = "grid-item " + cardState;
}

function makeCardVisible(card) {
    card.querySelector(".character").style.display = "block";
    card.querySelector(".token").style.display = "none";
}

function makeCardInvisible(card) {
    card.querySelector(".character").style.display = "none";
    card.querySelector(".token").style.display = "block";
}

function checkForMatch() {
    if (firstCard.innerText === secondCard.innerText) {
        setCardState('found', firstCard);
        setCardState('found', secondCard);
        amountOfPairsFound++;
        updateCardsFoundText();
        openedCards = [];
    } else {
        startProgressLoader();
    }

    firstCard = null;
    secondCard = null;
    maxOpenedCardsReached = false;

    if (checkIfAllFound()) {
        displayWin();
    }
}