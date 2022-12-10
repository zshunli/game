const highScoresList = document.querySelector('#ul-highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="li-high-score">${score.name} - ${score.score}</li>`
}).join("")