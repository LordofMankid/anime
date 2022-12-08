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