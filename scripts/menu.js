let isMenuOpen = false;
let isModalOpen = false;

function toggleMenu(origin) {
    isMenuOpen = !isMenuOpen

    document.getElementById("menu").className = isMenuOpen ? "open" : ""
    origin.src = "./images/icons/" + (isMenuOpen ? "x.svg" : "menu.svg")
}

function toggleModal() {
    isModalOpen = !isModalOpen
    document.getElementById("modal").className = isModalOpen ? "open" : ""
}