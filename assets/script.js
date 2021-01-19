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
var submitEl = document.querySelector("#submit");
var playerInitials = document.querySelector("#playerName");
var correctnessEl = document.querySelector("#correctness");
var highScoresEl = document.querySelector("#highScores");
var resetHighscores = document.querySelector("#reset");

var currentQuestion = -1;
var highScores = [];


//TODO: fetch high scores from local storage and display on high scores page
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
    setTime();
    showNextQuestion();
});

var secondsLeft = 100;
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

var questions = [
    {
        q: "How do you declare a function in javascript?",
        a: ["myFunction()", "function = myFunction()", "function: myFunction", "function myFunction()"],
        key: 3
    },
    {
        q: "What method would add a new item to the beginning of an array?",
        a: ["unshift", "push", "pop", "replace"],
        key: 0
    },
    {
        q: "How do you declare a variable as an object?",
        a: ["var myVariable = [1,2,3]", "var myVariable = {a:1 ,b:2, c:3}", "myVariable = (1,2,3)", "var myVariable{1;2;3}"],
        key: 1
    },
    {
        q: "How would you write 'Do you like this question?' to a confirm box?",
        a: ["confirmBox('Do you like this question?')", "msg('Do you like this question?')", "confirm('Do you like this question?')", "alert('Do you like this question?"],
        key: 2
    },
    {
        q: "How do you start writing a For loop?",
        a: ["for(i<arr.length; i++)", "for(i=0; i<arr.length; i++)", "for(myFunction)", "foreach(function())"],
        key: 1
    },
    {
        q: "A variable defined inside a function has what kind of scope?",
        a: ["Global", "Loop", "Local", "Micro"],
        key: 2
    },
    {
        q: "In the code 'element.addEventListener('click', myFunction), which is the event handler?",
        a: ["click", "element", "addEventListener", "myFunction"],
        key: 3
    },
    {
        q: "How would you call the function myFunction?",
        a: ["myFunction()", "call myFunction()", "myFunction", "run myFunction"],
        key: 0
    },
    {
        q: "Which of these is a method for getting a reference to a DOM element?",
        a: ["getElementById", "querySelector('#id')", "var = h1(#id)", "BOTH getElementById and querySelector('#id')"],
        key: 3
    },
    {
        q: "Which of these is a valid Boolean value?",
        a: ["true", "4", "NaN", "To be or not to be?"],
        key: 0
    },
];

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
        correctnessEl.textContent = "Correct!";
    }
    else {
        correctnessEl.textContent = "Wrong 🙁"
    }
}
//Hide correctness div after a timeout?
quizEl.addEventListener("click", function (event) {
    var answer = event.target;


    if (answer.matches("button")) {
        checkAnswer(answer);
        correctnessEl.removeAttribute("class", "hide");
        showNextQuestion();
    }
});


//TODO: decrement seconds left for wrong answer 5sec?


// Calls function to show game over div
function endGame() {
    // hide quiz div and show end game div
    quizEl.setAttribute("class", "hide");
    endEl.removeAttribute("class", "hide");
    //TODO: show high scores page/modal
    // Stops timer
    clearInterval(timerInterval);
}


//grabs user info from end game div and writes to local storage
function storeHighScores() {
    // Stringify and set key in localStorage to highScores array

    localStorage.setItem("score", JSON.stringify(highScores));
}

// Add submit event to form
submitEl.addEventListener("click", function (event) {
    event.preventDefault();
    var score = playerInitials.value.toUpperCase() + " - " + secondsLeft;
    // Return from function early if submitted todoText is blank
    if (playerInitials === "") {
        return;
    }

    // Add new playerInitials to highScores array, clear the input
    highScores.push(score);
    playerInitials.value = "";

    // Store updated scores in localStorage, re-render the list
    storeHighScores();
    renderHighScores();
    //todo: debug stored high scores rendering twice
});

//TODO: on click in high scores page, clear local storage
//TODO: on click in high scores page, go back to landing div
// calls initialize function on page load
init();

