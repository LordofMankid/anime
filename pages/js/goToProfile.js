function goToProfile() {
  var user = JSON.parse(localStorage.getItem("user"));
  if (user != null) {
    window.location = "./profile.html";
  } else {
    window.location = "./login.html";
  }
}
