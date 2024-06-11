function generatePairs() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = [];
    for (let i = 0; i < amountOfCards / 2; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        if (result.includes(char)) {
            i--;
        } else {

            loadImage("https://cataas.com/cat?timestamp=" + new Date().getTime())
                .then(objectUrl => {
                    let array = {Character: char, imageUrl: ""};
                    array.imageUrl = objectUrl;
                    console.log("BLOB:" +array.imageUrl);
                    console.log("BLOB RESULT: "+ array.imageUrl);
                    result.push(array);
                });
        }
    }
    console.log(result);
    return result;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkForWin() {

}

function checkIfAllFound() {
    return amountOfPairsFound === amountOfCards / 2;
}

function displayWin() {
    stopTimer();
    winMessage.getElementsByClassName("win-text")[0].innerText = "Tijd: " +  timerCount + "s";
    winMessage.style.display = "block";
}

function restart() {
    stopTimer();
    winMessage.style.display = "none";
    location.reload();
}