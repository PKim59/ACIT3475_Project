function rollDice() {
    var diceType = parseInt(document.getElementById("diceType").value);
    var result = "";

    if (diceType === 1) {
        // Roll 1 six-sided die
        var roll = Math.floor(Math.random() * 6) + 1;
        result = "You rolled a " + roll + ".";
    } else if (diceType === 2) {
        // Roll 2 six-sided dice
        var roll1 = Math.floor(Math.random() * 6) + 1;
        var roll2 = Math.floor(Math.random() * 6) + 1;
        var total = roll1 + roll2;
        result = "You rolled a " + roll1 + " and a " + roll2 + ", totaling " + total + ".";
    } else {
        result = "Invalid selection.";
    }

    document.getElementById("result").textContent = result;
}
