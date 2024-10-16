fetch(`/api/fetch-hotels?location=LV`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
  });
