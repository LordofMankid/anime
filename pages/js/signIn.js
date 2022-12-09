var login_form = document.getElementById("login-form");
var login_name = document.getElementById("username");
var signup_button = document.getElementById("signup");
var login_password = document.getElementById("password");
var username_feedback = document.getElementById("username-feedback");
var password_feedback = document.getElementById("password-feedback");
const collection = document.getElementsByClassName("invalid-feedback");

var success = false;
let statusCode = 0;

async function signInUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = {
    username: username,
    password: password,
  };

  if (!login_form.checkValidity()) {
    for (let i = 0; i < collection.length; i++) {
      collection[i].innerHTML += "You left this blank!";
    }
    login_form.classList.add("was-validated");
  } else {
    for (let i = 0; i < collection.length; i++) {
      collection[i].innerHTML = "";
    }
    const res = await axios
      .post("http://localhost:8080/api/auth/signin", user)
      .catch((err) => {
        statusCode = err.response.status;
        console.log(statusCode);
        if (statusCode == 401) {
          console.log("hi");
          password_feedback.innerHTML += "Your password is incorrect.";
          login_password.classList.add("is-invalid");
        }
        if (statusCode == 404) {
          username_feedback.innerHTML += "Username not found. Sign up instead?";

          login_name.classList.add("is-invalid");
        }
      });
    console.log(res.data);
    success = true;
    localStorage.setItem("user", JSON.stringify(res.data));
    history.back();
  }
}

login_password.addEventListener(
  "change",
  function () {
    login_form.classList.remove("was-validated");
    for (let i = 0; i < collection.length; i++) {
      collection[i].innerHTML = "";
    }
    this.classList.remove("is-invalid");
    this.setCustomValidity("");
  },
  false
);

login_name.addEventListener(
  "change",
  function () {
    login_form.classList.remove("was-validated");
    for (let i = 0; i < collection.length; i++) {
      collection[i].innerHTML = "";
    }
    this.classList.remove("is-invalid");
    this.setCustomValidity("");
  },
  false
);
