const API_CATEGORY = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";
const API_KEY = "cd4e1799-f6ca-46c7-ab71-c623da4a915b";

getCountries(API_CATEGORY);

async function getCountries(url) {
    const resp = await fetch(url, {
       headers: {
           "Content-Type": "application/json",
           "X-API-KEY": API_KEY,
       },
    });
    const respData = await resp.json();
    showCountries(respData);
};

function showCountries(data) {
     const countriesList = document.querySelector(".countries-list");   
    data.countries.forEach((country) => {
        const countryItem = document.createElement("li");
        countryItem.classList.add("country__item");
        countryItem.textContent = country.country; 
        countryItem.setAttribute("id-country",country.id) 
        countriesList.appendChild(countryItem);
    });
}

const countriesList = document.querySelector(".countries-list");

countriesList.onclick = (event) => {
    if (event.target.tagName!== 'LI') return false;
    const countryId = event.target.getAttribute("id-country");
    window.location.href = `http://127.0.0.1:5500/main.html?country=${countryId}`
}