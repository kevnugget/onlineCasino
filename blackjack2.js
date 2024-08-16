// Constants for card values
const jack = 10, queen = 10, king = 10;
const ace = 11;
const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king, ace];

// Function to draw a random value from cardValues
function drawRandomCard() {
    return cardValues[Math.floor(Math.random() * cardValues.length)];
}

// Function to calculate the score of a hand; accounts for value of Ace
function calculateScore(cards) {
    let sum = cards.reduce((a, b) => a + b, 0);
    if (sum > 21 && cards.includes(ace)) {
        sum -= 10;
    }
    return sum;
}

function updatePlayerUI(playerCards) {
    let playerCardsDiv = document.getElementById("playerCards");
    playerCardsDiv.innerHTML = playerCards.map(card => 
        `[${card === 11 ? "Ace" : card}]<br>`
    ).join('');
    let playerScore = document.getElementById("playerScore");
    playerScore.innerHTML = calculateScore(playerCards);  
}

function playBlackjack() {
    let playerCards = [drawRandomCard(), drawRandomCard()];
    let dealerCards = [drawRandomCard(), drawRandomCard()];
    verifyScore(playerCards);
    updatePlayerUI(playerCards);

    document.getElementById("hitButt").addEventListener("click", function() {
        playerCards = hit(playerCards);
        updatePlayerUI(playerCards);
        verifyScore(playerCards);
    });
}

function hit(playerCards) {
    playerCards.push(drawRandomCard());
    console.log(calculateScore(playerCards))
    return playerCards;
}

function verifyScore(playerCards) {
    let score = calculateScore(playerCards)
    if (score > 21) {
        document.getElementById("winnerStatus").innerHTML = "Bust! You lost.";
        return true;
    }
    else if (score == 21)
    {
        document.getElementById("winnerStatus").innerHTML = "Blackjack! You won!";
        restartGame();
        return false;
    }
    else {
        return false;
    }
}

// Function to show action buttons
function showActionButtons() {
    document.getElementById("hitButt").style.display = "block"   
    document.getElementById("standButt").style.display = "block"
    document.getElementById("quitButt").style.display = "block"
    document.getElementById("playButt").style.display = "none"
}

// Function to hide action buttons
function hideActionButtons() {
    document.getElementById("hitButt").style.display = "none"   
    document.getElementById("standButt").style.display = "none"
    document.getElementById("quitButt").style.display = "none"
    document.getElementById("playButt").style.display = "block"
}

// Function to display the Blackjack table
function displayBJTable() {
    document.getElementById("plaintable").style.display = "none"
    document.getElementById("table").style.display = "block"
}

// Function to display an empty table
function displayEmptyTable() {
    document.getElementById("plaintable").style.display = "block"
    document.getElementById("table").style.display = "none"
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

