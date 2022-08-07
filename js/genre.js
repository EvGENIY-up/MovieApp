const API_CATEGORY = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";
const API_KEY = "cd4e1799-f6ca-46c7-ab71-c623da4a915b";

getGenre(API_CATEGORY);

async function getGenre(url) {
    const resp = await fetch(url, {
       headers: {
           "Content-Type": "application/json",
           "X-API-KEY": API_KEY,
       },
    });
    const respData = await resp.json();
    showGenre(respData);
};

function showGenre(data) {
     const genreList = document.querySelector(".genre-list");   
    data.genres.forEach((genre) => {
        const genreItem = document.createElement("li");
        genreItem.classList.add("genre__item");
        genreItem.textContent = genre.genre; 
        genreItem.setAttribute("id-genre",genre.id) 
    genreList.appendChild(genreItem);
    });
}

const genreList = document.querySelector(".genre-list");

genreList.onclick = (event) => {
    if (event.target.tagName!== 'LI') return false;
    const genreId = event.target.getAttribute("id-genre");
    window.location.href = `http://127.0.0.1:5500/main.html?genre=${genreId}`
}






 