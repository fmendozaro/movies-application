/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

let overlay = document.getElementById("overlay");
let showBtn = document.getElementById("show-add-form");
let addForm = document.getElementById("add-movie-form");
let addMovie = document.getElementById("add-movie");
overlay.style.setProperty("display", "block");

getMovies().then((movies) => {

    let moviesDiv = document.getElementById("movies");
    let moviesHMTL = "";
    movies.forEach(({title, rating, id}) => {
    moviesHMTL += `<div>
                    <span class="movie-title">Title: ${title}</span>
                    <span class="rating">Rating: ${rating}</span>
                   </div>`;
    });

    moviesDiv.innerHTML = moviesHMTL ;
    overlay.style.setProperty("display", "none");

}).catch((error) => {
    let errorDiv = document.getElementById("error");
    errorDiv.innerText = 'Oh no! Something went wrong.\nCheck the console for details.';
});

showBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    addForm.classList.remove("hidden");
});

addMovie.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.getElementById("title");
    let rating = document.getElementsByName("rating");
    
});