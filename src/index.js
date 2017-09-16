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
const addFormBtn = $("#show-add-form");

buildTable();

function addTableEvents() {

    $("table").off().delegate(".edit-btn", "click", function(){
        let id = $(this).data("dbid");
        console.log(id);

        // $("#modal-title").html("Edit movie");
        // $("#add-movie-btn").hide();
        // $("#edit-movie-btn").show();
        //
        // getMovies(id).then( (data) => {
        //     $("#title").val(data.title);
        //     $("#rating").attr("checked", "checked");
        // } );
        // buildTable();
    });

    $("table").off().delegate(".delete-btn", "click", function(){
        loading.show();
        let id = $(this).data("dbid");
        movieActions.remove(id)
            .then( (response) => {
                console.log(response);
                buildTable();
            });
    });

}

function buildTable(){
    loading.show();

    getMovies().then((movies) => {

        moviesBody.empty();
        let moviesHMTL = "";
        movies.reverse().forEach( ({title, rating, id}) => {

            let stars = "";

            for(let i = 1;i <= rating;i++){
                stars += "&#9733;";
            }

            moviesHMTL += `
                    <tr>
                        <td>${title}</td>
                        <td class="rating">${stars}</td>
                        <td class="actions">
                            <button class="edit-btn btn btn-warning" data-toggle="modal" data-target="#form-modal" data-dbid=${id}>Edit</button>
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

addFormBtn.click( (e) => {
    e.preventDefault();
    let addForm = $("#add-movie-form")[0];
    addForm.reset();
    $("#modal-title").html("Add a movie");
    $("#add-movie-btn").show();
    $("#edit-movie-btn").hide();
});

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
