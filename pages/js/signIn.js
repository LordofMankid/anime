async function signInUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = {
        username: username,
        password: password
    }
    const res = await axios.post("http://localhost:8080/api/auth/signin", user);
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    window.location = "./profile.html";
}