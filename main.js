// Function to render films
function renderFilms(films) {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = '';
  
    films.forEach(film => {
      const filmItem = document.createElement('li');
      filmItem.innerHTML = `
        <span>${film.title}</span>
        <button class="deleteBtn" data-id="${film.id}">Delete</button>
      `;
      filmsList.appendChild(filmItem);
    });
  
    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });
  }
  
  // Function to handle the delete button click
  function handleDelete(event) {
    const filmId = event.target.dataset.id;
    
    // Make a DELETE request to the server
    fetch(`/films/${filmId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the film from the DOM
        const filmItem = event.target.parentElement;
        filmItem.remove();
      })
      .catch(error => {
        console.error('Error deleting film:', error);
      });
  }
  
  // Sample films data
  const films = [
    { id: '1', title: 'Film 1' },
    { id: '2', title: 'Film 2' },
    { id: '3', title: 'Film 3' }
  ];
  
  // Render films on page load
  document.addEventListener('DOMContentLoaded', () => {
    renderFilms(films);
  });
  