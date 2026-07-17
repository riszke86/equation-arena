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


// ==========================================
// DIFFICULTY SETUP
// ==========================================

const difficultySelect =
    document.getElementById("difficulty");

const aiCountSelect =
    document.getElementById("ai-count");

const difficultyDescription =
    document.getElementById(
        "difficulty-description"
    );

const rewardPointsDisplay =
    document.getElementById("reward-points");

const startGameButton =
    document.getElementById("start-game-button");


const DIFFICULTIES = {
    "very-easy": {
        name: "Very Easy",
        reward: 1,
        description:
            "The computer makes frequent mistakes."
    },

    easy: {
        name: "Easy",
        reward: 2,
        description:
            "The computer understands simple equations."
    },

    medium: {
        name: "Medium",
        reward: 3,
        description:
            "The computer understands basic strategy but may still make mistakes."
    },

    hard: {
        name: "Hard",
        reward: 5,
        description:
            "The computer makes careful decisions."
    },

    expert: {
        name: "Expert",
        reward: 8,
        description:
            "The computer searches for strong equations and rarely makes mistakes."
    }
};


function updateDifficultyInformation() {
    const difficulty =
        DIFFICULTIES[difficultySelect.value];

    difficultyDescription.textContent =
        difficulty.description;

    rewardPointsDisplay.textContent =
        difficulty.reward;
}


difficultySelect.addEventListener(
    "change",
    updateDifficultyInformation
);


// ==========================================
// TUTORIAL
// ==========================================

const tutorialContent =
    document.getElementById("tutorial-content");

const tutorialStepNumber =
    document.getElementById(
        "tutorial-step-number"
    );

const tutorialProgressBar =
    document.getElementById(
        "tutorial-progress-bar"
    );

const tutorialBackButton =
    document.getElementById(
        "tutorial-back-button"
    );

const tutorialNextButton =
    document.getElementById(
        "tutorial-next-button"
    );


let currentTutorialStep = 0;


const tutorialSteps = [
    {
        title: "Welcome to Equation Arena",

        content: `
            <p>
                Create equations and try to reach a result
                close to either 1 or 20.
            </p>

            <p>
                The game combines mathematics, betting and
                strategy.
            </p>
        `
    },

    {
        title: "Your Objective",

        content: `
            <div class="tutorial-choice">
                High: close to 20
            </div>

            <div class="tutorial-choice">
                Low: close to 1
            </div>

            <p>
                A result of 19 is strong for High.
            </p>

            <p>
                A result of 1 is perfect for Low.
            </p>
        `
    },

    {
        title: "Number Cards",

        content: `
            <p>
                Number cards contain values from 0 to 10.
            </p>

            <div class="tutorial-row">

                <span class="tutorial-card gold">
                    Gold
                </span>

                <span class="tutorial-card silver">
                    Silver
                </span>

                <span class="tutorial-card bronze">
                    Bronze
                </span>

                <span class="tutorial-card dirt">
                    Dirt
                </span>

            </div>

            <p>
                Gold ranks highest, followed by Silver,
                Bronze and Dirt.
            </p>
        `
    },

    {
        title: "Starting Symbols",

        content: `
            <p>
                Every player begins with three symbol cards.
            </p>

            <div class="tutorial-row">

                <span class="tutorial-symbol">
                    +
                </span>

                <span class="tutorial-symbol">
                    −
                </span>

                <span class="tutorial-symbol">
                    ÷
                </span>

            </div>

            <p>
                These are addition, subtraction and division.
            </p>
        `
    },

    {
        title: "Special Symbols",

        content: `
            <p>
                Two special symbols may be drawn from the deck.
            </p>

            <div class="tutorial-row">

                <span class="tutorial-symbol special-symbol">
                    ×
                </span>

                <span class="tutorial-symbol special-symbol">
                    √
                </span>

            </div>

            <p>
                Multiplication and square root are not given
                automatically.
            </p>
        `
    },

    {
        title: "Square Root",

        content: `
            <p>
                When you draw a square-root card openly, you
                keep it and receive another number card.
            </p>

            <div class="tutorial-row">

                <span class="tutorial-symbol">
                    √
                </span>

                <span class="tutorial-symbol">
                    9
                </span>

                <span class="tutorial-symbol">
                    =
                </span>

                <span class="tutorial-symbol">
                    3
                </span>

            </div>

            <p>
                Square root may only be applied to one number.
            </p>
        `
    },

    {
        title: "Multiplication",

        content: `
            <p>
                When multiplication is drawn openly, you keep it
                and receive another number card.
            </p>

            <p>
                You must discard addition, subtraction or another
                multiplication symbol.
            </p>

            <p>
                Division cannot be discarded.
            </p>
        `
    },

    {
        title: "The Deal",

        content: `
            <p>
                Every player receives one hidden number card
                and two open-card draws.
            </p>

            <p>
                After the first betting phase, each active player
                receives one more open card.
            </p>
        `
    },

    {
        title: "Betting",

        content: `
            <p>
                Every player pays a one-chip ante.
            </p>

            <p>
                During betting, players may Call, Raise or Fold.
            </p>

            <p>
                Players may pass only before someone starts betting.
            </p>
        `
    },

    {
        title: "High, Low and Swing",

        content: `
            <p>
                Choose High for a result close to 20.
            </p>

            <p>
                Choose Low for a result close to 1.
            </p>

            <p>
                Swing requires two arrangements using the same
                cards: one for High and one for Low.
            </p>

            <p>
                A Swing player must win both sides.
            </p>
        `
    }
];


