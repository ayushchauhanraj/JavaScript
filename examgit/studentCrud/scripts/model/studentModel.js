const allQuestion = {
  myQuestion: [],
  loadQuestion(fn) {
    var questions = firebase.database().ref("/questions");
    questions.on("value", snapshot => {
      var allQuestionsObj = snapshot.val();

      for (let key in allQuestionsObj) {
        var questionObj = allQuestionsObj[key];
        this.myQuestion.push(questionObj);
      }
      buildQuiz();
      showSlide(0);
    });
  }
};
