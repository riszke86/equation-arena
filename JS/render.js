// ==========================================
// GAME DOM ELEMENTS
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

const passButton =
    document.getElementById("pass-button");

const callButton =
    document.getElementById("call-button");

const raiseButton =
    document.getElementById("raise-button");

const foldButton =
    document.getElementById("fold-button");

const currentBetDisplay =
    document.getElementById("current-bet");

const currentPlayerDisplay =
    document.getElementById("current-player");


// ==========================================
// GAME MESSAGES
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
// CARD RENDERING
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
                <strong>${player.currentBet}</strong>
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