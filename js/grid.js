// Elements
const gridContainer = document.getElementById("grid-container");


// Functions
function resetGrid(container) {
    container.innerHTML = "";
}

function regenerateGrid(container) {
    chars = generateChars();
    resetGrid(gridContainer);
    generateGrid(chars, gridContainer, sizeDropdown.value);
}

function generateGrid(chars, container, amount) {
    resetGrid(container);
    generateDivs(chars, container);
    shuffleArray(chars);
    generateDivs(chars, container);

    container.style.setProperty('grid-template-columns', 'repeat(' + amount + ', 1fr');
}

function generateDivs(chars, container) {
    for (let i = 0; i < chars.length; i++) {
        let card = document.createElement("div");
        card.className = "grid-item closed";
        card.innerHTML = "<p class='token'>"+ characterDropdown.value + "</p><p class='character'>"+chars[i]+"</p>";
        card.addEventListener("click", updateCardState);

        card.querySelector(".character").style.display = 'none';

        setCardState('closed', card);

        container.appendChild(card);
    }
}
