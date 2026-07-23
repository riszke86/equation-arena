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
