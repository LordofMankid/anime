async function getUsers() {
    var res = await axios.get("http://localhost:8080/api/users");
    var users = res.data;
    for (var i = 0; i < users.length; i++) {
        document.getElementById("users-container").innerHTML +=
            `<div class="user-box">
                  <img class='profile-pic' onclick="viewUser('${users[i].username}')" style="cursor:pointer;" src='./assets/profile-pics/profile-pic-${users[i].profile_pic}.png'/>
                  <br><br>
                  <div class='user-info'>
                      <div onclick="viewUser('${users[i].username}')" style="cursor:pointer;">
                          <h3>${users[i].username}</h3>
                      </div>
                      <br>
                      ${users[i].about}
                  </div>
              </div>`;
    }
}

function viewUser(username) {
    localStorage.setItem("community_user", JSON.stringify(username));
    window.location = "./user-view.html";
}