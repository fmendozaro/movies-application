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

const addMovie = $("#add-movie-btn");
const moviesBody = $("#moviesList");
const errorDiv = $("#error");

buildTable();

function addTableEvents() {

    $("table").off().delegate(".edit-btn", "click", function(){
        let id = $(this).data("dbid");
        let movie = getMovies(id).then( () => response.json() );
        console.log(movie.then( (data) => console.log(data) ));
    });

    $("table").off().delegate(".delete-btn", "click", function(){
        let id = $(this).data("dbid");
        movieActions.remove(id)
            .then( () => response.json() )
            .catch( (error) => console.log(error) );
        buildTable();
    });

}

function buildTable(){
    loading.show();

    getMovies().then((movies) => {

        moviesBody.empty();
        let moviesHMTL = "";
        movies.reverse().forEach( ({title, rating, id}) => {
            moviesHMTL += `
                    <tr>
                        <td>${title}</td>
                        <td class="rating">${rating}</td>
                        <td class="actions">
                            <button class="edit-btn btn btn-warning data-toggle="modal" data-target="#form-modal" data-dbid =${id}>Edit</button>
                            <button class="delete-btn btn btn-danger" data-dbid =${id}>Delete</button>
                        </td>
                    </tr>`;
        });

        moviesBody.html(moviesHMTL);

        addTableEvents();

        loading.hide();

    }).catch((error) => {
        errorDiv.text = `Oh no! Something went wrong.\nCheck the console for details. ERROR: ${error}`;
        loading.hide();
    });
}

addMovie.click( (e) => {
    e.preventDefault();
    $('#form-modal').modal('hide');
    loading.show();
    let title = $("#title").val();
    let ratings = $("input[name=rating]");
    let rating = Array.from(ratings).filter( (radio) => radio.checked === true );
    let addsMovie = movieActions.add(title, rating[0].value);
    // let addsMovie = movieActions.editMovie(1, title, rating[0].value);
    addsMovie.then( () => {
        loading.hide();
        buildTable();
    }).catch( (error) => {
        console.error(error);
    });
});
