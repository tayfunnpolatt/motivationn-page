document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const resetButton = document.getElementById("resetButton");
    const stopButton = document.getElementById("stopButton");
    const roundInput = document.getElementById("round");
    const restInput = document.getElementById("rest");
    const timerDisplay = document.getElementById("timerDisplay");
    const boxingSound = document.getElementById("boxingSound");

    let timerInterval;
    let remainingTime = 0;
    let isResting = false;

    startButton.addEventListener("click", function() {
        if (!timerInterval) {
            const roundDuration = parseFloat(roundInput.value) * 60;
            const restDuration = parseFloat(restInput.value) * 60; 
            startTimer(remainingTime > 0 ? remainingTime : isResting ? restDuration : roundDuration);
            playBoxingSound();
        }
    });

    resetButton.addEventListener("click", function() {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingTime = 0;
        isResting = false;
        updateTimerDisplay(roundInput.value * 60);
    });

    stopButton.addEventListener("click", function() {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    function startTimer(duration) {
        updateTimerDisplay(duration);
        timerInterval = setInterval(function() {
            if (duration > 0) {
                duration--;
                remainingTime = duration;
                updateTimerDisplay(duration);
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                isResting = !isResting;
                startTimer(isResting ? parseFloat(restInput.value) * 60 : parseFloat(roundInput.value) * 60);
            }
        }, 1000);
    }

    function updateTimerDisplay(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function playBoxingSound() {
        boxingSound.currentTime = 0;
        boxingSound.play();
    }
});
