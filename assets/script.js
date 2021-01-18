//selecting elements by id
var timeEl = document.querySelector("#time");
var quizEl = document.querySelector("#quiz");
var startEl = document.querySelector("#start");
var endEl = document.querySelector("#end");
var correctnessEl = document.querySelector("#correctness");

//TODO: add query selectors for high scores page

//TODO: fetch high scores from local storage and display on high scores page

//Pressing start button hides landing div, shows quiz div, and starts timer
document.querySelector("#startBtn").addEventListener("click", function () {
    quizEl.removeAttribute("class", "hide");
    startEl.setAttribute("class", "hide");
    setTime()
});

var secondsLeft = 60;
var timerInterval;

function setTime() {
    timeEl.textContent = secondsLeft;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            endGame();
        }
    }, 1000);
}


//TODO: on click in quiz div, switch to next question
//TODO: on click in quiz div, check for correct answer and display correctness div
//TODO: decrement seconds left for wrong answer
//TODO: clear interval, hide quiz div, and show end game div if all questions have been answered

// Calls function to show game over div
function endGame() {
    //TODO: hide quiz div and show end game div
    // Stops timer
    clearInterval(timerInterval);
}

//TODO: grab user info from end game div and write to local storage
//TODO: show high scores page/modal
//TODO: on click in high scores page, clear local storage
//TODO: on click in high scores page, go back to landing div

quizEl.addEventListener("click", function (event) {
    var answer = event.target;

    if (answer.matches("button")) {

    }
});