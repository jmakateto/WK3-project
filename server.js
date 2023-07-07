const express = require('express');
const app = express();
const moviesData = require('./db.json');

// Endpoint to get all movies
app.get('/films', (req, res) => {
  res.json(moviesData);
});

// Endpoint to get a specific movie by ID
app.get('/films/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = moviesData.find(movie => movie.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