function renderTutorialStep() {
    const step =
        tutorialSteps[currentTutorialStep];

    tutorialStepNumber.textContent =
        `Step ${currentTutorialStep + 1} of ${tutorialSteps.length}`;

    tutorialContent.innerHTML = `
        <h2>${step.title}</h2>
        ${step.content}
    `;

    const progress =
        (
            (currentTutorialStep + 1) /
            tutorialSteps.length
        ) * 100;

    tutorialProgressBar.style.width =
        `${progress}%`;

    tutorialBackButton.disabled =
        currentTutorialStep === 0;

    tutorialNextButton.textContent =
        currentTutorialStep ===
        tutorialSteps.length - 1
            ? "Start Practice"
            : "Next";
}


tutorialBackButton.addEventListener(
    "click",
    () => {
        if (currentTutorialStep > 0) {
            currentTutorialStep--;

            renderTutorialStep();
        }
    }
);


tutorialNextButton.addEventListener(
    "click",
    () => {
        if (
            currentTutorialStep <
            tutorialSteps.length - 1
        ) {
            currentTutorialStep++;

            renderTutorialStep();
        } else {
            resetPracticeRound();

            showScreen("practice-screen");
        }
    }
);


// ==========================================
// PRACTICE ROUND
// ==========================================

const startPracticeButton =
    document.getElementById(
        "start-practice-button"
    );

const leavePracticeButton =
    document.getElementById(
        "leave-practice-button"
    );

const practiceGuideTitle =
    document.getElementById(
        "practice-guide-title"
    );

const practiceGuideMessage =
    document.getElementById(
        "practice-guide-message"
    );

const practiceStepNumber =
    document.getElementById(
        "practice-step-number"
    );

const practiceTotalSteps =
    document.getElementById(
        "practice-total-steps"
    );

const practicePlayerChips =
    document.getElementById(
        "practice-player-chips"
    );

const practicePot =
    document.getElementById(
        "practice-pot"
    );

const practiceTarget =
    document.getElementById(
        "practice-target"
    );

const practiceEquationDisplay =
    document.getElementById(
        "practice-equation-display"
    );

const practiceResult =
    document.getElementById(
        "practice-result"
    );

const practiceHighButton =
    document.getElementById(
        "practice-high-button"
    );

const practiceLowButton =
    document.getElementById(
        "practice-low-button"
    );

const practiceUndoButton =
    document.getElementById(
        "practice-undo-button"
    );

const practiceResetButton =
    document.getElementById(
        "practice-reset-button"
    );

const practiceSubmitButton =
    document.getElementById(
        "practice-submit-button"
    );

const practiceFeedback =
    document.getElementById(
        "practice-feedback"
    );

const practiceTokens =
    document.querySelectorAll(
        ".practice-token"
    );


