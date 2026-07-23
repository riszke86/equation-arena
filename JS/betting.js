// ==========================================
// EQUATION ARENA
// BETTING SYSTEM
// ==========================================

// ==========================================
// FIRST BETTING ROUND
// ==========================================

function resetBettingState() {
    gameState.currentBet = 0;
    gameState.currentPlayerIndex = 0;
    gameState.bettingStarted = false;
    gameState.bettingRoundComplete = false;
    gameState.playersWhoActed = [];

    for (const player of gameState.players) {
        player.currentBet = 0;
    }

    updateBettingDisplay();
}


function getCurrentPlayer() {
    return gameState.players[
        gameState.currentPlayerIndex
    ];
}


function getPlayersStillBetting() {
    return gameState.players.filter(
        player =>
            !player.folded &&
            !player.eliminated
    );
}


function hasPlayerActed(player) {
    return gameState.playersWhoActed.includes(
        player.id
    );
}


function recordPlayerAction(player) {
    if (!hasPlayerActed(player)) {
        gameState.playersWhoActed.push(
            player.id
        );
    }
}


function updateBettingDisplay() {
    currentBetDisplay.textContent =
        gameState.currentBet;

    const currentPlayer =
        getCurrentPlayer();

    if (
        currentPlayer &&
        !gameState.bettingRoundComplete &&
        gameState.phase === "first-betting"
    ) {
        currentPlayerDisplay.textContent =
            currentPlayer.name;
    } else {
        currentPlayerDisplay.textContent =
            "-";
    }

    updateBettingButtons();
}


function updateBettingButtons() {
    const player =
        getCurrentPlayer();

    const isHumanTurn =
        player &&
        player.isHuman &&
        !player.folded &&
        !player.eliminated &&
        gameState.phase === "first-betting" &&
        !gameState.bettingRoundComplete;

    passButton.disabled =
        !isHumanTurn ||
        gameState.bettingStarted;

    callButton.disabled =
        !isHumanTurn ||
        !gameState.bettingStarted ||
        player.currentBet ===
            gameState.currentBet;

    raiseButton.disabled =
        !isHumanTurn ||
        player.chips <= 0;

    foldButton.disabled =
        !isHumanTurn;
}


function payBet(player, amount) {
    const payment =
        Math.min(
            amount,
            player.chips
        );

    player.chips -= payment;
    player.currentBet += payment;
    player.totalRoundContribution +=
        payment;

    gameState.pot += payment;

    return payment;
}


function handlePass(player) {
    if (gameState.bettingStarted) {
        return;
    }

    recordPlayerAction(player);

    addGameMessage(
        `${player.name} passed.`
    );

    continueBetting();
}


function handleCall(player) {
    const amountNeeded =
        gameState.currentBet -
        player.currentBet;

    if (amountNeeded <= 0) {
        recordPlayerAction(player);

        addGameMessage(
            `${player.name} checked.`
        );

        continueBetting();

        return;
    }

    const amountPaid =
        payBet(
            player,
            amountNeeded
        );

    recordPlayerAction(player);

    if (amountPaid < amountNeeded) {
        addGameMessage(
            `${player.name} went all-in with ${amountPaid} chips.`
        );
    } else {
        addGameMessage(
            `${player.name} called ${amountPaid} chips.`
        );
    }

    continueBetting();
}


function handleRaise(player) {
    const amountNeeded =
        gameState.currentBet -
        player.currentBet;

    const raiseAmount = 1;

    const totalPayment =
        amountNeeded +
        raiseAmount;

    if (player.chips < totalPayment) {
        addGameMessage(
            `${player.name} does not have enough chips to raise.`
        );

        updateBettingButtons();

        return;
    }

    payBet(
        player,
        totalPayment
    );

    gameState.currentBet =
        player.currentBet;

    gameState.bettingStarted = true;

    gameState.playersWhoActed = [
        player.id
    ];

    addGameMessage(
        `${player.name} raised the current bet to ${gameState.currentBet}.`
    );

    continueBetting();
}


