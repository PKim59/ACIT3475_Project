document.addEventListener("DOMContentLoaded", function() {
    const coinElement = document.getElementById("coin");
    const flipButton = document.getElementById("flipButton");

    // Function to simulate a coin flip
    function flipCoin() {
        // Generate a random number (0 or 1) representing heads or tails
        const result = Math.floor(Math.random() * 2);

        // Display the result
        if (result === 0) {
            coinElement.textContent = "Heads";
        } else {
            coinElement.textContent = "Tails";
        }
    }

    // Event listener for the flip button
    flipButton.addEventListener("click", function() {
        flipCoin();
    });
});
