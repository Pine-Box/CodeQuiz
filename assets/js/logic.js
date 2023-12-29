const timerElement = document.querySelector('.timer')
const startButton = document.getElementById("startQuiz-Button");
const submitButton = document.getElementById("submit-Button");
const scoresButton = document.getElementById("scores-Button");
const start = document.getElementById("start-screen");
const end = document.getElementById("end-screen");
const scoresModal = document.getElementById("scores-Modal");

let timer;
let timerCount = 0;
let stoptimer = false;



// The setTimer function starts and stops the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        if  (stoptimer === false) {
            timerCount--;
            timerElement.textContent = timerCount;
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            showFinalScore();
        }
    }, 1000);
}

function init() {
    end.style.display = "none";
    start.style.display = "block";
    startButton.style.display = "block";
    submitButton.style.display = "none";
    stoptimer = false;
    timerCount = 5;
}

function showFinalScore() {
    end.style.display = "block";
    start.style.display = "none";
    startButton.style.display = "none";
    submitButton.style.display = "block";
}


// The startGame function is called when the start button is clicked
function startQuiz() {
    startTimer()
}

function scores() {

}

init();
// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", init);


