function resetGrid(container) {
    container.innerHTML = "";
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
        card.className = "grid-item";
        card.innerHTML = "<p>"+chars[i]+"</p>";
        card.addEventListener("click", updateCardState);
        setCardColor('closed', card);
        container.appendChild(card);
    }
}
