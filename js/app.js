import { getMoviesbySearch, getMoviesbyType, getMoviesbyCountry, getMoviesbyGenre, getMovies } from './getApiData.js'
import { getUrlParameter } from './getUrlParameter.js';

const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const genreName = getUrlParameter(`genre`);
const countryName = getUrlParameter(`country`);
const typeName = getUrlParameter(`type`);
let count = 1;
const leftArrow = document.querySelector(".arrow__left");
const rightArrow = document.querySelector(".arrow__right");
const arrows = document.querySelector(".arrows");
const arrowPages = document.querySelector(".arrow__pages");


function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showPages(dataObj) {
    const pages = dataObj[2];
    return pages;
}

function showMovies(dataObj) {// найти более красивый способ и эффективный способ создать(клонировать) дивы
    const data = dataObj[1];
    const moviesEl = document.querySelector(".movies");
    arrows.classList.remove(".hide")
    document.querySelector(".movies").innerHTML = "";
    console.log(dataObj);
    data.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML =  `
        <div class="movie__cover--inner">
        <div class="movie__cover--darkened" id-movie = "${movie.filmId ? movie.filmId: movie.kinopoiskId}"></div>
        <img src="${movie.posterUrlPreview}"
        class="movie__cover"
        alt = "${movie.nameRu}"
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
            arrows.classList.add("hide")
            getMoviesbySearch(apiSearchUrl).then(promise => {
            showMovies(promise)
        })
        search.value = "";
    }
    arrows.classList.add(".hide");
});

// скрывать Пагинацию после поиска
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
let pageCount;
arrows.addEventListener("click", (event) => {// разбить на два ивента
    if(event.target.className == rightArrow.className) {
        if (count < pageCount){
            count++;
        }
    }
    else if(event.target.className == leftArrow.className){
       if (count > 1){
        count--;
      }
    }
    
    if(genreName){
        getMoviesbyGenre(genreName,count).then(promise => {
            showMovies(promise)
            pageCount = showPages(promise)
        })
        
    }
    else if(countryName){
        getMoviesbyCountry(countryName,count).then(promise => {
            showMovies(promise)
            pageCount = showPages(promise)
        })
    }

    else if(typeName){
        getMoviesbyType(typeName,count).then(promise => {
            showMovies(promise)
        })
    }
    else  {
        getMovies(count).then(promise => {
            showMovies(promise)
            pageCount = showPages(promise)
        })
        
     }

    arrowPages.textContent = count + " из " + pageCount;
   
});

if(genreName){
    getMoviesbyGenre(genreName).then(promise => {
        showMovies(promise)
        pageCount = showPages(promise)
        arrowPages.textContent = count + " из " + pageCount;
    })
    
}
    else if(countryName){
    console.log(countryName)
    getMoviesbyCountry(countryName).then(promise => {
        showMovies(promise)
        pageCount = showPages(promise)
        arrowPages.textContent = count + " из " + pageCount;
    })
    
}

    else if(typeName){
    getMoviesbyType(typeName).then(promise => {
        showMovies(promise)
        pageCount = showPages(promise)
        arrowPages.textContent = count + " из " + pageCount;
    })
    
}

    else  {
    getMovies().then(promise => {
       showMovies(promise)
        pageCount = showPages(promise)
       arrowPages.textContent = count + " из " + pageCount;
    })
    
 }

const menuBox = document.querySelector(".menu__box");
menuBox.onclick = (event) => {
    if (event.target.tagName!== 'A') return false;
    const typeId = event.target.getAttribute("type");
    console.log(typeId)
    window.location.href = `http://127.0.0.1:5500/main.html?type=${typeId}`
}

const movieId = document.querySelector(".movies");
movieId.onclick = (event) => {
    if (event.target.className!== 'movie__cover--darkened') return false;
    var Id = event.target.getAttribute("id-movie");
    window.location.href = `http://127.0.0.1:5500/film.html?films=${Id}`;
}












    










