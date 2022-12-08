async function fetchAnimeData() {
    var anime_id = JSON.parse(localStorage.getItem("anime_id"));
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${anime_id}`)
    const data = res.data.data;

    document.getElementById("anime-img").src = data.images.jpg.image_url;
    document.getElementById("anime-title").innerHTML = data.title;
    document.getElementById("anime-title-jp").innerHTML = data.title_japanese;
    document.getElementById("anime-synopsis").innerHTML = data.synopsis;
    document.getElementById("anime-rank").innerHTML = "Rank: " + data.rank;
    document.getElementById("anime-score").innerHTML = "Score: " + data.score;

    document.getElementById("anime-genres").innerHTML = "Genres: ";
    for (var i = 0; i < data.genres.length; i++) {
        document.getElementById("anime-genres").innerHTML += data.genres[i].name + ", ";
    }
    // get rid of last comma at the end lol
    document.getElementById("anime-genres").innerHTML = (document.getElementById("anime-genres").innerHTML).substr(0, (document.getElementById("anime-genres").innerHTML).length - 2);

    document.getElementById("save-watching-button").setAttribute('onclick', `saveToList(${anime_id}, "addWatching", "watching")`);
    document.getElementById("save-planned-button").setAttribute('onclick', `saveToList(${anime_id}, "addPlanned", "planned")`);
    document.getElementById("save-completed-button").setAttribute('onclick', `saveToList(${anime_id}, "addCompleted", "completed")`);
}