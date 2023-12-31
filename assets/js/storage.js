
//functions to manage local storage
export function storeHighScores(initials, score) {
  let scores = loadHighScores();
  scores.push({"initials": initials, "score": score});
  scores.sort(function(a, b){return b.score - a.score});
  localStorage.setItem("highScores", JSON.stringify(scores));
}

export function loadHighScores() {
  let scores =  JSON.parse(localStorage.getItem("highScores"));
  if (scores == null)
    scores = [];
  return scores;
}



