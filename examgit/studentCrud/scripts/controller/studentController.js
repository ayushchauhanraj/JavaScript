window.addEventListener("load", init);
function init() {
  registerEvent();
  document.getElementById("questionbox").style.display = "none";
  userName();
}
function registerEvent() {
  document.getElementById("signout").addEventListener("click", signOut);
}
function userName() {
  //document.getElementById("userId").innerText = firebase.auth().currentUser.uid;
  document.getElementById("startExam").addEventListener("click", startExam);
}
function startExam() {
  document.getElementById("rules").style.display = "none";
  document.getElementById("questionbox").style.display = "block";
  document.getElementById("end").style.display = "none";
  document.getElementById("end").addEventListener("click", endFunction);
  allQuestion.loadQuestion(buildQuiz);
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  console.log(allQuestion.myQuestion);

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  console.log(document.querySelectorAll(".slide"));

  // showSlide(0);
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
}
function showResults() {
  const answerContainers = document
    .getElementById("quiz")
    .querySelectorAll(".answers");

  let numCorrect = 0;
  let score = 0;
  allQuestion.myQuestion.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    //alert(userAnswer);

    if (userAnswer === currentQuestion.rans) {
      numCorrect++;
      score += parseInt(currentQuestion.score);
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      answerContainers[questionNumber].style.color = "red";
      document.getElementById("results").innerHTML =
        "Right Option are ${currentQuestion.rans} ";
    }
  });

  document.getElementById("results").innerHTML = `${numCorrect} Right Out Of ${
    allQuestion.myQuestion.length
  } Score: ${score}`;
  document.getElementById("end").style.display = "block";
}
function showSlide(n) {
  document
    .querySelectorAll(".slide")
    [currentSlide].classList.remove("active-slide");
  document.querySelectorAll(".slide")[n].classList.add("active-slide");
  currentSlide = n;

  if (currentSlide === 0) {
    document.getElementById("previous").style.display = "none";
  } else {
    document.getElementById("previous").style.display = "inline-block";
  }

  if (currentSlide === document.querySelectorAll(".slide").length - 1) {
    document.getElementById("next").style.display = "none";
    document.getElementById("submit").style.display = "inline-block";
  } else {
    document.getElementById("next").style.display = "inline-block";
    document.getElementById("submit").style.display = "none";
  }
}

var currentSlide = 0;
function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

function buildQuiz() {
  const output = [];
  allQuestion.myQuestion.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    const ansindex = ["a", "b", "c", "d"];
    for (let index = 0; index <= 3; index++) {
      answers.push(
        `<label>
        <input type='radio' name="question${questionNumber}" value="${
          ansindex[index]
        }">${ansindex[index]}:
        ${currentQuestion.options[index]}
        </label>`
      );
    }
    output.push(
      `<div class="slide">
        <div class="question">${currentQuestion.name}</div>
        <div class="answers">${answers.join("")}</div>
      </div>`
    );
  });
  console.log(document.getElementById("quiz"));
  // console.log(output.join(""));
  document.getElementById("quiz").innerHTML = output.join("");
  SetTimer();
}
function signOut() {
  var userId = firebase.auth().currentUser.uid;
  console.log(userId);
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location.href = "index.html";
    })
    .catch(function(error) {});
}
function SetTimer() {
  createTimer(timerval, 60);
  var timer, totalSecounds;
  function createTimer(timerId, time) {
    timer = document.getElementById(timerId);
    totalSecounds = time;
    updateTimer();
    window.setTimeout(function() {
      Tick();
    }, 1000);
  }
  function Tick() {
    totalSecounds -= 1;
    if (totalSecounds == -1) {
      alert("Time Up");
      end();
    } else {
      updateTimer();
      window.setTimeout(function() {
        Tick();
      }, 1000);
    }
  }
  function updateTimer() {
    document.getElementById("timerval").innerHTML = `Timer : ${totalSecounds}`;
  }
}
function endFunction() {
  // end();
  document.getElementById("rules").style.display = "block";
  document.getElementById("questionbox").style.display = "none";
}
function end() {
  document.getElementById("next").style.display = "none";
  document.getElementById("end").style.display = "block";
  document.getElementById("previous").style.display = "none";
  document.getElementById("submit").style.display = "none";
}
