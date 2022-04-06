var ques = [
    {q: "Which of the following type of variable is visible only within a function where it is defined?",
    ans: {
        a: "1. global variable",
        b: "2. local variable",
        c: "3. Both of the above",
        d: "4. None of the above",
    },
    answer: "2. local variable",
    },
    {q: "Which of the following code creates an object?",
    ans: {
        a: "1. var book = Object();",
        b: "2. var book = new Object();",
        c: "3. var book = new OBJECT();",
        d: "4. var book = new Book();",
    },
    answer: "2. var book = new Object();",
    },
    {q: "Which of the following function of String object returns the calling string value converted to upper case?",
    ans: {
        a: "1. toLocaleUpperCase()",
        b: "2. toUpperCase()",
        c: "3. toString()",
        d: "4. substring()",
    },
    answer: "2. toUpperCase()",
    },
    {q: "Which of the following function of Array object joins all elements of an array into a string?",
    ans: {
        a: "1. concat()",
        b: "2. join()",
        c: "3. pop()",
        d: "4. map()",
    },
    answer: "2. join()",
    },
    {q: "Which of the following function of Array object returns a string representing the array and its elements?",
    ans: {
        a: "1. toSource()",
        b: "2. sort()",
        c: "3. splice()",
        d: "4. toString()",
    },
    answer: "4. toString()",
    }
];

var startBtn = document.querySelector(".startBtn");
var submitBtn = document.querySelector(".submit");
var backBtn = document.querySelector(".back");
var clearBtn = document.querySelector(".clear");
var highBtn = document.querySelector("#high");
var ansBtn = document.querySelector(".btn");
var hide = document.querySelector(".hide");
var time = document.querySelector("#time");
var start = document.querySelector(".start");
var quiz = document.querySelector(".quiz");
var finish = document.querySelector(".finish");
var high = document.querySelector(".high");
var qz = document.querySelector(".qz");
var your = document.querySelector("#your");
var btn1 = document.querySelector("#b1");
var btn2 = document.querySelector("#b2");
var btn3 = document.querySelector("#b3");
var btn4 = document.querySelector("#b4");
var score = document.querySelector("#score");
var initial = document.querySelector("#initial");
var left = 0;
var zero = 0;
var yourScore = 0;
var scoreLi = [];
var timeInterval ;

startBtn.addEventListener("click", function() {
    timer();
    start.setAttribute("style", "display: none");
    quiz.setAttribute("style", "display: block");
    displayQ(zero);
});

function timer() {
    left = 100;
    timeInterval = setInterval(function() {
        if (left > 0) {
            time.textContent = left;
            left --;
        } else {
            time.textContent = 0;
            your.textContent = 0;
            clearInterval(timeInterval);
            quiz.setAttribute("style", "display: none");
            finish.setAttribute("style", "display: block");
        }

    }, 1000);
}

function displayQ(zero) {
    qz.textContent = ques[zero].q;
    btn1.textContent = ques[zero].ans.a;
    btn2.textContent = ques[zero].ans.b;
    btn3.textContent = ques[zero].ans.c;
    btn4.textContent = ques[zero].ans.d; 
}

ansBtn.addEventListener("click", function(e) {
    if ((e.path[0].textContent === ques[zero].answer) && (zero === (ques.length-1))) {
        yourScore = left;
        your.textContent = (yourScore + 1);
        zero = 0;
        clearInterval(timeInterval);
        quiz.setAttribute("style", "display: none");
        finish.setAttribute("style", "display: block");
    } else if ((e.path[0].textContent === ques[zero].answer)) {
        zero++;
        displayQ(zero); 
    } else if (left > 0) {
        left = (left-10);
    }
});

submitBtn.addEventListener("click", function() {
    scoreLi.push([initial.value, yourScore]); 
    localStorage.setItem('highscore-list', JSON.stringify(scoreLi));
    
    var scoresLi = [];
    scoresLi = document.createElement("li");
    score.appendChild(scoresLi);

    for (var i = 0; i < scoreLi.length; i++) {
        scoresLi.textContent = scoreLi[i].join("   -   ");
    }
    
    score.setAttribute("style", "list-style-position: inside; background: rgba(46, 40, 110, 0.2)")
    finish.setAttribute("style", "display: none");
    high.setAttribute("style", "display: block");
    hide.setAttribute("style", "display: none");
});

backBtn.addEventListener("click", function() {
    time.textContent = 100;
    high.setAttribute("style", "display: none");
    start.setAttribute("style", "display: block");
    hide.setAttribute("style", "display: flex");
});

clearBtn.addEventListener("click",function(){
    scoreLi = [];
    
    while (score.hasChildNodes()) {
        score.removeChild(score.firstChild);
    }
    
    localStorage.removeItem('highscore-list');
});

highBtn.addEventListener("click", function() {
    high.setAttribute("style", "display: block");
    start.setAttribute("style", "display: none");
    quiz.setAttribute("style", "display: none");
    finish.setAttribute("style", "display: none");
    hide.setAttribute("style", "display: none");
    clearInterval(timeInterval);
});