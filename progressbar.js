function startProgressLoader() {
    const progressLoader = document.querySelector('.progress-loader');
    const progress = document.querySelector('.progress');

    progressLoader.style.visibility = 'visible';
    progress.style.animation = 'loading_44 5s cubic-bezier(.4,1.01,1,1)';

    progress.addEventListener('animationend', () => {
        progress.style.animation = ''; //voor amimatiereset
        progress.style.width = '0%';

        openedCards.forEach(card => setCardColor('closed', card));
        openedCards = [];

        progressLoader.style.visibility = 'hidden';
        maxOpenedCardsReached = false;
    }, {once: true});
}

function stopProgressLoader() {
    const progressLoader = document.querySelector('.progress-loader');
    const progress = document.querySelector('.progress');
    progress.style.animation = '';
    progress.style.width = '0%';
    progressLoader.style.visibility = 'hidden';
    checkForMatch()
}