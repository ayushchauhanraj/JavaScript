window.addEventListener("load", init);

// function init() {
//   document.qu
// }
function init() {
  clickLogin();
  clickRegister();
  document.getElementById("submit").addEventListener("click", doLogin);
  document.getElementById("reg").addEventListener("click", register);
  document.getElementById("clearall").addEventListener("click", clearall);
  document.getElementById("loginButton").addEventListener("click", clickLogin);
  document
    .getElementById("loginRegister")
    .addEventListener("click", clickRegister);
  document.getElementById("loginButton").addEventListener("click", clickLogin);
}

const clickLogin = () => {
  console.log(document.getElementById("register").classList.value);
  if (document.getElementById("register").classList.value == "clickRegister") {
    clickRegister();
  }
  document.querySelector("#login").classList.toggle("clickLogin");
};

const clickRegister = () => {
  if (document.getElementById("login").classList == "clickLogin") {
    clicklogin();
  }
  document.querySelector("#register").classList.toggle("clickRegister");
};

function doLogin() {
  var userid = document.getElementById("userId").value;
  var pass = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userid, pass)
    .then(data => {
      if (!userid.localeCompare("a@gmail.com")) {
        window.location.href = "crud.html";
      } else {
        window.location.href = "student.html";
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      alert("Invalid Email and Password");
    });
  //   if (userid && pass) {
  //     var status = searchData(userid, pass);
  //     if (status == "1") {
  //     } else {
  //       alert("Invalid userId and Password");
  //     }
  //   } else {
  //     alert("Fill the form");
  //   }
}

function searchData(userid, pass) {
  var datauser = firebase.database().ref("/users");
  var name = 0;
  var pass = 0;
  datauser.once("value").then("value", snapshot => {
    var allQuestionsObj = snapshot.val();
    console.log(allQuestionsObj);
    console.log(allQuestionsObj[userid].password);
    if (allQuestionsObj[userid]) {
      name = 1;
      if (allQuestionsObj[userid].password == pass) {
        location();
      }
    }
    if (name == "1" && pass == "1") {
      return 1;
    }
  });
}
function clearall() {
  document.getElementById("userId").value = "";
  document.getElementById("password").value = "";
  document.getElementById("ruserId").value = "";
  document.getElementById("rpassword").value = "";
  document.getElementById("cPassword").value = "";
}
function register() {
  //.log(document.getElementById("login").classList);

  var user = document.querySelector("#ruserId").value;
  var cpass = document.querySelector("#cPassword").value;
  var pass = document.querySelector("#rpassword").value;
  if (pass == cpass && user) {
    // var obj = { password: pass, totalMarks: 0, correct: 0, wrong: 0 };
    // var promise = firebase
    //   .database()
    //   .ref("/users/" + user)
    //   .set(obj);
    // promise
    //   .then(data => alert("Register successfully Now login"))
    //   .catch(error => {
    //     alert("someThing went Wrong");
    //     console.log(error);
    //   });
    firebase
      .auth()
      .createUserWithEmailAndPassword(user, pass)
      .then(data => {
        alert("Successfully registerd Now login");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
      });
  }
}
