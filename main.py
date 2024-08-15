import random

jack, queen, king = 10, 10, 10
ace = 11
cardValues = [2, 3, 4, 5 , 6, 7, 8, 9, 10, jack, queen, king, ace]

def drawRandomCard():
    return random.choice(cardValues)

def calculateScore(cards):
    score = sum(cards)
    if score > 21 and ace in cards:
        score -= 10
    return score

def calculateBJWin(inputMoney):
    return inputMoney

def playBJ(inputMoney):
    if inputMoney == 0:
        return 0
    playerCards = [drawRandomCard(), drawRandomCard()]
    dealerCards = [drawRandomCard(), drawRandomCard()]

    while True:
        playerScore = calculateScore(playerCards)
        dealerScore = calculateScore(dealerCards)
        print(f"Your cards: {playerCards} ({playerScore})")
        print(f"Dealer's cards: [{dealerCards[0]}, ??]")
        if playerScore == 21:
            print("Blackjack! You won!")
            return calculateBJWin(inputMoney)
        elif playerScore > 21:
            print("Bust! You lost.")
            return -calculateBJWin(inputMoney)

        action = input("\nWould you like to Hit (H) or Stand (S): ")
        if action.casefold() == 'h':
            playerCards.append(drawRandomCard())

        elif action.casefold() == 's':
            break

    
    while dealerScore < 21:
        dealerCards.append(drawRandomCard()) 
        print(f"Dealer's cards: {dealerCards} ({dealerScore})")
        dealerScore = calculateScore(dealerCards)
        if dealerScore > 21:
            print("Dealer busted! You won!")
            return calculateBJWin(inputMoney)
        elif dealerScore == 21 or playerScore < dealerScore:
            print("Dealer won.")
            return -calculateBJWin(inputMoney)
        elif playerScore == dealerScore:
            print("Push!")
            print(f"Your cards: {playerCards} ({playerScore})")
            print(f"Dealer's cards: {dealerCards} ({dealerScore})")
            return 0
        
def playRoulette():
    print("hello")

def main():
    totalMoney = int(input("Enter your TOTAL amount of money: "))
    while True:
        userInput = input("Would you like to play Blackjack (BJ), Roulette (R), or Quit (Q)?\n")
        if userInput.casefold() == 'bj':
            inputMoney = int(input("Enter your wager: "))
            if inputMoney > totalMoney:
                inputMoney = int(input(f"Enter value that is at most ${totalMoney}: "))
            totalMoney += playBJ(inputMoney)
            print(totalMoney)   

        elif userInput.casefold() == 'r':
            inputMoney = int(input("Enter your wager: "))
            if inputMoney > totalMoney:
                inputMoney = int(input(f"Enter value that is at most ${totalMoney}: "))
            totalMoney += playRoulette(inputMoney)

        elif userInput.casefold() == 'q':
            print("Thank you for playing!")
            break
        
        else:
            print("Invalid. Please try again.")

main()