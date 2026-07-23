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