const PRACTICE_SOLUTION = [
    "10",
    "÷",
    "2",
    "−",
    "8",
    "+",
    "4"
];


const PRACTICE_GUIDE = [
    {
        title: "Pay the Ante",
        message:
            "Press Start Practice. You and the Training Bot will each pay one chip."
    },

    {
        title: "Choose Your Hidden Card",
        message:
            "Click the highlighted Gold 10."
    },

    {
        title: "Use Division",
        message:
            "Click the highlighted division symbol."
    },

    {
        title: "Choose Number 2",
        message:
            "Click the highlighted Silver 2."
    },

    {
        title: "Complete the Equation",
        message:
            "Continue using the highlighted cards and symbols."
    },

    {
        title: "Choose Low",
        message:
            "The equation equals 1. Choose the Low marker."
    },

    {
        title: "Submit",
        message:
            "Press Submit Equation to complete the practice round."
    }
];


let practiceState;


function createPracticeState() {
    return {
        started: false,
        completed: false,
        chips: 10,
        pot: 0,
        step: 0,
        equation: [],
        target: null
    };
}


function resetPracticeRound() {
    practiceState =
        createPracticeState();

    practicePlayerChips.textContent = "10";
    practicePot.textContent = "0";
    practiceTarget.textContent =
        "Not selected";

    practiceResult.textContent = "—";

    practiceEquationDisplay.innerHTML = `
        <span class="placeholder">
            Select your cards
        </span>
    `;

    for (const token of practiceTokens) {
        token.disabled = true;

        token.classList.remove(
            "used",
            "expected-token"
        );
    }

    practiceHighButton.disabled = true;
    practiceLowButton.disabled = true;

    practiceHighButton.classList.remove(
        "selected"
    );

    practiceLowButton.classList.remove(
        "selected"
    );

    practiceUndoButton.disabled = true;
    practiceResetButton.disabled = true;
    practiceSubmitButton.disabled = true;

    startPracticeButton.disabled = false;
    startPracticeButton.textContent =
        "Start Practice";

    clearPracticeFeedback();
    updatePracticeGuide();
}


function startPracticeRound() {
    resetPracticeRound();

    practiceState.started = true;
    practiceState.step = 1;

    practiceState.chips = 9;
    practiceState.pot = 2;

    practicePlayerChips.textContent = "9";
    practicePot.textContent = "2";

    startPracticeButton.disabled = true;
    startPracticeButton.textContent =
        "Practice Started";

    practiceUndoButton.disabled = false;
    practiceResetButton.disabled = false;

    showPracticeFeedback(
        "You paid one chip. The Training Bot paid one chip.",
        "information"
    );

    updatePracticeGuide();
    enableNextPracticeToken();
}


function updatePracticeGuide() {
    const guideIndex =
        Math.min(
            practiceState.step,
            PRACTICE_GUIDE.length - 1
        );

    const guide =
        PRACTICE_GUIDE[guideIndex];

    practiceGuideTitle.textContent =
        guide.title;

    practiceGuideMessage.textContent =
        guide.message;

    practiceStepNumber.textContent =
        guideIndex + 1;

    practiceTotalSteps.textContent =
        PRACTICE_GUIDE.length;
}


function enableNextPracticeToken() {
    for (const token of practiceTokens) {
        token.classList.remove(
            "expected-token"
        );

        if (
            !token.classList.contains("used")
        ) {
            token.disabled = true;
        }
    }

    if (
        practiceState.equation.length ===
        PRACTICE_SOLUTION.length
    ) {
        practiceHighButton.disabled = false;
        practiceLowButton.disabled = false;

        practiceState.step = 5;

        updatePracticeGuide();

        return;
    }

    const expected =
        PRACTICE_SOLUTION[
            practiceState.equation.length
        ];

    const matchingToken =
        Array.from(practiceTokens).find(
            token =>
                token.dataset.token ===
                    expected &&
                !token.classList.contains(
                    "used"
                )
        );

    if (matchingToken) {
        matchingToken.disabled = false;

        matchingToken.classList.add(
            "expected-token"
        );
    }
}


