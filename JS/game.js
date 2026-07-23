// ==========================================
// EQUATION ARENA
// MAIN GAME CONTROLLER
// ==========================================


// ==========================================
// DIFFICULTY DOM ELEMENTS
// ==========================================

const difficultySelect =
    document.getElementById(
        "difficulty"
    );

const aiCountSelect =
    document.getElementById(
        "ai-count"
    );

const difficultyDescription =
    document.getElementById(
        "difficulty-description"
    );

const rewardPointsDisplay =
    document.getElementById(
        "reward-points"
    );

const startGameButton =
    document.getElementById(
        "start-game-button"
    );


// ==========================================
// DIFFICULTY DISPLAY
// ==========================================

function updateDifficultyInformation() {
    const selectedDifficulty =
        DIFFICULTIES[
            difficultySelect.value
        ];

    difficultyDescription.textContent =
        selectedDifficulty.description;

    rewardPointsDisplay.textContent =
        selectedDifficulty.reward;
}


// ==========================================
// DEAL BUTTON
// ==========================================

function resetDealButton() {
    dealButton.disabled = false;

    dealButton.textContent =
        "Deal Cards";
}


// ==========================================
// GAME START
// ==========================================

function startGame() {
    const selectedDifficulty =
        difficultySelect.value;

    const selectedAiCount =
        Number(
            aiCountSelect.value
        );

    gameState = {
        difficulty:
            selectedDifficulty,

        round: 1,

        pot: 0,

        deck:
            shuffleDeck(
                createDeck()
            ),

        discardPile: [],

        players:
            createPlayers(
                selectedAiCount,
                selectedDifficulty
            ),

        cardsDealt: false,

        phase: "ante",

        eventMessages: [],

        currentBet: 0,

        currentPlayerIndex: 0,

        bettingStarted: false,

        bettingRoundComplete: false,

        playersWhoActed: []
    };

    resetDealButton();

    clearGameMessages();

    takeAnte();

    gameState.phase =
        "waiting-for-deal";

    gameDifficultyDisplay.textContent =
        DIFFICULTIES[
            selectedDifficulty
        ].name;

    renderGame();

    addGameMessage(
        "Every active player paid a one-chip ante."
    );

    addGameMessage(
        "Press Deal Cards to begin the round."
    );

    showScreen(
        "game-screen"
    );
}


// ==========================================
// DEAL BUTTON ACTION
// ==========================================

function handleDealButton() {
    try {
        if (
            gameState.phase ===
            "waiting-for-deal"
        ) {
            dealInitialCards();

            return;
        }

        if (
            gameState.phase ===
            "final-card"
        ) {
            dealFinalOpenCards();

            return;
        }

        addGameMessage(
            "Cards cannot be dealt during the current phase."
        );
    } catch (error) {
        console.error(error);

        addGameMessage(
            "The cards could not be dealt. Check the browser console for details."
        );
    }
}


// ==========================================
// BETTING BUTTON ACTIONS
// ==========================================

function handleHumanPass() {
    const player =
        getCurrentPlayer();

    if (player?.isHuman) {
        handlePass(player);
    }
}


function handleHumanCall() {
    const player =
        getCurrentPlayer();

    if (player?.isHuman) {
        handleCall(player);
    }
}


function handleHumanRaise() {
    const player =
        getCurrentPlayer();

    if (player?.isHuman) {
        handleRaise(player);
    }
}


function handleHumanFold() {
    const player =
        getCurrentPlayer();

    if (player?.isHuman) {
        handleFold(player);
    }
}


// ==========================================
// EVENT LISTENERS
// ==========================================

difficultySelect.addEventListener(
    "change",
    updateDifficultyInformation
);


startGameButton.addEventListener(
    "click",
    startGame
);


dealButton.addEventListener(
    "click",
    handleDealButton
);


passButton.addEventListener(
    "click",
    handleHumanPass
);


callButton.addEventListener(
    "click",
    handleHumanCall
);


raiseButton.addEventListener(
    "click",
    handleHumanRaise
);


foldButton.addEventListener(
    "click",
    handleHumanFold
);


// ==========================================
// INITIAL SETUP
// ==========================================

updateDifficultyInformation();

renderTutorialStep();

resetPracticeRound();