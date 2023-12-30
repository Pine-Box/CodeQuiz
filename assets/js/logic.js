const timerElement = document.querySelector('.timer');
//buttons
const startQuizButton = document.getElementById("startQuiz-Button");
const submitInitialsButton = document.getElementById("submit-Button");
const highScoresButton = document.getElementById("highScores-Button");
const nextQuestionButton = document.getElementById("nextQuestion-Button");
const highScoresBackButton = document.getElementById("highScoresBack-Button")
//screens
const startQuizScreen = document.getElementById("startQuiz-screen");
const questionsScreen = document.getElementById("questions-screen");
const submitInitialsScreen = document.getElementById("submitInitials-screen");
const highScoresScreen = document.getElementById("highScores-screen");

//initialising variables
let timer;
let timerCount = 60;
let stoptimer = false;
let questionCount = 0;


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
        highScoresBackButton.style.display = "none";
    } else {
        highScoresScreen.style.display = "block";
        highScoresButton.style.display = "none";
        highScoresBackButton.style.display = "block";
    }
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

//iterates through the questions to be answered - note next xbutton disabled until answer is selected
function showNextQuestion(){
    document.getElementById("question").innerHTML = questions[questionCount].question_text;
    document.getElementById("option1").innerHTML = "1. " + questions[questionCount].options_text[0];
    document.getElementById("option2").innerHTML = "2. " + questions[questionCount].options_text[1];
    document.getElementById("option3").innerHTML = "3. " + questions[questionCount].options_text[2];
    document.getElementById("option4").innerHTML = "4. " + questions[questionCount].options_text[3];
    questionCount = questionCount+1;
    console.log(questionCount)
}

//show the final scores for submission
function showFinalScore() {
    hideQuizStart(true);
    hideQuestions(true);
    hideFinalScore(false);
    hideScores(true);
}

function storehighScores() {
  let highScores = [{"initials": "RM","score": 100},{"initials": "MM","score": 90}];
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function loadHighScores() {
  return  JSON.parse(localStorage.getItem("highScores"))
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
    attr.value="tableScores";
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
    storehighScores();
    hideScores(true);
    hideQuestions(true)
    hideFinalScore(true);
    hideQuizStart(false);
    stoptimer = false;
    questionCount =0;
}


//set the initial quiz state
    init();
// Attach event listener to start button to call startQuiz function on click
    startQuizButton.addEventListener("click", startQuiz);
    submitInitialsButton.addEventListener("click", init);
    highScoresButton.addEventListener("click", showHighestScores);
    nextQuestionButton.addEventListener("click", showNextQuestion);
    highScoresBackButton.addEventListener("click", init);


