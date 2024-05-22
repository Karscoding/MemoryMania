let openedCards = [];
let maxOpenedCardsReached = false;

let firstCard = null;
let secondCard = null;

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
    generateGrid(chars, gridContainer, sizeDropdown.value);
})

function updateSize() {
    amountOfCards = getSize();
    chars = generateChars();
    resetGrid(gridContainer);
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

function checkForMatch() {
    const [firstCard, secondCard] = openedCards;

    //todo cards moeten in index.html iets krijgen waardoor ze matchen met andere cards, placeholder is checken of firstcard. innertext gelijk is aan die van secondcard wat nooit het geval zal zijn.

    if (firstCard.innerText === secondCard.innerText) {
        setCardColor('found', firstCard);
        setCardColor('found', secondCard);
    } else {
        setCardColor('closed', firstCard);
        setCardColor('closed', secondCard);
        openedCards = [];
    }
    maxOpenedCardsReached = false;
}