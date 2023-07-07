// Function to render movie details
function renderMovieDetails(movie) {
  const movieDetails = document.getElementById('movieDetails');
  const title = movieDetails.querySelector('h2');
  const poster = movieDetails.querySelector('#poster');
  const runtime = movieDetails.querySelector('#runtime');
  const showtime = movieDetails.querySelector('#showtime');
  const availableTickets = movieDetails.querySelector('#availableTickets');
  const buyBtn = movieDetails.querySelector('#buyBtn');

  title.textContent = movie.title;
  poster.src = movie.poster;
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  availableTickets.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
  buyBtn.disabled = movie.capacity - movie.tickets_sold === 0;
}

// Function to fetch movie details by ID
function fetchMovieData(id) {
  fetch(`http://localhost:3000/films/${id}`)
    .then(response => response.json())
    .then(movie => {
      renderMovieDetails(movie);
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });
}

// Function to render film menu
function renderFilmMenu(films) {
  const filmsList = document.getElementById('films');
  filmsList.innerHTML = '';

  films.forEach(film => {
    const filmItem = document.createElement('li');
    filmItem.textContent = film.title;
    filmItem.addEventListener('click', () => {
      fetchMovieData(film.id);
    });
    filmsList.appendChild(filmItem);
  });
}

// Function to fetch all movies
function fetchAllMovies() {
  fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(films => {
      renderFilmMenu(films);
      if (films.length > 0) {
        fetchMovieData(films[0].id);
      }
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
}

// Fetch all movies on page load
document.addEventListener('DOMContentLoaded', fetchAllMovies);
