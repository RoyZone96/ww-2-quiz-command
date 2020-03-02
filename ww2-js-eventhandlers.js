// base line values
let currentQuestion = 0;
let currentScore = 0

//handles updating the score

function initializeApp() {
  checkAnswerScore();
  handleQuizApp();
}

function resetScoreBoard() {
  currentQuestion = 0
  currentScore = 0
  $('.score-number').text(currentScore)
  $('.question-number').text(currentQuestion)
}

function updateCurrentScore() {
  currentScore++;
  $('.score-number').text(currentScore)
}

function updateQuestionNumber() {
  currentQuestion++;
  $('.question-number').text(currentQuestion)
}

//01 When page loads do this
function handleQuizApp() {
  beginQuiz();
  restartQuiz()
}


//02 when a user clicks on start quiz button 
function beginQuiz() {
  $('.begin-quiz').on('click', function () {
    displayQuestions(currentQuestion);
    displayOptions(currentOptions);
    $('.score-number').text(0);
    $('.introduction').hide();
    $('.begin-quiz').hide()  
  })
}

//03 displays the question set
function displayQuestions(currentQuestion) {

  const htmlOutput = $(`<form class = "quiz-block">
      <fieldset id= "answer-pool">
        <legend class= "question">${STORE[currentQuestion].question}</legend>
      </fieldset>
<button class= "submission">CHARGE!</button>
    </form>`)
  $('.block-this').html(htmlOutput)
}

// //04 Displays the options for the current question and submission button.


function displayOptions(currentOptions) {
  STORE[currentQuestion].answers.forEach(function (answerLabel) {
    $("#answer-pool").append(`<label class="choice" for="${answerLabel}">
    <input type="radio" name="answer" id="${answerLabel} " value="${answerLabel}">${answerLabel}</input>
    </label>`);
  });
}


//05 checks whether the chosen option is right or wrong and displays respective message
function checkAnswerScore() {
  $(document).on('click', '.submission', function (event) {
    event.preventDefault();
    let userAnswer = $("input[name='answer']:checked").val();
    if (userAnswer === undefined) {
     alert('Hang on! Please choose an answer!')
    }
    else {
       $('.wait').remove()
      if (userAnswer === STORE[currentQuestion].correctAnswer) {
        updateCurrentScore()
        let output = null;
        output = `<section class = "right-answer">
       <h2>They made it through!</h2>
       <img src="images/right-answer.jpg" alt="squad made it through!" class="images" width="200px">
       <input type = "hidden" class= "currentQuestion" value = "${currentQuestion}" />
      <button class ="next">
      Next group
      </button>
      </section>`;
        $('.block-this').html(output);
      }
      else {
        let output = null;
        output = `<section class= "wrong-answer">
       <h2>We've got a squad down!</h2>
       <img src="images/wrong-answer.jpg" alt="we have a man down!" class="images" width="200px">
       <h3 class= "correction">${STORE[currentQuestion].correctAnswer}</h3>
       <input type = "hidden" class= "currentQuestion" value = "${currentQuestion}" />
       <button class ="next">
       Next group
       </button>
       </section>`
        $('.block-this').html(output);
      }
      $('.block-this').hide()
      $('#answer-pool').hide()
      $('submission').remove()
      $('.block-this').show();
      updateQuestionNumber()
    }
  })
}


$(document).on('click', '.next', function (event) {
  event.preventDefault();
  $('.right-answer').hide();
  $('.wrong-answer').hide();
  let currentQuestionNum = $(this).parent().find('.currentQuestion').val()
  //if final question do not incriment!
  currentQuestionNum++
  if (currentQuestionNum < STORE.length) {
    displayQuestions(currentQuestionNum++);
    displayOptions(currentQuestionNum++)
  }
  else {
    endOfLine()
  }
})


//06 checks whether it reached the end of questions list 
function endOfLine() {
  if (currentScore <= 7) {
    ending = $(`<p>Though the day has been won, many men have lost their lives due to your lack of Knowledge. </p>
    <img src="images/bad-ending.jpg" alt="Medals of Honor for all." class="images" width="200px">
      <button class = "retry-quiz">Retake Quiz</button>
    </section>`)

  }
  else if (currentScore >= 8) {
    ending = $(`<p>You have used your intelligence wisely and your unit has minimized the casualties. <strong>Congradulations, commander!</strong></p>
           <img src="images/good-ending.jpg" alt="Medals of Honor for all." class="images" width="200px">
      <button class = "retry-quiz">Retake Quiz</button>`)
  }
  $('.block-this').html(ending)
}


//07 handles restarting the quiz and score
function restartQuiz() {
  $(document).on('click', '.retry-quiz', function (event) {
    event.preventDefault();
    resetScoreBoard();
    $('.block-this').html('<p class = "introduction"> Imagine you are a commander during the invasion of Normandy. Knowledge is important to keep your men alive. Keep at least 6 landing ships alive to get the good ending. <strong>Good luck commander</strong>.</p><button class= "begin-quiz">Begin</button>');
    beginQuiz();
    $('.introduction').show();
    $(`.begin-quiz`).show();
  })
}







$(initializeApp);