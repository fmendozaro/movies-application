const addMovie = (title, rating) => {
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

module.exports = {addMovie};