document.getElementById('search').addEventListener('click', () => {
  fetch('/api/fetch-hotels')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById('output').textContent = 'Error fetching data: ' + error.message;
    });
});
