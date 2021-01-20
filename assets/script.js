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
    var resetHighscores = document.querySelector("#reset");

    var currentQuestion;
    var highScores = [];
    var secondsLeft;
    var timerInterval;


    function init() {
        // Get stored scores from localStorage
        var storedScores = JSON.parse(localStorage.getItem("score"));

        // If scores were retrieved from localStorage, update the highScores array with it
        if (storedScores !== null) {
            highScores = storedScores;
        }

        // Render scores to the high score modal in DOM
        renderHighScores();
    }

    // The following function renders items in scores list as <li> elements
    function renderHighScores() {
        // Clear list so scores don't render 
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
        currentQuestion = -1;
        secondsLeft = 100;
        setTime();
        showNextQuestion();
    });

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

    function showNextQuestion() {
        currentQuestion++;
        if (currentQuestion > 9) {
            endGame();
            return;
        };
        question.textContent = questions[currentQuestion].q;
        btn0.textContent = questions[currentQuestion].a[0];
        btn1.textContent = questions[currentQuestion].a[1];
        btn2.textContent = questions[currentQuestion].a[2];
        btn3.textContent = questions[currentQuestion].a[3];

    };

    function checkAnswer(answer) {
        var value = answer.value;
        if (value == questions[currentQuestion].key) {
            correctnessEl.textContent = "Last question was correct!";
        }
        else {
            correctnessEl.textContent = "Last question was wrong 🙁";
            secondsLeft = secondsLeft - 5;
        }
    }
    //TODO: Hide correctness div after a timeout?
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

        timeEl.textContent = secondsLeft;
        scoreSpan.textContent = secondsLeft;
    }

    //grabs user info from end game div and writes to local storage
    function storeHighScores() {
        // Stringify and set key in localStorage to highScores array

        localStorage.setItem("score", JSON.stringify(highScores));
    }

    resetHighscores.addEventListener("click", function () {
        localStorage.removeItem("score");
        highScores = [];
        renderHighScores();
    })

    // Add submit event to form
    submitEl.addEventListener("click", function (event) {
        event.preventDefault();

        // Return from function early if submitted todoText is blank
        if (playerInput.value === "") {
            return;
        }

        var score = playerInput.value.toUpperCase().trim() + " - " + secondsLeft;

        // Add new score to highScores array, clear the input
        highScores.push(score);
        playerInput.value = "";

        // Store updated scores in localStorage, re-render the list
        storeHighScores();
        renderHighScores();

        endEl.setAttribute("class", "hide");
        startEl.removeAttribute("class", "hide");
        $('#highscores').modal();
    });

    // calls initialize function on page load
    init();
});
