// Define an array to hold the standard deck of 52 cards
var deck = [
    "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades",
    "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts",
    "Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds",
    "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs"
];

// Function to shuffle an array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Generate shuffled deck
var shuffledDeck = shuffle(deck);

// Function to display card buttons
function displayCardButtons() {
    var cardButtonsDiv = document.getElementById("cardButtons");
    for (var i = 0; i < 5; i++) {
        var button = document.createElement("button");
        button.innerHTML = "<img src='../images/card/red_joker.png' onclick='pickCard(" + i + ")' />";
        cardButtonsDiv.appendChild(button);
    }
}

// Function to pick a card
function pickCard(index) {
    var cardButtons = document.getElementById("cardButtons").getElementsByTagName("button");
    var card = shuffledDeck[index];
    cardButtons[index].innerHTML = "<img src='../images/card/" + card.toLowerCase().replace(/ /g, "_") + ".png' />";
}

// Function to reset the game and reshuffle the hand
function reset() {
    var cardButtonsDiv = document.getElementById("cardButtons");
    cardButtonsDiv.innerHTML = ''; // Clear card buttons
    shuffledDeck = shuffle(deck); // Reshuffle deck
    displayCardButtons(); // Display new set of card buttons
}

// Display card buttons when the page loads
window.onload = function() {
    displayCardButtons();
};