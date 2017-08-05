/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

let overlay = document.getElementById("overlay")
overlay.style.setProperty("display", "block");

getMovies().then((movies) => {

    console.log('Here are all the movies:');
    let moviesDiv = document.getElementById("movies");
    let moviesHMTL = "";
    movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
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
