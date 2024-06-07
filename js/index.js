let openedCards = [];
let maxOpenedCardsReached = false;

let firstCard = null;
let secondCard = null;

let timer;
let timerCount;

let amountOfCards;
let amountOfPairsFound = 0;

let chars = [];

const winMessage = document.getElementById("win-message");

const sizeDropdown = document.getElementById("amount-dropdown");
const characterDropdown = document.getElementById("character-dropdown");

const foundCardsText = document.getElementById("found-cards");
const runningTimeText = document.getElementById("running-time");

const closedCardColor = document.getElementById("closed-card-color");
const openedCardColor = document.getElementById("opened-card-color");
const foundCardColor = document.getElementById("found-card-color");

sizeDropdown.addEventListener("change", updateSize);
characterDropdown.addEventListener("change", regenerateGrid);

closedCardColor.addEventListener("change", regenerateGrid);
openedCardColor.addEventListener("change", regenerateGrid);
foundCardColor.addEventListener("change", regenerateGrid);

// Code runs when document is loaded
document.addEventListener("DOMContentLoaded", () => {
    amountOfCards = getSize();
    chars = generateChars();
    generateGrid(chars, gridContainer, sizeDropdown.value);
})

function updateSize() {
    amountOfCards = getSize();
    regenerateGrid(gridContainer);
}

function updateCardsFoundText() {
    foundCardsText.innerText = "Gevonden kaart paren: " + amountOfPairsFound;
}

const loadImage = (url) => {
    return new Promise((resolve) => {
        fetch(url, {mode: 'cors'})
            .then((resp) => resp.blob())
            .then((blob) => {
                return URL.createObjectURL(blob);
            })
            .catch(error => {
                console.log(error);
            })
    })
}

function startTimer() {
    timerCount = 0;
    timer = setInterval(() => {
        timerCount++;
        runningTimeText.innerText = "Verlopen tijd: " + timerCount + "s";
    }, 1000)
}

function stopTimer() {
    clearInterval(timer);
}

function getSize() {
    return sizeDropdown.value * sizeDropdown.value;
}