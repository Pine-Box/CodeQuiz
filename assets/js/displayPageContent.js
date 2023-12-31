import {showFinalScore,showHighestScores,showNextQuestion,startQuiz,init,correctAnswers} from "./logic.js";
import {loadHighScores, storeHighScores} from "./storage.js";

//screens
const startQuizScreen = document.getElementById("startQuiz-screen");
const questionsScreen = document.getElementById("questions-screen");
const submitInitialsScreen = document.getElementById("submitInitials-screen");
const highScoresScreen = document.getElementById("highScores-screen");

//buttons
const startQuizButton = document.getElementById("startQuiz-Button");
const submitInitialsButton = document.getElementById("submit-Button");
const highScoresButton = document.getElementById("highScores-Button");
const nextQuestionButton = document.getElementById("nextQuestion-Button");
const highScoresBackButton = document.getElementById("highScoresBack-Button")
//submission of highscore
const inputSubmission = document.getElementById("initials");

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
    } else {
        submitInitialsScreen.style.display = "block";
        submitInitialsButton.style.display = "block";
        submitInitialsButton.disabled = true;
    }
}

// hides the highest score elements
function hideScores(hide) {
    if (hide === true) {
        highScoresScreen.style.display = "none";
        highScoresButton.style.display = "none";
        highScoresBackButton.style.display = "none";
    } else {
        highScoresScreen.style.display = "block";
        highScoresButton.style.display = "none";
        highScoresBackButton.style.display = "block";
    }
}

function enableSubmitButton(){
    submitInitialsButton.disabled = false;
}

function updateHighScores() {
    storeHighScores(inputSubmission.value, correctAnswers*10);
    init();
}

// Attach event listener to start button to call startQuiz function on click
    startQuizButton.addEventListener("click", startQuiz);
    submitInitialsButton.addEventListener("click", updateHighScores);
    highScoresButton.addEventListener("click", showHighestScores);
    nextQuestionButton.addEventListener("click", showNextQuestion);
    highScoresBackButton.addEventListener("click", init);
    inputSubmission.addEventListener("input", enableSubmitButton);

export { hideScores,hideFinalScore,hideQuestions,hideQuizStart}