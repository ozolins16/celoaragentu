document.getElementById('search').addEventListener('click', () => {
  fetch('/api/fetch-hotels')
    .then(response => {
      console.log('Status:', response.status); // Log the status code
      console.log('Status Text:', response.statusText); // Log status text
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText} (Status: ${response.status})`);
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