function handlePracticeToken(event) {
    if (
        !practiceState.started ||
        practiceState.completed
    ) {
        return;
    }

    const selectedToken =
        event.currentTarget;

    const value =
        selectedToken.dataset.token;

    const expected =
        PRACTICE_SOLUTION[
            practiceState.equation.length
        ];

    if (value !== expected) {
        showPracticeFeedback(
            `Select ${expected} next.`,
            "error"
        );

        return;
    }

    practiceState.equation.push(value);

    selectedToken.classList.remove(
        "expected-token"
    );

    selectedToken.classList.add("used");

    selectedToken.disabled = true;

    updatePracticeStep();
    renderPracticeEquation();
    enableNextPracticeToken();

    showPracticeFeedback(
        `${value} added.`,
        "success"
    );
}


function updatePracticeStep() {
    const count =
        practiceState.equation.length;

    if (count === 1) {
        practiceState.step = 2;
    } else if (count === 2) {
        practiceState.step = 3;
    } else if (count === 3) {
        practiceState.step = 4;
    } else if (
        count >= 4 &&
        count < PRACTICE_SOLUTION.length
    ) {
        practiceState.step = 4;
    } else if (
        count === PRACTICE_SOLUTION.length
    ) {
        practiceState.step = 5;
    }

    updatePracticeGuide();
}


function renderPracticeEquation() {
    if (practiceState.equation.length === 0) {
        practiceEquationDisplay.innerHTML = `
            <span class="placeholder">
                Select your cards
            </span>
        `;

        practiceResult.textContent = "—";

        return;
    }

    practiceEquationDisplay.innerHTML = "";

    for (const value of practiceState.equation) {
        const element =
            document.createElement("span");

        element.classList.add(
            "equation-token"
        );

        element.textContent = value;

        practiceEquationDisplay.appendChild(
            element
        );
    }

    if (
        practiceState.equation.length ===
        PRACTICE_SOLUTION.length
    ) {
        practiceResult.textContent = "1";
    } else {
        practiceResult.textContent =
            "Incomplete";
    }
}


function selectPracticeTarget(target) {
    if (
        practiceState.equation.length !==
        PRACTICE_SOLUTION.length
    ) {
        return;
    }

    practiceState.target = target;

    practiceTarget.textContent = target;

    practiceHighButton.classList.toggle(
        "selected",
        target === "High"
    );

    practiceLowButton.classList.toggle(
        "selected",
        target === "Low"
    );

    practiceSubmitButton.disabled = false;

    practiceState.step = 6;

    updatePracticeGuide();

    if (target === "Low") {
        showPracticeFeedback(
            "Correct. A result of 1 is a perfect Low result.",
            "success"
        );
    } else {
        showPracticeFeedback(
            "A result of 1 belongs to Low, not High.",
            "error"
        );
    }
}


function undoPracticeToken() {
    if (practiceState.equation.length === 0) {
        return;
    }

    const removed =
        practiceState.equation.pop();

    const matchingUsedToken =
        Array.from(practiceTokens)
            .reverse()
            .find(
                token =>
                    token.dataset.token ===
                        removed &&
                    token.classList.contains(
                        "used"
                    )
            );

    if (matchingUsedToken) {
        matchingUsedToken.classList.remove(
            "used"
        );
    }

    clearPracticeTarget();
    updatePracticeStep();
    renderPracticeEquation();
    enableNextPracticeToken();
}


function resetPracticeEquation() {
    practiceState.equation = [];
    practiceState.step = 1;

    clearPracticeTarget();

    for (const token of practiceTokens) {
        token.classList.remove(
            "used",
            "expected-token"
        );

        token.disabled = true;
    }

    renderPracticeEquation();
    updatePracticeGuide();
    enableNextPracticeToken();

    showPracticeFeedback(
        "Equation cleared. Begin again with 10.",
        "information"
    );
}


function clearPracticeTarget() {
    practiceState.target = null;

    practiceTarget.textContent =
        "Not selected";

    practiceHighButton.classList.remove(
        "selected"
    );

    practiceLowButton.classList.remove(
        "selected"
    );

    practiceHighButton.disabled = true;
    practiceLowButton.disabled = true;

    practiceSubmitButton.disabled = true;
}


