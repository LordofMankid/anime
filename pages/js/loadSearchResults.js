async function loadSearchResults() {
  var query = JSON.parse(localStorage.getItem("search"));
  res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}}`);
  const data = res.data.data;
  for (var i = 0; i < data.length; i++) {
    var result = `<div class='card'>
                    <div class="img-wrapper">
                        <img src="${data[i].images.jpg.image_url}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">
                            Aired: ${data[i].aired.string}
                            <br>
                            Score: ${data[i].score}
                        </p>
                        <a href="#" class="btn btn-primary" onclick="viewAnime(${data[i].mal_id})">View</a>
                    </div>
                    </div>`;
    document.getElementById("search-container").innerHTML += result;
  }
}

