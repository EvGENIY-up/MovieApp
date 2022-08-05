const API_KEY = "cd4e1799-f6ca-46c7-ab71-c623da4a915b";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_PAGE_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_FILTER = "https://kinopoiskapiunofficial.tech/api/v2.2/films?"
const genreName = getUrlParameter(`genre`);


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
    
    for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    
    if (sParameterName[0] === sParam) {
    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
    }
    return false;
    };



async function getMoviesbyGenre(genre) {
    let url = API_URL_FILTER
    url = `${url}genres=${genre}`
        const resp = await fetch(url, {
           headers: {
               "Content-Type": "application/json",
               "X-API-KEY": API_KEY,
           },
        });
        const respData = await resp.json();
        return respData.items;
    };



async function getMovies(url) {
     const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
     });
     const respData = await resp.json();
     return respData.films ;
};


function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}




function showMovies(data) {// найти более красивый способ и эффективный способ создать(клонировать) дивы
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";
    data.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML =  `
        <div class="movie__cover--inner">
        <div class="movie__cover--darkened"></div>
        <img src="${movie.posterUrlPreview}"
        class="movie__cover"
        alt = ${movie.nameRu}
        >
    </div>
    <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
        <div class="movie__average movie__average--${getClassByRate(movie.rating ? movie.rating : movie.ratingKinopoisk)}">${movie.rating ? movie.rating : movie.ratingKinopoisk}</div> 
    </div>
    `;
    // всю логику отображения в отдельной странице.
    moviesEl.appendChild(movieEl);     
    });
}



const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
});

const pageCount = 5;
let count = 1;
const leftArrow = document.querySelector(".arrow__left");
const rightArrow = document.querySelector(".arrow__right");
const arrows = document.querySelector(".arrows");
const arrowPages = document.querySelector(".arrow__pages");
arrowPages.textContent = count + " из " + pageCount;
/* 
let thisarrow = event.target
if (count < pageCount){
thisarrow.classlist.remove(hiude)
otherarrow.classlist.remove(hiude)
count + thisarrow.somevariable()
} else {
    thisarrow.hide
}
*/


arrows.addEventListener("click", (event) => {// разбить на два ивента
    if(event.target.className == rightArrow.className) {
        if (count < pageCount){
            count++;
            rightArrow.classList.remove("hide");
            leftArrow.classList.remove("hide");
        }
        else { 
            rightArrow.classList.add("hide");
        }
    }
    else if(event.target.className == leftArrow.className){
       if (count > 1){
        count--;
        leftArrow.classList.remove("hide");
        rightArrow.classList.remove("hide");
      }
        else  { 
        leftArrow.classList.add("hide");
      }
    }
    arrowPages.textContent = count + " из " + pageCount;
    const apiPageUrlNumber = `${API_PAGE_URL}${count}`;
    getMovies(apiPageUrlNumber);
   
});




if(genreName){

    getMoviesbyGenre(genreName).then(promise => {
        showMovies(promise)
    })
    
}  else {
    getMovies(API_URL_POPULAR).then(promise => {
        showMovies(promise)
    })
    
}
    