function submitPracticeEquation() {
    if (
        practiceState.target !== "Low"
    ) {
        showPracticeFeedback(
            "Choose Low before submitting.",
            "error"
        );

        return;
    }

    practiceState.completed = true;

    practicePlayerChips.textContent = "11";
    practicePot.textContent = "0";

    practiceGuideTitle.textContent =
        "Practice Complete";

    practiceGuideMessage.textContent =
        "You created 10 ÷ 2 − 8 + 4 = 1 and selected Low.";

    practiceStepNumber.textContent =
        PRACTICE_GUIDE.length;

    for (const token of practiceTokens) {
        token.disabled = true;
    }

    practiceHighButton.disabled = true;
    practiceLowButton.disabled = true;
    practiceUndoButton.disabled = true;
    practiceResetButton.disabled = true;
    practiceSubmitButton.disabled = true;

    startPracticeButton.disabled = false;
    startPracticeButton.textContent =
        "Play Again";

    showPracticeFeedback(
        "Excellent. You won the practice pot.",
        "success"
    );
}


function showPracticeFeedback(
    message,
    type
) {
    practiceFeedback.textContent = message;

    practiceFeedback.className =
        `practice-feedback ${type}`;
}


function clearPracticeFeedback() {
    practiceFeedback.textContent = "";

    practiceFeedback.className =
        "practice-feedback";
}


startPracticeButton.addEventListener(
    "click",
    startPracticeRound
);


leavePracticeButton.addEventListener(
    "click",
    () => {
        resetPracticeRound();

        showScreen("main-menu");
    }
);


for (const token of practiceTokens) {
    token.addEventListener(
        "click",
        handlePracticeToken
    );
}


practiceHighButton.addEventListener(
    "click",
    () => {
        selectPracticeTarget("High");
    }
);


practiceLowButton.addEventListener(
    "click",
    () => {
        selectPracticeTarget("Low");
    }
);


practiceUndoButton.addEventListener(
    "click",
    undoPracticeToken
);


practiceResetButton.addEventListener(
    "click",
    resetPracticeEquation
);


practiceSubmitButton.addEventListener(
    "click",
    submitPracticeEquation
);


// ==========================================
// BASIC GAME ENGINE
// ==========================================

const playersArea =
    document.getElementById("players-area");

const potDisplay =
    document.getElementById("pot");

const roundDisplay =
    document.getElementById("round-number");

const gameDifficultyDisplay =
    document.getElementById(
        "game-difficulty"
    );

const dealButton =
    document.getElementById("deal-button");

const messageDisplay =
    document.getElementById("message");


// ==========================================
// GAME SETTINGS
// ==========================================

const GAME_SETTINGS = {
    startingChips: 20,
    ante: 1,

    numberMinimum: 0,
    numberMaximum: 10,

    numberCardTypes: [
        "gold",
        "silver",
        "bronze",
        "dirt"
    ],

    specialCardCopies: 4
};


// ==========================================
// GAME STATE
// ==========================================

let gameState = {
    difficulty: "medium",

    round: 1,

    pot: 0,

    deck: [],

    discardPile: [],

    players: [],

    cardsDealt: false,

    phase: "setup",

    eventMessages: []
};


// ==========================================
// CARD HELPERS
// ==========================================

function isNumberCard(card) {
    return (
        card &&
        card.category === "number"
    );
}


function isMultiplyCard(card) {
    return (
        card &&
        card.category === "multiply"
    );
}


function isSquareRootCard(card) {
    return (
        card &&
        card.category === "square-root"
    );
}


function createNumberCard(
    value,
    type
) {
    return {
        id: `${type}-${value}`,
        category: "number",
        value,
        type
    };
}


function createSpecialCard(
    category,
    value,
    index
) {
    return {
        id: `${category}-${index}`,
        category,
        value,
        type: "special"
    };
}


// ==========================================
// DECK CREATION
// ==========================================

