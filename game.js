let cardState = 'closed';
let openedCards = [];
let maxOpenedCardsReached = false;

let amountOfCards;

let chars = [];

const gridContainer = document.getElementById("grid-container");

const sizeDropdown = document.getElementById("amount-dropdown");
const characterDropdown = document.getElementById("character-dropdown");

sizeDropdown.addEventListener("change", updateSize);


// Code runs when document is loaded
document.addEventListener("DOMContentLoaded", () => {
    amountOfCards = getSize();
    chars = generateChars();
    generateGrid(chars, gridContainer);
})

function resetGrid() {
    gridContainer.innerHTML = "";
}

function generateGrid(chars, container) {
    resetGrid();
    generateDivs(chars, container);
    shuffleArray(chars);
    generateDivs(chars, container);
}

function generateDivs(chars, container) {
    for (let i = 0; i < chars.length; i++) {
        let card = document.createElement("div");
        card.className = "grid-item";
        card.innerHTML = "<p>"+chars[i]+"</p>";
        container.appendChild(card);
    }
}

function updateSize() {
    amountOfCards = getSize();
    resetGrid();
    generateGrid(chars, gridContainer);
}

function getSize() {
    return sizeDropdown.value * sizeDropdown.value;
}

function generateChars() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = [];
    for (let i = 0; i < amountOfCards / 2; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        if (result.includes(char)) {
            i--;
        } else {
            result[i] = char;
        }
    }
    return result;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setCardStateToOpened(item) {
    cardState = 'opened';
    openedCards.push(item);
    cardStateChecker();
    setCardColor(item);

    if (openedCards.length === 1) {
        startProgressLoader();
    } else if (openedCards.length === 2) {
        maxOpenedCardsReached = true
        stopProgressLoader()
        //todo call hier de match functie
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

function checkForMatch() {
    const [firstCard, secondCard] = openedCards;

    //todo cards moeten in index.html iets krijgen waardoor ze matchen met andere cards, placeholder is checken of firstcard. innertext gelijk is aan die van secondcard wat nooit het geval zal zijn.

    if (firstCard.innerText === secondCard.innerText) {
        setCardStateToFound(firstCard);
        setCardStateToFound(secondCard);
    } else {
        setCardStateToClosed(firstCard);
        setCardStateToClosed(secondCard);
        openedCards = [];
    }
    maxOpenedCardsReached = false;
}