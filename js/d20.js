function rollDice() {
    var number = parseInt(document.getElementById("numberInput").value);
    var faces = parseInt(document.getElementById("facesInput").value);

    if (isNaN(number) || isNaN(faces)) {
        alert("Please enter valid numbers");
        return;
    }

    var total = 0;
    var rolls = [];

    for (var i = 0; i < number; i++) {
        var roll = Math.floor(Math.random() * faces) + 1;
        rolls.push(roll);
        total += roll;
    }

    var result = "Rolls: " + rolls.join(", ") + "<br>Total: " + total;

    document.getElementById("result").innerHTML = result;
}