function createDeck() {
    const deck = [];

    for (
        const type of
        GAME_SETTINGS.numberCardTypes
    ) {
        for (
            let value =
                GAME_SETTINGS.numberMinimum;

            value <=
                GAME_SETTINGS.numberMaximum;

            value++
        ) {
            deck.push(
                createNumberCard(
                    value,
                    type
                )
            );
        }
    }

    for (
        let index = 1;

        index <=
            GAME_SETTINGS.specialCardCopies;

        index++
    ) {
        deck.push(
            createSpecialCard(
                "multiply",
                "×",
                index
            )
        );

        deck.push(
            createSpecialCard(
                "square-root",
                "√",
                index
            )
        );
    }

    return deck;
}


// ==========================================
// DECK SHUFFLING
// ==========================================

function shuffleDeck(deck) {
    const shuffledDeck = [...deck];

    for (
        let index =
            shuffledDeck.length - 1;

        index > 0;

        index--
    ) {
        const randomIndex =
            Math.floor(
                Math.random() *
                (index + 1)
            );

        const temporaryCard =
            shuffledDeck[index];

        shuffledDeck[index] =
            shuffledDeck[randomIndex];

        shuffledDeck[randomIndex] =
            temporaryCard;
    }

    return shuffledDeck;
}


// ==========================================
// PLAYER CREATION
// ==========================================

function createPlayer(
    id,
    name,
    isHuman,
    difficulty = null
) {
    return {
        id,
        name,
        isHuman,
        difficulty,

        chips:
            GAME_SETTINGS.startingChips,

        hiddenCard: null,

        openCards: [],

        symbolCards: [
            "+",
            "−",
            "÷"
        ],

        folded: false,

        eliminated: false,

        currentBet: 0,

        totalRoundContribution: 0,

        selectedTarget: null,

        equation: [],

        result: null
    };
}


// ==========================================
// PLAYER LIST CREATION
// ==========================================

function createPlayers(
    aiCount,
    difficulty
) {
    const players = [
        createPlayer(
            "player",
            "You",
            true
        )
    ];

    for (
        let index = 1;

        index <= aiCount;

        index++
    ) {
        players.push(
            createPlayer(
                `ai-${index}`,
                `Computer ${index}`,
                false,
                difficulty
            )
        );
    }

    return players;
}


// ==========================================
// ACTIVE PLAYER HELPERS
// ==========================================

function getActivePlayers() {
    return gameState.players.filter(
        player =>
            !player.folded &&
            !player.eliminated
    );
}


function getHumanPlayer() {
    return gameState.players.find(
        player => player.isHuman
    );
}


function getPlayerById(playerId) {
    return gameState.players.find(
        player =>
            player.id === playerId
    );
}

function createPlayer(
    id,
    name,
    isHuman,
    difficulty = null
) {
    return {
        id,
        name,
        isHuman,
        difficulty,
        chips: GAME_SETTINGS.startingChips,
        hiddenCard: null,
        openCards: [],
        symbolCards: ["+", "−", "÷"]
    };
}


function createPlayers(
    aiCount,
    difficulty
) {
    const players = [
        createPlayer(
            "player",
            "You",
            true
        )
    ];

    for (
        let index = 1;
        index <= aiCount;
        index++
    ) {
        players.push(
            createPlayer(
                `ai-${index}`,
                `Computer ${index}`,
                false,
                difficulty
            )
        );
    }

    return players;
}


// ==========================================
// PART 1B: ANTE, DRAWING AND SPECIAL CARDS
// ==========================================

function addGameMessage(message) {
    gameState.eventMessages.push(message);

    messageDisplay.textContent =
        gameState.eventMessages.join(" ");
}


function clearGameMessages() {
    gameState.eventMessages = [];
    messageDisplay.textContent = "";
}


// ==========================================
// ANTE
// ==========================================

function takeAnte() {
    for (const player of gameState.players) {
        if (player.chips < GAME_SETTINGS.ante) {
            player.eliminated = true;

            addGameMessage(
                `${player.name} does not have enough chips and is eliminated.`
            );

            continue;
        }

        player.chips -= GAME_SETTINGS.ante;

        player.totalRoundContribution +=
            GAME_SETTINGS.ante;

        gameState.pot +=
            GAME_SETTINGS.ante;
    }
}


// ==========================================
// DRAWING CARDS
// ==========================================

function drawCard() {
    if (gameState.deck.length === 0) {
        throw new Error(
            "The deck is empty."
        );
    }

    return gameState.deck.pop();
}


