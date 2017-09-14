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
const loading = require("./loading");

const addMovie = document.getElementById("add-movie-btn");
const moviesBody = document.getElementById("moviesList");
const errorDiv = document.getElementById("error");

buildTable();

function buildTable(){
    loading.show();

    getMovies().then((movies) => {

        moviesBody.innerHTML = "";
        let moviesHMTL = "";
        movies.forEach(({title, rating, id}) => {
            moviesHMTL += `
                    <tr>
                        <td>${title}</td>
                        <td class="rating">${rating}</td>
                    </tr>`;
        });

        moviesBody.innerHTML = moviesHMTL ;
        loading.hide();

    }).catch((error) => {
        errorDiv.innerText = 'Oh no! Something went wrong.\nCheck the console for details.';
        loading.hide();
    });
}

addMovie.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let ratings = document.getElementsByName("rating");
    let rating = Array.from(ratings).filter( (radio) => radio.checked === true );
    movieActions.addMovie(title, rating[0].value, moviesBody);
    buildTable();
    $('#form-modal').modal('hide');
});