var submit_form = document.getElementById("signup-form");
var username = document.getElementById("username");
var button = document.getElementById("submit");
var signup_email = document.getElementById("email");

async function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const user = {
    username: username,
    email: email,
    password: password,
  };
  const res = await axios.post("http://localhost:8080/api/auth/signup", user);
  console.log(res.data);
  window.location = "./login.html";
}

// javascript validation, -- inspiration from sample code @bootstrap

submit_form.addEventListener(
  "submit",
  async function (event) {
    if (
      !submit_form.checkValidity() ||
      (await checkValidity(username)) === false ||
      (await checkValidity(email)) === false
    ) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log("user registered");
    }
    submit_form.classList.add("was-validated");
  },
  false
);

// client-side javascript validation for username
// this triggers an async server side validation

async function checkValidity(el) {
  // set button to loading button
  button.classList.add("loading");

  el.classList.remove("is-invalid");
  el.classList.remove("is-valid");

  // triggers async request to the server

  var valid;
  if (el == username) {
    valid = await validateUsername(el.value);
  } else if (el == email) {
    valid = await validateEmail(el.value);
  }

  // changes username validity tags according to the server's response
  if (valid && el.value.length != 0) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    el.setCustomValidity("");
  } else {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
    el.setCustomValidity("invalid");
  }

  button.classList.remove("loading");

  return valid;
}

// username validation(server-side)
async function validateUsername(val) {
  if (val.length == 0) {
    return false;
  } else {
    var result = await axios.get(
      `http://localhost:8080/api/checkUsername/${val}`
    );
    var valid = false;
    console.log(val);
    console.log(result);

    if (result.data === "") {
      valid = true;
    } else {
      valid = false;
    }

    return valid;
  }
}

username.addEventListener(
  "blur",
  function (event) {
    if (event.relatedTarget != button) checkValidity(this);
  },
  false
);

email.addEventListener("blur", function (event) {
  if (event.relatedTarget != button) checkValidity(this);
});
username.addEventListener(
  "change",
  function (event) {
    this.classList.remove("is-invalid");
    this.setCustomValidity("");
  },
  false
);

// username validation(server-side)
async function validateEmail(val) {
  if (val.length == 0) {
    return false;
  } else {
    var result = await axios.get(`http://localhost:8080/api/checkEmail/${val}`);
    var valid = false;
    console.log(val);
    console.log(result);

    if (result.data === "") {
      valid = true;
      console.log(result.data);
      console.log("valid email");
    } else {
      valid = false;
      console.log(result.data);
      console.log("invalid email; taken");
    }
    return valid;
  }
}
