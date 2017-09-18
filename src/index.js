/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const movieAPI = require('./movieAPI.js');
const loading = require("./loading");

const addBtn = $("#add-movie-btn");
const editBtn = $("#edit-movie-btn");
const moviesBody = $("#moviesList");
const addFormBtn = $("#show-add-form");
const inputs = $("#show-add-form :input");

buildTable();

function addTableEvents() {

    $("tbody").off().delegate(".edit-btns", "click", function(){
        let id = $(this).data("dbid");

        $("#modal-title").html("Edit movie");
        $("#add-movie-btn").hide();
        $("#edit-movie-btn").show();

        movieAPI.get(id).then( (data) => {
            $("#title").val(data.title);
            $("#dbid").val(id);
            $("input[name=rating]").eq(data.rating-1).prop("checked", "checked");
        });
    });

    $("table").off().delegate(".delete-btns", "click", function(){
        loading.show();
        let id = $(this).data("dbid");
        movieAPI.remove(id)
            .then( (response) => {
                console.log(response);
                buildTable();
            });
    });

}

function buildTable(){
    loading.show();

    movieAPI.get().then((movies) => {

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
                            <button class="edit-btns btn btn-warning" data-toggle="modal" data-target="#form-modal" data-dbid=${id}>Edit</button>
                            <button class="delete-btns btn btn-danger" data-dbid =${id}>Delete</button>
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

function addOrEdit(e, action){

    e.preventDefault();
    $('#form-modal').modal('hide');
    loading.show();
    let title = $("#title").val();
    let ratings = $("input[name=rating]");
    let id = $("#dbid").val();
    let rating = Array.from(ratings).filter( (radio) => radio.checked === true );

    if(action === "add"){

        let addsMovie = movieAPI.add(title, rating[0].value);
        // let addsMovie = movieAPI.editMovie(1, title, rating[0].value);
        addsMovie.then( () => {
            loading.hide();
            buildTable();
        }).catch( (error) => {
            console.error(error);
        });

    }else{
        //Edit
        let editsMovie = movieAPI.edit(id, title, rating[0].value);
        // let addsMovie = movieAPI.editMovie(1, title, rating[0].value);
        editsMovie.then( () => {
            loading.hide();
            buildTable();
        }).catch( (error) => {
            console.error(error);
        });
    }

}

addFormBtn.click( (e) => {
    e.preventDefault();
    let addForm = $("#add-movie-form")[0];
    addForm.reset();
    $("#modal-title").html("Add a movie");
    $("#add-movie-btn").show();
    $("#edit-movie-btn").hide();
});

addBtn.click( (e) => {
    addOrEdit(e, "add");
});

editBtn.click( (e) => {
    addOrEdit(e, "edit");
});
