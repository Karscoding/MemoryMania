const closedCardColor = document.getElementById("closed-card-color");
const openedCardColor = document.getElementById("opened-card-color");
const foundCardColor = document.getElementById("found-card-color");

closedCardColor.addEventListener("change", regenerateGrid);
openedCardColor.addEventListener("change", regenerateGrid);
foundCardColor.addEventListener("change", regenerateGrid);

function sendColorPreference(id) {

}

function getPreferences(id) {
    fetch("https://localhost:8000/api/player/"+id+"/preferences").then(pref => {
        console.log(pref);
    })
}