// ==========================================
// SCREEN NAVIGATION
// ==========================================

const screens =
    document.querySelectorAll(".screen");

const navigationButtons =
    document.querySelectorAll("[data-screen]");

const openPlayButton =
    document.getElementById("open-play-button");

const openTutorialButton =
    document.getElementById("open-tutorial-button");

const openPracticeButton =
    document.getElementById("open-practice-button");


function showScreen(screenId) {
    for (const screen of screens) {
        screen.classList.remove("active-screen");
    }

    const selectedScreen =
        document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active-screen");
    }

    window.scrollTo(0, 0);
}


openPlayButton.addEventListener("click", () => {
    showScreen("play-screen");
});


openTutorialButton.addEventListener("click", () => {
    currentTutorialStep = 0;
    renderTutorialStep();

    showScreen("tutorial-screen");
});


openPracticeButton.addEventListener("click", () => {
    resetPracticeRound();

    showScreen("practice-screen");
});


for (const button of navigationButtons) {
    button.addEventListener("click", () => {
        showScreen(button.dataset.screen);
    });
}
