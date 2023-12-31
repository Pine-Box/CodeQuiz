import {storeHighScores, loadHighScores} from "./storage.js";
import {hideScores, hideFinalScore, hideQuestions, hideQuizStart} from "./displayPageContent.js"

const timerElement = document.querySelector('.timer');


//initialising variables
let timer;
//set this value for the number of seconds you want the timer to run
let defaultTimerCount = 60;
//this is the countdown variable displayed
let timerCount = defaultTimerCount;
//unused - added if feedback was a modal
let stoptimer = false;
// current question
let questionCount = 0;
//current question correct option answer 1 - 4
export let correctAnswers = 0;
//current answer input
let currentAnswer = 0;

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

// initiates the start of the game
function startQuiz() {
    startTimer()
    hideQuestions(false);
    hideFinalScore(true);
    hideScores(true);
    hideQuizStart(true);
    showNextQuestion();
}

function checkAnswer() {
    const radioButtons = document.querySelectorAll("input[name='option']");
    for (const radiobutton of radioButtons) {
        //check the current checked radio is the correct answer for the current question
        if ((radiobutton.checked === true) && (currentAnswer == radiobutton.value)) {
            correctAnswers = correctAnswers + 1;
            currentAnswer = 0;
            return true;
        }
    }
    //reset current answer as the wrong answer was given
    currentAnswer = 0;
    return false;
}

//iterates through the questions to be answered - note next xbutton disabled until answer is selected
function showNextQuestion() {
    let answer = checkAnswer();
    if ((answer === false) && (questionCount > 0)) {
        //deduct 10 seconds for wrong answer
        stoptimer = true;
        alert("Wrong answer given - 10 seconds will be deducted");
        stoptimer  = false;
         timerCount = timerCount-10;
    }
    if ((questionCount === 10) || (timerCount <= 0)) {
        clearInterval(timer);
        timerElement.textContent = 0;
        showFinalScore();
        return;
    }
    document.getElementById("question").innerHTML = questions[questionCount].question_text;
    document.getElementById("option1").innerHTML = "1. " + questions[questionCount].options_text[0];
    document.getElementById("label1").checked = false;
    document.getElementById("option2").innerHTML = "2. " + questions[questionCount].options_text[1];
    document.getElementById("label2").checked = false;
    document.getElementById("option3").innerHTML = "3. " + questions[questionCount].options_text[2];
    document.getElementById("label3").checked = false;
    document.getElementById("option4").innerHTML = "4. " + questions[questionCount].options_text[3];
    document.getElementById("label4").checked=false;
    currentAnswer = questions[questionCount].answer;
    questionCount = questionCount + 1;
    // need to figure out how to identify the answer selected - which enables next button.
}

//show the final scores for submission
function showFinalScore() {
    hideQuizStart(true);
    hideQuestions(true);
    hideFinalScore(false);
    hideScores(true);
    document.getElementById("final-score").innerHTML = (correctAnswers * 10).toString() + "%";
    document.getElementById("initials").value = "";
}


// shows the highest score details
function showHighestScores() {
    //load highest scores from local storage and add row elements to highest scores table
    const storedhighScores = loadHighScores();
    //clear highest scores and replace from storage
    const current_tbody = document.getElementById("tableScores");
    let new_tbody = document.createElement('tbody');
    current_tbody.parentNode.replaceChild(new_tbody, current_tbody);
    //need to add attribute to the new tbody node
    let attr = document.createAttribute('id');
    attr.value = "tableScores";
    new_tbody.setAttributeNode(attr);

    //display the highest scores screen - back button is primary when clicked shows startQuiz screen
    if (storedhighScores) {
        for (let i = 0; i < storedhighScores.length; i++) {
            let row = new_tbody.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = storedhighScores[i].initials;
            cell2.innerHTML = storedhighScores[i].score;
        }
    }
    hideQuizStart(true);
    hideQuestions(true);
    hideFinalScore(true);
    hideScores(false);

}

//initailises the game start
function init() {
    loadHighScores();
    hideScores(true);
    hideQuestions(true)
    hideFinalScore(true);
    hideQuizStart(false);
    clearInterval(timer);
    stoptimer = false;
    timerCount = defaultTimerCount;
    questionCount = 0;
    correctAnswers = 0;
}


//set the initial quiz state
init();


export {startQuiz, showFinalScore, showNextQuestion, showHighestScores, init}


