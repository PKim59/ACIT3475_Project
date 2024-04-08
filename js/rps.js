function playGame(userChoice) {
    var aiChoices = ['rock', 'paper', 'scissors'];
    var aiChoice = aiChoices[Math.floor(Math.random() * aiChoices.length)];
    var result = "";

    if (userChoice === aiChoice) {
        result = "It's a tie!";
    } else if (
        (userChoice === 'rock' && aiChoice === 'scissors') ||
        (userChoice === 'paper' && aiChoice === 'rock') ||
        (userChoice === 'scissors' && aiChoice === 'paper')
    ) {
        result = "You win! AI chose " + aiChoice + ".";
    } else {
        result = "You lose! AI chose " + aiChoice + ".";
    }

    document.getElementById("result").textContent = result;
    disableButtons();
}

function resetGame() {
    document.getElementById("result").textContent = "";
    document.getElementById("againBtn").disabled = true;
    enableButtons();
}

function disableButtons() {
    document.getElementById("rockBtn").disabled = true;
    document.getElementById("paperBtn").disabled = true;
    document.getElementById("scissorsBtn").disabled = true;
    document.getElementById("againBtn").disabled = false;
}

function enableButtons() {
    document.getElementById("rockBtn").disabled = false;
    document.getElementById("paperBtn").disabled = false;
    document.getElementById("scissorsBtn").disabled = false;
}
