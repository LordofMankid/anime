
var submit_form = document.getElementById("signup-form");
var username = document.getElementById("username");
var button = document.getElementById("submit");

async function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const user = {
        username: username,
        email: email,
        password: password
    }
    const res = await axios.post("http://localhost:8080/api/auth/signup", user);
    console.log(res.data);
    window.location = "./login.html";
}

// javascript validation, -- inspiration from sample code @bootstrap

submit_form.addEventListener('submit', async function (event) {

    if (!submit_form.checkValidity() || await checkUsernameValidity(username) === false) {
        event.preventDefault()
        event.stopPropagation()
    }
    submit_form.classList.add('was-validated')
}, false);


// server-side javascript validation
async function checkUsernameValidity(el) {

    // set button to loading button
    button.classList.add('loading');
    console.log("hi");

    
    // triggers async request to the server
    var valid = await validateUsername(el.value);

   
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

    

    button.classList.remove('loading');

    return valid;
}


async function validateUsername(val) {

    var result = await axios.get(`http://localhost:8080/api/checkUsername/${val}`);
    var valid = false;
    console.log(val);
    console.log(result)

    if (result.data === "") {
        valid = true;
        console.log(result.data);
        console.log("valid username")
    } else {
        valid = false;
        console.log(result.data);
        console.log("invalid username; taken");
    }

    return valid;

}

username.addEventListener('blur', function (event) {
    if (event.relatedTarget != button) checkUsernameValidity(this);
}, false);

username.addEventListener('change', function (event) {

    this.classList.remove("is-invalid");
    this.setCustomValidity("");

}, false);