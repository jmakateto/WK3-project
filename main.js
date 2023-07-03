// Add event listener to the purchase button
const purchaseBtn = document.getElementById('purchaseBtn');
if (purchaseBtn) {
  purchaseBtn.addEventListener('click', handlePurchase);
}

// Add event listeners to the delete buttons
const deleteButtons = document.querySelectorAll('.deleteBtn');
deleteButtons.forEach(btn => {
  btn.addEventListener('click', handleDelete);
});

// Function to handle the purchase button click
function handlePurchase() {
  // Logic for purchasing a ticket
  // Send the appropriate request to the server
}

// Function to handle the delete button click
function handleDelete(event) {
  // Logic for deleting a film
  // Send the appropriate request to the server
}
