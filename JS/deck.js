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

    let selectedSymbol =
        window.prompt(
            `You drew ×.\n\nChoose one symbol to discard:\n${formattedOptions}\n\nDivision cannot be discarded.`
        );

    while (
        selectedSymbol !== null &&
        !options.includes(selectedSymbol)
    ) {
        selectedSymbol =
            window.prompt(
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
        addGameMessage(
            "Cards have already been dealt."
        );

        return;
    }

    clearGameMessages();

    for (
        const player of
        getActivePlayers()
    ) {
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

    startFirstBettingRound();
}