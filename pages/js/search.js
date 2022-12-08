async function handleSearch(e) {
  if (e.keyCode === 13) {
    var anime_name = document.getElementById("search").value;
    localStorage.setItem("search", JSON.stringify(anime_name));
    window.location = "./search-results.html";
  }
}

async function handleSearchMobile(e) {
  if (e.keyCode === 13) {
    var anime_name = document.getElementById("search-mobile").value;
    localStorage.setItem("search", JSON.stringify(anime_name));
    window.location = "./search-results.html";
  }
}
