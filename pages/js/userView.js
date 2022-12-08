async function getCurrentUserData() {
    var user = JSON.parse(localStorage.getItem("community_user"));
    if (user == null) {
        window.location = "./community.html";
    } else {
        document.getElementById("profile-username").innerHTML = user;
        const res = await axios.get(
            `http://localhost:8080/api/user/${user}`
        );
        document.getElementById("profile-pic").src = `./assets/profile-pics/profile-pic-${res.data.profile_pic}.png`
        displayAboutMe(res.data.about);
        displayStats(res.data.completed);
        displayGenres(res.data.completed);
        displayLists(res.data);
    }
}

function displayAboutMe(about) {
    document.getElementById("about").innerHTML = about;
    document.getElementById("about-text-edit").value = about;
}

// display stats
async function displayStats(completed_array) {
    if (completed_array.length == 0) {
        return;
    }
    var total_watchtime = 0;
    var score_total = 0;
    for (var i = 0; i < completed_array.length; i++) {
        const res = await axios.get(
            `https://api.jikan.moe/v4/anime/${completed_array[i]}`
        )
        let anime_data = res.data.data;
        total_watchtime += (anime_data.episodes * 22);
        score_total += anime_data.score;
    }

    document.getElementById("stat-total-watched").innerHTML = completed_array.length;
    document.getElementById("stat-total-watchtime").innerHTML = (total_watchtime / 60 / 24).toFixed(1);
    document.getElementById("stat-mean-score").innerHTML = (score_total / completed_array.length).toFixed(1);
}

// display genres
async function displayGenres(completed_array) {
    if (completed_array.length == 0) {
        return;
    }
    var genres_dict = {};

    for (var i = 0; i < completed_array.length; i++) {
        const res = await axios.get(
            `https://api.jikan.moe/v4/anime/${completed_array[i]}`
        )
        let anime_genres = res.data.data.genres;
        for (var j = 0; j < anime_genres.length; j++) {
            genres_dict[anime_genres[j].name] = (genres_dict[anime_genres[j].name] || 0) + 1
        }
    }
    genres_dict = sort_dict(genres_dict);
    var count = 1;
    var max_genre_count = genres_dict[Object.keys(genres_dict)[0]];
    var colors = ["#61A7A5", "#BEDAC3", "#CFDA7E", "#D5DA25", "#F4D3B4"];
    for (key in genres_dict) {
        document.getElementById(`genre-label-${count}`).innerHTML = key;
        document.getElementById(`genre-${count}`).innerHTML = genres_dict[key];
        document.getElementById(`genre-${count}-box`).style.height = `max(10vh / ${max_genre_count} * ${genres_dict[key]}, 10vw / ${max_genre_count} * ${genres_dict[key]})`;
        document.getElementById(`genre-${count}-box`).style.backgroundColor = colors[count - 1];
        count++;
        if (count == 6) {
            break;
        }
    }
}

