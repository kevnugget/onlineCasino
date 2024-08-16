// Constants for card values
const jack = 10, queen = 10, king = 10;
const ace = 11;
const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king, ace];

// Function to draw a random value from cardValues
function drawRandomCard() {
    return cardValues[Math.floor(Math.random() * cardValues.length)];
}

// Function to calculate the score of a hand; accounts for multiple Aces
function calculateScore(cards) {
    let sum = cards.reduce((a, b) => a + b, 0);
    let aces = cards.filter(card => card === ace).length;

    // Adjust for Aces if the total is over 21
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
}

// Function to update the player UI
function updatePlayerUI(playerCards) {
    let playerCardsDiv = document.getElementById("playerCards");
    playerCardsDiv.innerHTML = playerCards.map(card => 
        `[${card === 11 ? "Ace" : card}]<br>`
    ).join('');
    let playerScore = document.getElementById("playerScore");
    playerScore.innerHTML = calculateScore(playerCards);  
}

// Function to handle the game end
function endGame() {
    document.getElementById("hitButt").style.display = "none";
    document.getElementById("standButt").style.display = "none";
}

// Function to restart the game
function restartGame() {
    quit(); // Assuming quit function handles game reset
}

// Function to start a new game of Blackjack
function playBlackjack() {
    let playerCards = [drawRandomCard(), drawRandomCard()];
    let dealerCards = [drawRandomCard(), drawRandomCard()];
    isBusted = false; // Reset busted state
    verifyScore(playerCards);
    updatePlayerUI(playerCards);
asdasd
    // Event listener for the "Hit" button
    document.getElementById("hitButt").addEventListener("click", function() {
        if (!isBusted) {
            playerCards = hit(playerCards);
            updatePlayerUI(playerCards);
            isBusted = verifyScore(playerCards); // Update isBusted based on score
        }
    });

    // Event listener for the "Stand" button
    document.getElementById("standButt").addEventListener("click", function() {
        if (!isBusted) {
            // Here you can implement the dealer's turn logic and determine the final outcome
            // This example assumes a simple placeholder for dealer logic.
            dealerTurn(dealerCards); // Implement dealer logic here
            endGame(); // Disable further actions
        }
    });
}

// Function to handle the player's hit action
function hit(playerCards) {
    playerCards.push(drawRandomCard());
    return playerCards;
}

// Function to handle the dealer's turn
function dealerTurn(dealerCards) {
    let dealerScore = calculateScore(dealerCards);
    // Placeholder dealer logic: dealer draws cards until reaching 17 or more
    while (dealerScore < 17) {
        dealerCards.push(drawRandomCard());
        dealerScore = calculateScore(dealerCards);
    }
    // You can add logic here to compare player's score with dealer's score and determine the winner
}

// Function to verify the player's score and determine game status
function verifyScore(playerCards) {
    let score = calculateScore(playerCards);
    if (score > 21) {
        document.getElementById("winnerStatus").innerHTML = "Bust! You lost.";
        endGame(); // Disable further actions
        return true; // Indicate busted
    }
    else if (score == 21) {
        document.getElementById("winnerStatus").innerHTML = "Blackjack! You won!";
        endGame(); // Disable further actions
        restartGame();
        return false; // Indicate not busted
    }
    else {
        return false; // Indicate not busted
    }
}

// Function to show action buttons
function showActionButtons() {
    document.getElementById("hitButt").style.display = "block";
    document.getElementById("standButt").style.display = "block";
    document.getElementById("quitButt").style.display = "block";
    document.getElementById("playButt").style.display = "none";
}

// Function to hide action buttons
function hideActionButtons() {
    document.getElementById("hitButt").style.display = "none";
    document.getElementById("standButt").style.display = "none";
    document.getElementById("quitButt").style.display = "none";
    document.getElementById("playButt").style.display = "block";
}

// Function to display the Blackjack table
function displayBJTable() {
    document.getElementById("plaintable").style.display = "none";
    document.getElementById("table").style.display = "block";
}

// Function to display an empty table
function displayEmptyTable() {
    document.getElementById("plaintable").style.display = "block";
    document.getElementById("table").style.display = "none";
}

// Event listener for the "play" button
document.getElementById("playButt").addEventListener("click", function() {
    displayBJTable();
    showActionButtons();
    playBlackjack();
});

// Function to quit the game
function quit() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    hideActionButtons();
    displayEmptyTable();
    clearText();
}

// Event listener for the "quit" button
document.getElementById("quitButt").addEventListener("click", function() {
    quit();
});

// Function to clear text from the UI
function clearText() {
    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("playerScore").innerHTML = "";
    document.getElementById("winnerStatus").innerHTML = "";
}
