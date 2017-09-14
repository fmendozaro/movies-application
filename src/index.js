/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');
const movieActions = require("./movieActions");

const overlay = document.getElementById("overlay");
const addMovie = document.getElementById("add-movie-btn");
const moviesBody = document.getElementById("moviesList");
const errorDiv = document.getElementById("error");

overlay.style.setProperty("display", "block");

function buildTable(){

    getMovies().then((movies) => {

        overlay.style.setProperty("display", "block");

        let moviesHMTL = "";
        movies.forEach(({title, rating, id}) => {
            moviesHMTL += `
                    <tr>
                        <td>${title}</td>
                        <td class="rating">${rating}</td>
                    </tr>`;
        });

        moviesBody.innerHTML = moviesHMTL ;
        overlay.style.setProperty("display", "none");

    }).catch((error) => {
        errorDiv.innerText = 'Oh no! Something went wrong.\nCheck the console for details.';
        overlay.style.setProperty("display", "none");
    });
}

buildTable();

addMovie.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let ratings = document.getElementsByName("rating");
    let rating = Array.from(ratings).filter( (radio) => radio.checked === true );
    movieActions.addMovie(title, rating[0].value, moviesBody);
    buildTable();
    $('#form-modal').modal('hide');
});