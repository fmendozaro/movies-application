const get = (id) => {
  let url = (id) ? `/api/movies/${id}` : "/api/movies";
  return fetch(url)
    .then(response => response.json());
};

const add = (title, rating) => {
    return fetch("/api/movies", {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({title, rating})
    }).then( (response) => {
        response.json();
    });
};

const edit = (id, title, rating) => {
    return fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({title, rating})
    }).then( (response) => {
        response.json();
    });
};

const remove = (id) => {
    return fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "DELETE"
    }).then( (response) => {
        response.json();
    }).catch( (error) => console.log(error));
};

module.exports = {add, edit, remove, get};