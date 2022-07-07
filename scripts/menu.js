let isMenuOpen = false;
let isDropdownOpen = false;
let isModalOpen = false;

function toggleMenu(origin) {
    isMenuOpen = !isMenuOpen

    document.getElementById("menu").className = isMenuOpen ? "open" : ""
    origin.src = "./images/icons/" + (isMenuOpen ? "x.svg" : "menu.svg")
}

function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen
    document.getElementById("dropdown").className = isDropdownOpen ? "open" : ""
}

function toggleModal() {
    isModalOpen = !isModalOpen
    document.getElementById("modal").className = isModalOpen ? "open" : ""
}