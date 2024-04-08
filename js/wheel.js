function updateWheelOptions() {
    var optionsInput = document.getElementById("options-input").value;
    var options = optionsInput.split("\n").filter(option => option.trim() !== '');
    var spinBtn = document.getElementById("spin-btn");

    if (options.length < 2) {
        spinBtn.disabled = true;
        return;
    }

    var container = document.getElementById("wheel-options");
    container.innerHTML = '';

    var angle = 360 / options.length;
    var currentAngle = 0;

    options.forEach(function(option) {
        var optionDiv = document.createElement("div");
        optionDiv.textContent = option;
        optionDiv.classList.add("option");
        optionDiv.style.transform = "rotate(" + currentAngle + "deg)";
        container.appendChild(optionDiv);
        currentAngle += angle;
    });

    spinBtn.disabled = false;
}

function spinWheel() {
    var container = document.getElementById("wheel-container");
    container.style.transition = "transform 5s ease-in-out";

    var spinAngle = Math.floor(Math.random() * 360) + 1440; // Minimum 4 full spins
    container.style.transform = "rotate(" + spinAngle + "deg)";

    setTimeout(function() {
        container.style.transition = "none";
        showResult(spinAngle % 360);
        document.getElementById("spin-btn").disabled = false; // Re-enable spin button
    }, 5000); // Change this value to control the duration of the spinning animation

    document.getElementById("spin-btn").disabled = true; // Disable spin button during animation
}

function showResult(angle) {
    var options = document.getElementsByClassName("option");
    var numOptions = options.length;
    var optionAngle = 360 / numOptions;

    var resultIndex = Math.floor(angle / optionAngle);
    var resultOption = options[resultIndex].textContent;

    alert("The wheel landed on: " + resultOption);
}
