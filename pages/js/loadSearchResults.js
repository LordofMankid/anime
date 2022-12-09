async function loadSearchResults() {
  var query = JSON.parse(localStorage.getItem("search"));
  document.getElementById("search-results-header").innerHTML = 'Search results for "' + query + '"'
  res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}}`);
  const data = res.data.data;
  for (var i = 0; i < data.length; i++) {
    var result = `<div class="result">
                    <div class="image-wrapper" onclick="viewAnime(${data[i].mal_id})">
                        <img src="${data[i].images.jpg.image_url}"/>
                    </div>
                    <div class="result-info">
                        <h5 onclick="viewAnime(${data[i].mal_id})" style="cursor: pointer;">${data[i].title}</h5>
                        <p>
                            Aired: ${data[i].aired.string}
                            <br>
                            Score: ${data[i].score}
                        </p>
                    </div>
                    <a href="#" class="btn btn-primary" onclick="viewAnime(${data[i].mal_id})">View</a>
                  </div>`;
    document.getElementById("search-results").innerHTML += result;
  }
}

