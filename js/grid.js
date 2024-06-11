// Elements
const gridContainer = document.getElementById("grid-container");


// Functions
function resetGrid(container) {
    container.innerHTML = "";
}

function regenerateGrid(container) {
    chars = generatePairs();
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
    chars.forEach(pair => {
        console.log(pair.Character);
        let card = document.createElement("div");
        card.className = "grid-item closed";
        card.dataset.state = "closed";
        card.dataset.pair = pair.Character;
        console.log(pair);
        console.log(pair.imageUrl);
        card.innerHTML = `
                <p class='token'>${characterDropdown.value}</p>
                <img alt='' class='card-image' src="${pair.imageUrl}" />
                <p class='character'>${pair.Character}</p>
            `;
        card.querySelector(".character").style.display = 'none';

        card.addEventListener("click", updateCardState);

        setCardState('closed', card);

        container.appendChild(card);
    });
}
