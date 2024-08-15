// Constants for card values
const jack = 10, queen = 10, king = 10;
const ace = 11;
const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king, ace];

// Function to draw a random card
function drawRandomCard() {
    return cardValues[Math.floor(Math.random() * cardValues.length)];
}

// Function to calculate the score of a hand
function calculateScore(cards) {
    let sum = cards.reduce((a, b) => a + b, 0);
    if (sum > 21 && cards.includes(ace)) {
        sum -= 10;
    }
    console.log("Sum is ", sum);
    return sum;
}

// Function to update the player's UI with their cards and score
function updatePlayerUI(playerCards) {
    let playerCardsDiv = document.getElementById("playerCards");
    playerCardsDiv.innerHTML = "";
    playerCards.forEach(card => 
    {
        let cardText = card === 11 ? "Ace" : card; 
        playerCardsDiv.innerHTML += cardText + "<br>"; 
    });                        
    let playerScoreDiv = document.getElementById("playerScore");
    playerScoreDiv.innerHTML = calculateScore(playerCards);
}

// Function to handle the game logic
function playBlackjack() {
    let playerScore = 0;
    let playerCards = [drawRandomCard(), drawRandomCard()];
    let dealerCards = [drawRandomCard(), drawRandomCard()];
    playerScore = calculateScore(playerCards);
    let playerScoreDiv = document.getElementById("playerScore");
    updatePlayerUI(playerCards);
    // Event listener for the "hit" button
    document.getElementById("hitButt").addEventListener("click", function() {
        if (!(verifyCardBust(playerScore)))
            {
                playerCards = hit(playerCards);
                playerScoreDiv.innerHTML = playerScore;
                playerScore = calculateScore(playerCards);
                updatePlayerUI(playerCards);
                verifyCardBust(playerCards);
            }
        else
        {
            return;
        }
    updatePlayerUI(playerCards);
    playerScoreDiv.innerHTML = playerScore;
    });

    // Event listener for the "stand" button
    document.getElementById("standButt").addEventListener("click", function() {
        stand();
    });
}

// Function to handle the player hitting
function hit(playerCards) {
    playerCards.push(drawRandomCard());
    return playerCards;
}

function verifyCardBust(playerScore)
{
    if (playerScore > 21) {
        let winnerDiv = document.getElementById("winnerStatus")
        winnerDiv.innerHTML = "Bust! You lost.";
        return true;
    } else if (playerScore == 21) {
        let winnerDiv = document.getElementById("winnerStatus");
        winnerDiv.innerHTML = "Blackjack! You won!";
        return false;
    }
    else {
        return false;
    }
}

// Function to handle the player standing
function stand() {
    // Implement dealer logic here
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


