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