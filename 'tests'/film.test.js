const { purchaseTicket, deleteFilm } = require('../src/film');
const fetchMock = require('fetch-mock');

// Mock the fetch function to simulate API requests
global.fetch = fetchMock.sandbox();

// Mock the DOM elements and functions
document.body.innerHTML = `
  <button id="purchaseBtn">Purchase</button>
  <ul id="films">
    <li data-id="1">
      Film 1
      <button class="deleteBtn">Delete</button>
    </li>
    <li data-id="2">
      Film 2
      <button class="deleteBtn">Delete</button>
    </li>
  </ul>
`;

test('purchaseTicket updates tickets_sold on the server', async () => {
  // Simulate a successful API response
  fetchMock.patchOnce('/films/1', {
    status: 200,
    body: {
      id: '1',
      title: 'The Giant Gila Monster',
      runtime: '108',
      capacity: 30,
      showtime: '04:00PM',
      tickets_sold: 29,
      description: 'A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.',
      poster: 'https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg'
    }
  });

  // Simulate a click on the purchase button
  const purchaseBtn = document.getElementById('purchaseBtn');
  purchaseBtn.click();

  // Wait for the async operation to complete
  await new Promise(resolve => setTimeout(resolve, 0));

  // Verify that the tickets_sold value is updated on the server
  const updatedFilm = await fetch('/films/1').then(response => response.json());
  expect(updatedFilm.tickets_sold).toBe(29);
});

test('deleteFilm removes the film from the list and server', async () => {
  // Simulate a successful API response
  fetchMock.deleteOnce('/films/1', { status: 200 });

  // Simulate a click on the delete button for Film 1
  const deleteBtn = document.querySelector('[data-id="1"] .deleteBtn');
  deleteBtn.click();

  // Wait for the async operation to complete
  await new Promise(resolve => setTimeout(resolve, 0));

  // Verify that Film 1 is removed from the DOM
  const filmsList = document.getElementById('films');
  expect(filmsList.innerHTML).not.toContain('Film 1');

  // Verify that the film is deleted on the server
  const film1Response = await fetch('/films/1');
  expect(film1Response.status).toBe(404);
});
