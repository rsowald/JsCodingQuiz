//selecting elements by id
var timeEl = document.querySelector("#time");
var quizEl = document.querySelector("#quiz");
var startEl = document.querySelector("#start");
var endEl = document.querySelector("#end");
var correctnessEl = document.querySelector("#correctness");

document.querySelector("#startBtn").addEventListener("click", function () {
    quizEl.removeAttribute("class", "hide");
    startEl.setAttribute("class", "hide");
    setTime()
});

var secondsLeft = 60;
var timerInterval;

function setTime() {
    timeEl.textContent = secondsLeft;
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            endGame();
        }
    }, 1000);
}
// Calls function to show game over div
function endGame() {
    // Stops execution of action at set interval
    clearInterval(timerInterval);
}



quizContainer.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
        var state = element.getAttribute("data-state");

        //   if (state === "still") {
        //     element.dataset.state = "animate";
        //     element.setAttribute("data-state", "animate");
        //     element.setAttribute("src", element.dataset.animate);
        //   } else {
        //     element.dataset.state = "still";
        //     element.setAttribute("src", element.dataset.still);
        //   }
    }
});