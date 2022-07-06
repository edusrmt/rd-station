let cardIndex = 1;
initCardsHeight()
updateCards()

function initCardsHeight() {
    let cards = document.getElementsByClassName("card");

    let i;
    let maxHeight = 0;
    for (i = 0; i < cards.length; i++) {
        if (cards[i].clientHeight > maxHeight) {
            maxHeight = cards[i].clientHeight
        }
    }

    for (i = 0; i < cards.length; i++) {
        cards[i].style.height = maxHeight.toString() + "px"
    }
}

function updateCards() {
    let cards = document.getElementsByClassName("card");
    let dots = document.getElementsByClassName("dot");
    
    if (cardIndex > cards.length) {
        cardIndex = 1
    }

    let i;
    for (i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    cards[cardIndex - 1].style.display = "block";
    dots[cardIndex - 1].className += " active-dot";
    cardIndex++;
}

function selectCard(index) {
    cardIndex = index
    updateCards()
}