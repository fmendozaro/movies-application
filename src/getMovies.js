const getMovies = (id) => {
  let url = (id) ? `/api/movies/${id}` : "/api/movies";
  return fetch(url)
    .then(response => response.json());
};

module.exports = getMovies;