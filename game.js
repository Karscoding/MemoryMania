let cardState = 'closed';
let openedCards = [];
let maxOpenedCardsReached = false;

function setCardStateToOpened(item) {
    if (maxOpenedCardsReached) return;
    cardState = 'opened';
    openedCards.push(item);
    cardStateChecker();
    setCardColor(item);

    if (openedCards.length === 2) {
        maxOpenedCardsReached = true
        startProgressLoader();
    }
}

function setCardStateToClosed(item) {
    cardState = 'closed';
    cardStateChecker();
    setCardColor(item);
    openedCards = [];
}

function setCardStateToFound(item) {
    cardState = 'found';
    cardStateChecker();
    setCardColor(item);
    openedCards = [];
    //todo als cards matchen call deze functie en zet ze ermee in apart array van found cards oid
}

function cardStateChecker() {
    console.log('state is:', cardState);
    // debug line om cardstates te zien in inspector
}

function setCardColor(item) {
    switch (cardState) {
        case 'closed':
            item.style.backgroundColor = getComputedStyle(document.getElementById('closed-card-button')).backgroundColor;
            break;
        case 'opened':
            item.style.backgroundColor = getComputedStyle(document.getElementById('opened-card-button')).backgroundColor;
            break;
        case 'found':
            item.style.backgroundColor = getComputedStyle(document.getElementById('found-card-button')).backgroundColor;
            break;
        default:
            console.log('geen matchende state')
            break;
    }
}

function startProgressLoader() {
    const progressLoader = document.querySelector('.progress-loader');
    const progress = document.querySelector('.progress');

    progressLoader.style.visibility = 'visible';
    progress.style.animation = 'loading_44 5s cubic-bezier(.4,1.01,1,1)';

    progress.addEventListener('animationend', () => {
        progress.style.animation = ''; //voor amimatiereset
        progress.style.width = '0%';

        openedCards.forEach(card => setCardStateToClosed(card));
        openedCards = [];

        progressLoader.style.visibility = 'hidden';
        maxOpenedCardsReached = false;
    }, { once: true });
}