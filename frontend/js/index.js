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
        console.log(localStorage.getItem('roles'));
        if (localStorage.getItem('roles')) {
            if (localStorage.getItem('roles') === "ROLE_USER,ROLE_ADMIN") {
                document.getElementById("admin-div-button").style.display = 'block';
            }
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

function fetchImage() {
    // We hebben geprobeerd Cat images te fetchen maar dit gaf CORS errors
    // Dog images werkte wel maar om een of andere reden werkte dat ook niet omdat de resultaat van de fetch undefined was.
    // Aan het begin van het project heeft het een tijdje gewerkt maar er is iets veranderd waardoor het niet meer werkte
    // Wij hebben ontzettend veel uren besteed om dit werkend te krijgen maar het is niet gelukt dus maken wij er dit maar van.
    fetch("https://media.discordapp.net/attachments/966786650883624990/1184279922336874526/caption.gif?ex=667567e0&is=66741660&hm=7573995a74fa76ffde7f9c842f542033fd24a6aecfc3f17b82ab6c934c59c84c&=&width=420&height=396")
        .then((response) => response.blob())
        .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            const container = document.getElementById("image-container");
            container.innerHTML = '<p id="fetch-text">Cat Images fetchen werkte niet vanwege CORS errors</p>';
            container.style.display = 'block';
            container.appendChild(imageElement);
        })
        .catch((error) => console.error(error));
}

function removeImage() {
    document.getElementById("image-container").style.display = 'none';
}

const button = document.getElementById("fetch-image-button");
button.addEventListener("click", fetchImage);