function handleFold(player) {
    player.folded = true;

    recordPlayerAction(player);

    addGameMessage(
        `${player.name} folded.`
    );

    continueBetting();
}


function isBettingRoundFinished() {
    const activePlayers =
        getPlayersStillBetting();

    if (activePlayers.length <= 1) {
        return true;
    }

    if (!gameState.bettingStarted) {
        return activePlayers.every(
            player =>
                hasPlayerActed(player)
        );
    }

    return activePlayers.every(
        player =>
            hasPlayerActed(player) &&
            player.currentBet ===
                gameState.currentBet
    );
}


function advanceToNextPlayer() {
    const totalPlayers =
        gameState.players.length;

    for (
        let attempt = 0;
        attempt < totalPlayers;
        attempt++
    ) {
        gameState.currentPlayerIndex =
            (
                gameState.currentPlayerIndex +
                1
            ) % totalPlayers;

        const player =
            getCurrentPlayer();

        if (
            !player.folded &&
            !player.eliminated
        ) {
            return;
        }
    }
}


function continueBetting() {
    renderGame();

    if (isBettingRoundFinished()) {
        finishFirstBettingRound();

        return;
    }

    advanceToNextPlayer();

    updateBettingDisplay();

    const player =
        getCurrentPlayer();

    if (!player.isHuman) {
        window.setTimeout(
            () => {
                performAiBettingAction(
                    player
                );
            },
            700
        );
    }
}


function performAiBettingAction(player) {
    if (
        gameState.bettingRoundComplete ||
        player.folded ||
        player.eliminated
    ) {
        return;
    }

    const amountNeeded =
        gameState.currentBet -
        player.currentBet;

    const decision =
        Math.random();

    if (!gameState.bettingStarted) {
        if (decision < 0.65) {
            handlePass(player);
        } else {
            handleRaise(player);
        }

        return;
    }

    if (amountNeeded > player.chips) {
        handleFold(player);

        return;
    }

    if (decision < 0.15) {
        handleFold(player);
    } else if (
        decision > 0.8 &&
        player.chips >
            amountNeeded + 1
    ) {
        handleRaise(player);
    } else {
        handleCall(player);
    }
}


function startFirstBettingRound() {
    resetBettingState();

    gameState.phase =
        "first-betting";

    gameState.currentPlayerIndex = 0;

    addGameMessage(
        "The first betting round has started. It is your turn."
    );

    updateBettingDisplay();

    const player =
        getCurrentPlayer();

    if (!player.isHuman) {
        performAiBettingAction(player);
    }
}


function finishFirstBettingRound() {
    gameState.bettingRoundComplete = true;

    passButton.disabled = true;
    callButton.disabled = true;
    raiseButton.disabled = true;
    foldButton.disabled = true;

    currentPlayerDisplay.textContent =
        "-";

    const activePlayers =
        getPlayersStillBetting();

    if (activePlayers.length === 1) {
        const winner =
            activePlayers[0];

        winner.chips +=
            gameState.pot;

        addGameMessage(
            `${winner.name} wins the pot because every other player folded.`
        );

        gameState.pot = 0;
        gameState.phase =
            "round-complete";

        renderGame();

        return;
    }
    
    gameState.phase =
        "final-card";

    dealButton.disabled = false;
    dealButton.textContent =
        "Deal Final Card";

    addGameMessage(
        "The first betting round is complete. Press Deal Final Card."
    );

    renderGame();

    }

// ==========================================
// FINAL OPEN CARD
// ==========================================

function dealFinalOpenCards() {
    if (gameState.phase !== "final-card") {
        return;
    }

    for (
        const player of
        getPlayersStillBetting()
    ) {
        const card =
            drawCard();

        processOpenCard(
            player,
            card
        );
    }

    dealButton.disabled = true;
    dealButton.textContent =
        "Final Cards Dealt";

    gameState.phase =
        "second-betting";

    renderGame();

    addGameMessage(
        "Every active player received the final open-card draw."
    );

    addGameMessage(
        "The second betting round will be added next."
    );
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