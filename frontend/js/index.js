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

const connectionText = document.getElementById("connection-test");

const scores = fetch("http://localhost:8000/scores").then(scores => {
    if (scores.ok) {
        connectionText.innerText = "Backend Connected";
    }
});

sizeDropdown.addEventListener("change", updateSize);
characterDropdown.addEventListener("change", regenerateGrid);

// Code runs when document is loaded
document.addEventListener("DOMContentLoaded", () => {
    if (isAuthenticated()) {
        document.getElementById("auth-div-button").style.display = 'none';
        document.getElementById("logout-div-button").style.display = 'block';
        document.getElementById("settings-div-button").style.display = 'block';
        if (isTokenExpired()) {
            alert("Expired Token");
            navigateToLogin();
        }
        getPreferences().then(preferences => {
            localStorage.setItem('color_found', preferences.color_found);
            localStorage.setItem('color_closed', preferences.color_closed);
            localStorage.setItem('api_choice', preferences.preferred_api);
            amountOfCards = getSize();
            chars = generateChars();
            generateGrid(chars, gridContainer, sizeDropdown.value);
        });
    } else {
        document.getElementById("auth-div-button").style.display = 'block';
        document.getElementById("logout-div-button").style.display = 'none';
        document.getElementById("settings-div-button").style.display = 'none';
        amountOfCards = getSize();
        chars = generateChars();
        generateGrid(chars, gridContainer, sizeDropdown.value);
    }
})

function updateSize() {
    amountOfCards = getSize();
    regenerateGrid(gridContainer);
}

function updateCardsFoundText() {
    foundCardsText.innerText = "Gevonden kaart paren: " + amountOfPairsFound;
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

function navigateToSettings() {
    if (isAuthenticated()) {
        window.location.href = '../settings.html';
    }
}

function navigateToLogin() {
    window.location.href = 'login.html';
}

function isAuthenticated() {
    return !!localStorage.getItem('user_id');
}

function isTokenExpired() {
    return Date.now() >= localStorage.getItem("exp") * 1000;
}