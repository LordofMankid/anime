async function fetchAllData() {
  fetchTopAnime();
  fetchGeneralAnime();
}


async function fetchTopAnime() {
  res = await fetch("https://api.jikan.moe/v4/top/anime")
    .then((res) => res.json())
    .then((data) => {
      data = data.data;
      for (var i = 0; i < 10; i++) {
        var result_fetch = `<div class='carousel-item ${i == 0 ? "active" : ""}'>
              <div class='card'>
                  <div class="img-wrapper">
                      <img src="${data[i].images.jpg.image_url}">
                  </div>
                  <div class="card-body" onclick="viewAnime(${data[i].mal_id})">
                      <h5 class="card-title">${data[i].title}</h5>
                      <p class="card-text">
                          Aired: ${data[i].aired.string}
                          <br>
                          Score: ${data[i].score}
                          <br>
                          Genre: ${data[i].genres[0].name}
                      </p>
                  </div>
              </div>
            </div>`;
        document.getElementById("carousel-inner").innerHTML += result_fetch;
      }
    })
    .catch((error) => console.log(error));

  initialiseCarousel();
}


async function fetchGeneralAnime() {
  res = await fetch("https://api.jikan.moe/v4/anime")
    .then((res) => res.json())
    .then((data) => {
      data = data.data;
      for (var i = 0; i < 10; i++) {
        var bg_img = data[i].images.jpg.image_url;
        var result_fetch = `<div class='carousel-item ${i == 0 ? "active" : "" }'>
                <div class='card' style="background-image: url('${bg_img}');">
                    <div class="card-body" onclick="viewAnime(${data[i].mal_id})">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">
                            Aired: ${data[i].aired.string}
                            <br>
                            Score: ${data[i].score}
                            <br>
                            Genre: ${data[i].genres[0].name}
                        </p>
                    </div>
                </div>
            </div>`;
        document.getElementById("carousel-inner-2").innerHTML += result_fetch;
      }
    })
    .catch((error) => console.log(error));

  initialiseCarousel();
}


