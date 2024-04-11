function openMenuItem(item) {
    const currentlyOpened = document.querySelector(".show")
    const newToOpen = document.querySelector("#menuItem" + item)
    if (currentlyOpened) {
        if (newToOpen.classList.contains("show")) {
            currentlyOpened.classList.remove("show")
        } else {
            currentlyOpened.classList.remove("show")
            newToOpen.classList.toggle("show")
        }
    } else if (!currentlyOpened) {
        newToOpen.classList.toggle("show");
    }
}

function closeMenu() {
    //const test = document.getElementById('closeMenuButton')
    const openedMenu = document.querySelector('.show')
    if (openedMenu) {
        openedMenu.classList.remove("show")
    }
}