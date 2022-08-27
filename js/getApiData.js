const API_KEY = "cd4e1799-f6ca-46c7-ab71-c623da4a915b";
const API_PAGE_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_FILTER = "https://kinopoiskapiunofficial.tech/api/v2.2/films?"
const apiUrlId = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

async function getMoviesTeaserbyId(Id) {
    let url = apiUrlId
    url = `${url}${Id}/videos`
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        const respData = await resp.json();
            
        return respData;
        };

async function getMoviesbyId(Id) {
    let url = apiUrlId
    url = `${url}${Id}`
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        const respData = await resp.json();
            
        return respData;
        };

async function getMoviesbySearch(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
            
    return {1:respData.films};
    };

async function getMoviesbyType(type,count=1) {
let url = API_URL_FILTER
url = `${url}type=${type}&page=${count}`
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
        
    return {1:respData.items, 2:respData.totalPages};
    };

async function getMoviesbyCountry(country,count=1) {
let url = API_URL_FILTER
url = `${url}countries=${country}&page=${count}`
    const resp = await fetch(url, {
       headers: {
           "Content-Type": "application/json",
           "X-API-KEY": API_KEY,
       },
    });
    const respData = await resp.json();
    
    return {1:respData.items, 2:respData.totalPages};
};

async function getMoviesbyGenre(genre,count=1) {
let url = API_URL_FILTER
url = `${url}genres=${genre}&page=${count}`
    const resp = await fetch(url, {
       headers: {
           "Content-Type": "application/json",
           "X-API-KEY": API_KEY,
       },
    });
    const respData = await resp.json();
    
    return {1:respData.items, 2:respData.totalPages};
};

async function getMovies(count = 1) {
let url = API_PAGE_URL
url = `${url}${count}`
 const resp = await fetch(url, {
    headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
    },
 });
 const respData = await resp.json();
 return {1:respData.films, 2:respData.pagesCount} ;
};

export { getMoviesbySearch, getMoviesbyType, getMoviesbyCountry, getMoviesbyGenre, getMovies, getMoviesbyId, getMoviesTeaserbyId }