async function loadSearchResults() {
  var query = JSON.parse(localStorage.getItem("search"));
  document.getElementById("search-results-header").innerHTML =
    'Search results for "' + query + '"';
  res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}}`);
  const data = res.data.data;
  if (data.length == 0) {
    document.getElementById("search-results").innerHTML = "No results found."
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].score == null ) {
      data[i].score = "N/A"
    }
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
                  </div>`;
    document.getElementById("search-results").innerHTML += result;
  }
}
