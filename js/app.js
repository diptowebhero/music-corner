const getId = (id) => {
  return document.getElementById(id);
};

window.onload = ()=>{
  getArtists()
}

//selected item
const searchField = getId("search_field");
const searchBtn = getId('search_btn')
const artistsContainer = getId('artists')


//clean previous data
const cleanUp = ()=>{
  searchField.value = '';
  artistsContainer.innerHTML = '';
}

const getArtists = async () => {
  const res = await fetch(
    `https://theaudiodb.com/api/v1/json/2/search.php?s=${searchField.value}`
  );
  const data = await res.json();
  displayingAlbum(data);
 
};
searchBtn.addEventListener('click',getArtists)


const displayingAlbum = ({artists}) =>{
  cleanUp();
  const artistCardContainer = document.querySelector('.artist_card_container');
  
  artists.forEach(({idArtist,strArtist,strCountry,strStyle,strArtistThumb}) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="artist_card">
        <div class="img_container">
          <div class="img_container_inner">
            <img
              src=${strArtistThumb ? strArtistThumb : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
              alt="avatar"
            />
          </div>
        </div>
        <div class="info_container">
          <h1>${strArtist}</h1>
          <p>Country: ${strCountry}</p>
          <p>Style: ${strStyle}</p>
        </div>
        <div class="album_btn">
          <i class="fa-solid fa-compact-disc"></i>
          <p class="button-title">Albums</p>
        </div>
      </div>
    `
    artistCardContainer.appendChild(div)
  });
  
}