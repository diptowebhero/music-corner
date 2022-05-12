const getId = (id) => {
  return document.getElementById(id);
};

window.onload = () => {
  getArtists();
};

//selected item
const searchField = getId("search_field");
const searchBtn = getId("search_btn");
const artistsContainer = getId("artists");
const albumsContainer = getId("albums");

//clean previous data
const cleanUp = () => {
  searchField.value = "";
  artistsContainer.innerHTML = "";
  albumsContainer.innerHTML = "";
};

const getArtists = async () => {
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/2/search.php?s=${searchField.value}`
  );
  const data = await res.json();
  displayingAlbum(data);
};
searchBtn.addEventListener("click", getArtists);

const displayingAlbum = ({ artists }) => {
  cleanUp();
  const artistCardContainer = document.querySelector(".artist_card_container");

  artists?.forEach(
    ({ idArtist, strArtist, strCountry, strStyle, strArtistThumb }) => {
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="artist_card">
        <div class="img_container">
          <div class="img_container_inner">
            <img
              src=${
                strArtistThumb
                  ? strArtistThumb
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="avatar"
            />
          </div>
        </div>
        <div class="info_container">
          <h1>${strArtist ? strArtist : "Not Available"}</h1>
          <p>Country: ${strCountry ? strCountry : "Not Available"}</p>
          <p>Style: ${strStyle ? strStyle : "Not Available"}</p>
        </div>
        <div class="album_btn">
          <i class="fa-solid fa-compact-disc"></i>
          <p class="button-title" onclick="albumDetails(${idArtist})">Albums</p>
        </div>
      </div>
    `;
      artistCardContainer.appendChild(div);
    }
  );
};

const albumDetails = async (id) => {
  cleanUp();
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`
  );
  const data = await res.json();
  showAlbumDetails(data);
};

const showAlbumDetails = ({ album }) => {
  album.forEach(({ strAlbum, strAlbumThumb }) => {
    const div = document.createElement("div");
    div.innerHTML = `
   <div class="album">
        <div class="album-image-container">
          <img
            src=${
              strAlbumThumb
                ? strAlbumThumb
                : "http://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg"
            }
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${strAlbum}</h3>
        </div>
      </div>
   `;
    albumsContainer.appendChild(div);
  });
};
