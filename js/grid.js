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
        card.dataset.state = "closed";
        card.dataset.pair = chars[i];
        const imagePromise = loadImage("https://cataas.com/cat?timestamp=" + new Date().getTime());
        card.innerHTML = "<p class='token'>"+ characterDropdown.value + "</p><img alt='' class='card-image' src=''/><p class='character'>"+chars[i]+"</p>";
        imagePromise.then(url => {
            card.querySelector('.card-image').src = url;
            console.log(url);
        })
        card.addEventListener("click", updateCardState);

        card.querySelector(".character").style.display = 'none';

        setCardState('closed', card);

        container.appendChild(card);
    }
}
