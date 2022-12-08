function viewAnime(id) {
    localStorage.setItem("anime_id", JSON.stringify(id));
    window.location = "./anime-view.html";
  }