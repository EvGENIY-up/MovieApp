import { getMoviesbyId, getMoviesTeaserbyId } from "./getApiData.js";
import { getUrlParameter } from './getUrlParameter.js';
const filmName = getUrlParameter(`films`);

function showFilm(data) {
    const filmImg = document.querySelector(".poster__img");
    filmImg.src = data.posterUrlPreview;
    const titleRus = document.querySelector(".title-rus")
    titleRus.textContent = data.nameRu
    const titleEng = document.querySelector(".title-eng")
    titleEng.textContent = data.nameOriginal
    const description = document.querySelector(".description")
    description.textContent = data.description
    const year = document.querySelector(".year")
    year.textContent = data.year
    const country = document.querySelector(".country")
    country.textContent = data.countries.map((country) => ` ${country.country}`)
    const genre = document.querySelector(".genre")
    genre.textContent = data.genres.map((genre) => ` ${genre.genre}`)
    const slogan = document.querySelector(".slogan")
    slogan.textContent = data.slogan ? data.slogan : "Отсутствует"
    const raiting = document.querySelector(".raiting")
    raiting.textContent = data.ratingKinopoisk
    const reviews = document.querySelector(".reviews")
    reviews.textContent = data.reviewsCount + " рецензии"
    const coverBody = document.querySelector(".cover-url")
    coverBody.src = data.coverUrl
}

const trailer = document.querySelector(".trailer__img")
trailer.addEventListener ("click", () => {
    getMoviesTeaserbyId(filmName).then(promise => {
        const href = promise.items[0].url
        window.location.href = href
    })
})



if (filmName) {
    getMoviesbyId(filmName).then(promise => {
        showFilm(promise)
    })
     getMoviesTeaserbyId(filmName).then(promise => {
        console.log(promise)
    })
}



    
 




