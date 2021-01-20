$(document).ready(function () {
    //selecting elements by id
    var timeEl = document.querySelector("#time");
    var quizEl = document.querySelector("#quiz");
    var question = document.querySelector("#question");
    var btn0 = document.querySelector("#a0");
    var btn1 = document.querySelector("#a1");
    var btn2 = document.querySelector("#a2");
    var btn3 = document.querySelector("#a3");
    var startEl = document.querySelector("#start");
    var endEl = document.querySelector("#end");
    var scoreSpan = document.querySelector("#score");
    var submitEl = document.querySelector("#submit");
    var playerInput = document.querySelector("#playerName");
    var correctnessEl = document.querySelector("#correctness");
    var highScoresEl = document.querySelector("#highScores");
    var resetHighScores = document.querySelector("#reset");

    //a few global variables
    var currentQuestion;
    var highScores = [];
    var secondsLeft;
    var timerInterval;

    // Load stored scores from localStorage and render to high scores list on page load
    function init() {
        var storedScores = JSON.parse(localStorage.getItem("score"));

        if (storedScores !== null) {
            highScores = storedScores;
        }

        renderHighScores();
    }

    // The following function renders items in High scores list as <li> elements
    function renderHighScores() {
        // Start with a clear list 
        highScoresEl.innerHTML = "";
        // Render a new li for each score
        for (var i = 0; i < highScores.length; i++) {
            var highScore = highScores[i];

            var li = document.createElement("li");
            li.textContent = highScore;

            highScoresEl.appendChild(li);
        }
    }

    //Pressing start button hides landing div, shows quiz div, and starts timer
    document.querySelector("#startBtn").addEventListener("click", function () {
        quizEl.removeAttribute("class", "hide");
        startEl.setAttribute("class", "hide");
        //currentQuestion starts at -1 because first click will display 0th question in array and count will be 0 to match
        currentQuestion = -1;
        secondsLeft = 100;
        setTime();
        showNextQuestion();
    });

    function setTime() {
        //set timer element to secondsLeft first so it refreshes if staring quiz again without reloading
        timeEl.textContent = secondsLeft;
        timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft;

            if (secondsLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    function showNextQuestion() {
        currentQuestion++;

        if (currentQuestion > 9) {
            endGame();
            return;
        };
        //questions array in external questions.js
        question.textContent = questions[currentQuestion].q;
        btn0.textContent = questions[currentQuestion].a[0];
        btn1.textContent = questions[currentQuestion].a[1];
        btn2.textContent = questions[currentQuestion].a[2];
        btn3.textContent = questions[currentQuestion].a[3];

        //Don't keep the previously selected button focused
        btn0.blur();
        btn1.blur();
        btn2.blur();
        btn3.blur();
    };
    //This variable need to be global because it needs to carry through the question iterations
    var hideCorrectnessTimer;
    function checkAnswer(answer) {
        var value = answer.value;
        if (value == questions[currentQuestion].key) {
            correctnessEl.textContent = "Last answer was correct!";
        }
        else {
            correctnessEl.textContent = "Last answer was wrong 🙁";
            // Yikes major yikes. got -30 one test... so need to endGame here if secondsLeft reaches 0 on penalties.
            secondsLeft -= 5;
            if (secondsLeft <= 0) {
                endGame();
            }
        }

        //hide correctness text after 2 seconds
        clearInterval(hideCorrectnessTimer);
        hideCorrectnessTimer = setTimeout(function () {
            correctnessEl.setAttribute("class", "hide");
        }, 2000);
    }
    //main functionality when interacting with the quiz div
    quizEl.addEventListener("click", function (event) {
        var answer = event.target;

        if (answer.matches("button")) {
            checkAnswer(answer);
            correctnessEl.removeAttribute("class", "hide");
            showNextQuestion();
        }
    });

    // Calls function to show game over div
    function endGame() {
        // hide quiz div and show end game div
        quizEl.setAttribute("class", "hide");
        endEl.removeAttribute("class", "hide");

        // Stops timer
        clearInterval(timerInterval);
        //had to set timer text to counter because it was possible to endGame in a split second before the timer had a chance to update
        timeEl.textContent = secondsLeft;
        scoreSpan.textContent = secondsLeft;
    }

    function storeHighScores() {
        // Stringify and set key in localStorage to highScores array
        localStorage.setItem("score", JSON.stringify(highScores));
    }

    resetHighScores.addEventListener("click", function () {
        localStorage.removeItem("score");
        highScores = [];
        renderHighScores();
    })

    // Add submit event to form
    submitEl.addEventListener("click", function (event) {
        event.preventDefault();

        // Return from function early if submitted InitialsInput is blank
        if (playerInput.value === "") {
            return;
        }
        //put seconds left before initials so array could be sorted
        var score = secondsLeft + " - " + playerInput.value.toUpperCase().trim();

        // Reset initial input
        playerInput.value = "";

        // Update scores, sort highest to lowest, store updated scores in localStorage, re-render the list
        highScores.push(score);
        highScores = highScores.sort().reverse();
        storeHighScores();
        renderHighScores();
        //go back to landing page in background and pop up the high scores modal
        endEl.setAttribute("class", "hide");
        startEl.removeAttribute("class", "hide");
        $('#highScoresModal').modal();
    });

    // calls initialize function on page load
    init();
});
