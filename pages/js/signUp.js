var form = document.getElementById("signup-form");
var username = document.getElementById("username");


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

(function () {

    'use strict'

    //Fetch all the forms we want to apply custom Boostratp validation styles to

    var forms = document.querySelectorAll('.needs-validation');

    //Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            
            form.addEventListener('submit', function (event) {
                
                if (!form.checkValidity()) 
                {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })

    })()

    // server-side javascript validation
    async function checkEmailValidity() {

        button.classList.add('loading');
    }



