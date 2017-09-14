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
                        <td class="rating">
                            <button class="edit-btn btn btn-warning" data-dbid =${id}>Edit</button>
                            <button class="delete-btn btn btn-danger" data-dbid =${id}>Delete</button>
                        </td>
                    </tr>`;
        });

        moviesBody.html(moviesHMTL);
        loading.hide();

    }).catch((error) => {
        errorDiv.text = `Oh no! Something went wrong.\nCheck the console for details. ERROR: ${error}`;
        loading.hide();
    });
}

const editBtns = $(".edit-btn");
const deleteBtns = $(".delete-btn");

editBtns.click( () => {
    console.log($(this).data("id"));
});

addMovie.click( (e) => {
    e.preventDefault();
    $('#form-modal').modal('hide');
    loading.show();
    let title = $("#title").val();
    let ratings = $("input[name=rating]");
    let rating = Array.from(ratings).filter( (radio) => radio.checked === true );
    let addsMovie = movieActions.addMovie(title, rating[0].value, moviesBody);
    addsMovie.then( () => {
        loading.hide();
        buildTable();
    }).catch( () => {

    });
});