const timerElement = document.querySelector('.timer')
//buttons
const startQuizButton = document.getElementById("startQuiz-Button");
const submitInitialsButton = document.getElementById("submit-Button");
const highScoresButton = document.getElementById("highScores-Button");
const nextQuestionButton = document.getElementById("nextQuestion-Button");
//screens
const startQuizScreen = document.getElementById("startQuiz-screen");
const questionsScreen = document.getElementById("questions-screen");
const submitInitialsScreen = document.getElementById("submitInitials-screen");
const highScoresScreen = document.getElementById("highScores-screen");

//initialising variables
let timer;
let timerCount = 0;
let stoptimer = false;


// The setTimer function starts and stops the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        if (stoptimer === false) {
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


// hides the quiz start elements
function hideQuizStart(hide) {
    if (hide === true) {
        startQuizScreen.style.display = "none";
        startQuizButton.style.display = "none";
    } else {
        startQuizScreen.style.display = "block";
        startQuizButton.style.display = "block";
        highScoresButton.style.display = "block";
    }
}

//hides the questions elements
function hideQuestions(hide) {
    if (hide === true) {
        questionsScreen.style.display = "none";
        nextQuestionButton.style.display = "none";
    } else {
        questionsScreen.style.display = "block";
        nextQuestionButton.style.display = "block"
    }
}

// hides the final score elements
function hideFinalScore(hide) {
    if (hide === true) {
        submitInitialsScreen.style.display = "none";
        submitInitialsButton.style.display = "none";
        //highScoresButton.style.display = "none";
    } else {
        submitInitialsScreen.style.display = "block";
        submitInitialsButton.style.display = "block"
    }
}

// hides the highest score elements
function hideScores(hide) {
    if (hide === true) {
        highScoresScreen.style.display = "none";
        highScoresButton.style.display = "none";
    } else {
        highScoresScreen.style.display = "block";
        highScoresButton.style.display = "block"
    }
}



// initiates the start of the game
function startQuiz() {
    startTimer()
    hideQuizStart(true);
    hideQuestions(false);
    hideFinalScore(true);
    hideScores(true);
}

//iterates through the questions to be answered - note next xbutton disabled until answer is selected
function showNextQuestion(){

}

//show the final scores for submission
function showFinalScore() {
    hideQuizStart(true);
    hideQuestions(true);
    hideFinalScore(false);
    hideScores(true);
}

// shows the highest score details
function showHighestScores() {
    hideQuizStart(true);
    hideQuestions(true);
    hideFinalScore(true);
    hideScores(false);
}
//initailises the game start
function init() {
    hideScores(true);
    hideQuestions(true)
    hideFinalScore(true);
    hideQuizStart(false);
    stoptimer = false;
    timerCount = 5;
}


//set the initial quiz state
    init();
// Attach event listener to start button to call startQuiz function on click
    startQuizButton.addEventListener("click", startQuiz);
    submitInitialsButton.addEventListener("click", startQuiz);
    highScoresButton.addEventListener("click", showHighestScores);
    nextQuestionButton.addEventListener("click", showNextQuestion);


