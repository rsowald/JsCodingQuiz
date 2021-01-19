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
var correctnessEl = document.querySelector("#correctness");
var resetHighscores = document.querySelector("#reset");

var currentQuestion = 0;

//TODO: fetch high scores from local storage and display on high scores page

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
    question.textContent = questions[currentQuestion].q;
    btn0.textContent = questions[currentQuestion].a[0];
    btn1.textContent = questions[currentQuestion].a[1];
    btn2.textContent = questions[currentQuestion].a[2];
    btn3.textContent = questions[currentQuestion].a[3];
    currentQuestion++;
    if (currentQuestion > 9) {
        endGame();
    };
};

quizEl.addEventListener("click", showNextQuestion);
//TODO: on click in quiz div, switch to next question
//TODO: on click in quiz div, check for correct answer and display correctness div
//TODO: decrement seconds left for wrong answer
//TODO: clear interval, hide quiz div, and show end game div if all questions have been answered

// Calls function to show game over div
function endGame() {
    // hide quiz div and show end game div
    quizEl.setAttribute("class", "hide");
    endEl.removeAttribute("class", "hide");
    //TODO: show high scores page/modal
    // Stops timer
    clearInterval(timerInterval);
}

//TODO: grab user info from end game div and write to local storage

//TODO: on click in high scores page, clear local storage
//TODO: on click in high scores page, go back to landing div

quizEl.addEventListener("click", function (event) {
    var answer = event.target;

    if (answer.matches("button")) {

    }
});