function returnCardToDeck(card) {
    if (!card) {
        return;
    }

    gameState.deck.unshift(card);

    gameState.deck =
        shuffleDeck(gameState.deck);
}


function discardCard(card) {
    if (!card) {
        return;
    }

    gameState.discardPile.push(card);
}


// ==========================================
// HIDDEN CARD
// ==========================================

function drawHiddenCard() {
    let card = drawCard();

    while (!isNumberCard(card)) {
        returnCardToDeck(card);

        card = drawCard();
    }

    return card;
}


// ==========================================
// ADDITIONAL NUMBER DRAW
// ==========================================

function drawAdditionalNumberCard(
    player,
    reason
) {
    let card = drawCard();

    while (!isNumberCard(card)) {
        discardCard(card);

        addGameMessage(
            `${player.name} drew ${card.value} while searching for the extra number card. It was discarded.`
        );

        card = drawCard();
    }

    addGameMessage(
        `${player.name} received an extra number card because of ${reason}.`
    );

    return card;
}


// ==========================================
// MULTIPLICATION DISCARD RULE
// ==========================================

function getDiscardableSymbols(player) {
    return player.symbolCards.filter(
        symbol =>
            symbol === "+" ||
            symbol === "−" ||
            symbol === "×"
    );
}


function chooseHumanSymbolToDiscard(
    player
) {
    const options =
        getDiscardableSymbols(player);

    if (options.length === 0) {
        return null;
    }

    const formattedOptions =
        options.join(", ");

    let selectedSymbol = window.prompt(
        `You drew ×.\n\nChoose one symbol to discard:\n${formattedOptions}\n\nDivision cannot be discarded.`
    );

    while (
        selectedSymbol !== null &&
        !options.includes(selectedSymbol)
    ) {
        selectedSymbol = window.prompt(
            `Invalid choice.\n\nChoose one of:\n${formattedOptions}`
        );
    }

    if (selectedSymbol === null) {
        return options[0];
    }

    return selectedSymbol;
}


function chooseAiSymbolToDiscard(
    player
) {
    const priority = [
        "×",
        "−",
        "+"
    ];

    for (const symbol of priority) {
        if (
            player.symbolCards.includes(
                symbol
            )
        ) {
            return symbol;
        }
    }

    return null;
}


function removeSymbolFromPlayer(
    player,
    symbol
) {
    const symbolIndex =
        player.symbolCards.indexOf(
            symbol
        );

    if (symbolIndex === -1) {
        return false;
    }

    player.symbolCards.splice(
        symbolIndex,
        1
    );

    return true;
}


function processMultiplyCard(
    player,
    card
) {
    player.openCards.push(card);

    const discardableSymbols =
        getDiscardableSymbols(player);

    let discardedSymbol = null;

    if (discardableSymbols.length > 0) {
        discardedSymbol =
            player.isHuman
                ? chooseHumanSymbolToDiscard(
                    player
                )
                : chooseAiSymbolToDiscard(
                    player
                );

        if (discardedSymbol) {
            removeSymbolFromPlayer(
                player,
                discardedSymbol
            );

            addGameMessage(
                `${player.name} discarded ${discardedSymbol} after drawing ×.`
            );
        }
    }

    player.symbolCards.push("×");

    const extraNumber =
        drawAdditionalNumberCard(
            player,
            "multiplication"
        );

    player.openCards.push(
        extraNumber
    );
}


// ==========================================
// SQUARE-ROOT RULE
// ==========================================

function processSquareRootCard(
    player,
    card
) {
    player.openCards.push(card);

    const extraNumber =
        drawAdditionalNumberCard(
            player,
            "square root"
        );

    player.openCards.push(
        extraNumber
    );
}


// ==========================================
// OPEN CARD PROCESSING
// ==========================================

function processOpenCard(
    player,
    card
) {
    if (isNumberCard(card)) {
        player.openCards.push(card);

        return;
    }

    if (isSquareRootCard(card)) {
        processSquareRootCard(
            player,
            card
        );

        return;
    }

    if (isMultiplyCard(card)) {
        processMultiplyCard(
            player,
            card
        );
    }
}