function sort_dict(obj) {
    items = Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    sorted_obj = {}
    $.each(items, function (k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return (sorted_obj)
}

// switch between lists
async function switchLists(list) {
    switch (list) {
        case ("watching"):
            document.getElementById("watching").style.display = "grid";
            document.getElementById("watching-selected").style.display = "grid";
            document.getElementById("completed").style.display = "none";
            document.getElementById("completed-selected").style.display = "none";
            document.getElementById("planned").style.display = "none";
            document.getElementById("planned-selected").style.display = "none";
            break;
        case ("planned"):
            document.getElementById("planned").style.display = "grid";
            document.getElementById("planned-selected").style.display = "grid";
            document.getElementById("completed").style.display = "none";
            document.getElementById("completed-selected").style.display = "none";
            document.getElementById("watching").style.display = "none";
            document.getElementById("watching-selected").style.display = "none";
            break;
        case ("completed"):
            document.getElementById("completed").style.display = "grid";
            document.getElementById("completed-selected").style.display = "grid";
            document.getElementById("planned").style.display = "none";
            document.getElementById("planned-selected").style.display = "none";
            document.getElementById("watching").style.display = "none";
            document.getElementById("watching-selected").style.display = "none";
            break;
    }
}

// display lists of the users
async function displayLists(data) {
    document.getElementById("completed").style.display = "none";
    document.getElementById("planned").style.display = "none";
    document.getElementById("planned-selected").style.display = "none";
    document.getElementById("completed-selected").style.display = "none";

    let watching_results = document.getElementById("watching");
    watching_results.innerHTML =
        `<div class='list-header'>
                  <h5>Image</h5>
                  <h5>Title</h5>
                  <h5 class='list-genre-header'>Genre</h5>
                  <h5>Score</h5>
              </div>`;
    watching_array = data.watching;
    for (var i = 0; i < watching_array.length; i++) {
        const res = await axios.get(
            `https://api.jikan.moe/v4/anime/${watching_array[i]}`
        );
        let anime_data = res.data.data;

        // add data to the html div
        watching_results.innerHTML +=
            `<div class='list-data'>` +
            `<img style='width:50%; cursor:pointer;' src="${anime_data.images.jpg.image_url}" onclick='viewAnime(${anime_data.mal_id})' />` +
            `<h6 onclick='viewAnime(${anime_data.mal_id})' style="cursor: pointer;">${anime_data.title} (${anime_data.title_japanese})</h6>` +
            `<h6 class='list-data-genre'>${anime_data.genres[0].name}</h6>` +
            `<h6>${anime_data.score}</h6>`;
    }
    if (watching_array.length == 0) {
        watching_results.innerHTML = "<h5>No shows currently watching.</h5>"
    }

    let planned_results = document.getElementById("planned");
    planned_results.innerHTML =
        `<div class='list-header'>
                  <h5>Image</h5>
                  <h5>Title</h5>
                  <h5 class='list-genre-header'>Genre</h5>
                  <h5>Score</h5>
              </div>`;
    planned_array = data.planned;
    for (var i = 0; i < planned_array.length; i++) {
        const res = await axios.get(
            `https://api.jikan.moe/v4/anime/${planned_array[i]}`
        );
        let anime_data = res.data.data;

        // add data to the html div
        planned_results.innerHTML +=
            `<div class='list-data'>` +
            `<img style='width:50%; cursor:pointer;' src="${anime_data.images.jpg.image_url}" onclick='viewAnime(${anime_data.mal_id})' />` +
            `<h6 onclick='viewAnime(${anime_data.mal_id})' style="cursor: pointer;">${anime_data.title} (${anime_data.title_japanese})</h6>` +
            `<h6 class='list-data-genre'>${anime_data.genres[0].name}</h6>` +
            `<h6>${anime_data.score}</h6>`;
    }
    if (planned_array.length == 0) {
        planned_results.innerHTML = "<h5>No shows planned to watch.</h5>"
    }

    let completed_results = document.getElementById("completed");
    completed_results.innerHTML =
        `<div class='list-header'>
                  <h5>Image</h5>
                  <h5>Title</h5>
                  <h5 class='list-genre-header'>Genre</h5>
                  <h5>Score</h5>
              </div>`;
    completed_array = data.completed;
    for (var i = 0; i < completed_array.length; i++) {
        const res = await axios.get(
            `https://api.jikan.moe/v4/anime/${completed_array[i]}`
        );
        let anime_data = res.data.data;

        // add data to the html div
        completed_results.innerHTML +=
            `<div class='list-data'>` +
            `<img style='width:50%; cursor:pointer;' src="${anime_data.images.jpg.image_url}" onclick='viewAnime(${anime_data.mal_id})' />` +
            `<h6 onclick='viewAnime(${anime_data.mal_id})' style="cursor: pointer;">${anime_data.title} (${anime_data.title_japanese})</h6>` +
            `<h6 class='list-data-genre'>${anime_data.genres[0].name}</h6>` +
            `<h6>${anime_data.score}</h6>`;
    }
    if (completed_array.length == 0) {
        completed_results.innerHTML = "<h5>No shows completed.</h5>"
    }
}