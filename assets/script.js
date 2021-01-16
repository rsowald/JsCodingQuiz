//selecting timer element by id
var timeEl = document.querySelector("#time");

var secondsLeft = 60;
var timerInterval;

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

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

setTime()

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