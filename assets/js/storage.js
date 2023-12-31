
//functions to manage local storage
function storehighScores() {
  let highScores = [{"initials": "RM","score": 100},{"initials": "MM","score": 90}];
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function loadHighScores() {
  return  JSON.parse(localStorage.getItem("highScores"))
}

export{ storehighScores, loadHighScores }