// ==========================================
// INITIAL DEAL
// ==========================================

function dealInitialCards() {
    if (gameState.cardsDealt) {
        messageDisplay.textContent =
            "Cards have already been dealt.";

        return;
    }

    clearGameMessages();

    for (const player of getActivePlayers()) {
        player.hiddenCard =
            drawHiddenCard();
    }

    for (
        let drawRound = 0;
        drawRound < 2;
        drawRound++
    ) {
        for (
            const player of
            getActivePlayers()
        ) {
            const card =
                drawCard();

            processOpenCard(
                player,
                card
            );
        }
    }

    gameState.cardsDealt = true;
    gameState.phase =
        "first-betting";

    dealButton.disabled = true;

    renderGame();

    addGameMessage(
        "Every active player received one hidden number card and two open-card draws."
    );
}

// ==========================================
// PART 1C: GAME RENDERING
// ==========================================

function createCardElement(card) {

    const element =
        document.createElement("span");

    element.classList.add("game-card");

    if (card.category === "number") {

        element.classList.add(card.type);

    } else {

        element.classList.add("special");

    }

    element.textContent = card.value;

    return element;

}


function renderSymbols(player, container) {

    container.innerHTML = "";

    for (const symbol of player.symbolCards) {

        const element =
            document.createElement("span");

        element.classList.add(
            "player-symbol"
        );

        element.textContent = symbol;

        container.appendChild(element);

    }

}


function renderOpenCards(player, container) {

    container.innerHTML = "";

    if (player.openCards.length === 0) {

        container.innerHTML =
            "<em>No cards dealt</em>";

        return;

    }

    for (const card of player.openCards) {

        container.appendChild(
            createCardElement(card)
        );

    }

}


function renderGame() {

    potDisplay.textContent =
        gameState.pot;

    roundDisplay.textContent =
        gameState.round;

    playersArea.innerHTML = "";

    for (const player of gameState.players) {

        const panel =
            document.createElement("article");

        panel.classList.add(
            "player-panel"
        );

        if (player.folded) {

            panel.classList.add(
                "player-folded"
            );

        }

        if (player.eliminated) {

            panel.classList.add(
                "player-eliminated"
            );

        }

        const hiddenCardText =
            player.hiddenCard
                ? player.isHuman
                    ? player.hiddenCard.value
                    : "Hidden"
                : "Not dealt";

        panel.innerHTML = `

            <h3>${player.name}</h3>

            <p>
                Chips:
                <strong>${player.chips}</strong>
            </p>

            <p>
                Current Bet:
                <strong>${player.totalRoundContribution}</strong>
            </p>

            <p>
                Hidden Card:
                <strong>${hiddenCardText}</strong>
            </p>

            <p>
                Symbols
            </p>

            <div
                class="symbol-list"
                id="symbols-${player.id}"
            ></div>

            <p>
                Open Cards
            </p>

            <div
                class="card-list"
                id="cards-${player.id}"
            ></div>

        `;

        playersArea.appendChild(panel);

        renderSymbols(
            player,
            document.getElementById(
                `symbols-${player.id}`
            )
        );

        renderOpenCards(
            player,
            document.getElementById(
                `cards-${player.id}`
            )
        );

    }

}


// ==========================================
// PART 1D: GAME START AND EVENT LISTENERS
// ==========================================

function resetDealButton() {
    dealButton.disabled = false;
    dealButton.textContent = "Deal Cards";
}


function startGame() {
    const selectedDifficulty =
        difficultySelect.value;

    const selectedAiCount =
        Number(aiCountSelect.value);

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

        eventMessages: []
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

    showScreen("game-screen");
}


// ==========================================
// GAME BUTTON EVENTS
// ==========================================

startGameButton.addEventListener(
    "click",
    startGame
);


dealButton.addEventListener(
    "click",
    () => {
        try {
            dealInitialCards();
        } catch (error) {
            console.error(error);

            messageDisplay.textContent =
                "The cards could not be dealt. Check the browser console for details.";
        }
    }
);


// ==========================================
// INITIAL SETUP
// ==========================================

updateDifficultyInformation();
renderTutorialStep();
resetPracticeRound();