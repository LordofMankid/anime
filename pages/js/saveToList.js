async function saveToList(anime_id, route, list_name) {
  var user = JSON.parse(localStorage.getItem('user'));
  if (user == null) {
    window.location = "../pages/login.html";
  }

  var data = {
    anime_id: anime_id,
  }

  const res = await axios.put(`http://localhost:8080/api/user/${route}/${user.username}`, data)
  if (res.data.message != null) {
    document.getElementById(`error`).innerHTML = "Already in " + list_name + " list."
    document.getElementById(`error`).style.color = "red";
  } else {
    document.getElementById(`error`).innerHTML = "Successfully added to " + list_name + " list."
    document.getElementById(`error`).style.color = "green";
  }
}
