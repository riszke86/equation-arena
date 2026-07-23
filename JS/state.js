// ==========================================
// EQUATION ARENA
// GAME STATE
// ==========================================

// ==========================================
// DIFFICULTY SETTINGS
// ==========================================

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

    eventMessages: [],

    currentBet: 0,

    currentPlayerIndex: 0,

    bettingStarted: false,

    bettingRoundComplete: false,

    playersWhoActed: []
};