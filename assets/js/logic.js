const timerElement = document.querySelector('.timer')
const startButton = document.querySelector("#startQuiz-Button");
const start = document.querySelector("#start_screen_container");
const end = document.querySelector("#end-screen")

let timer;
let timerCount = 0;


// The setTimer function starts and stops the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            showFinalScore();
        }
    }, 1000);
}

function showFinalScore() {
    end.style.display = "block";
    start.style.display = "none";
    startButton.disabled = false;
}


// The startGame function is called when the start button is clicked
function startQuiz() {
    timerCount = 5;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
        end.style.display = "none";
    start.style.display = "block";
    startTimer()
}


// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);

