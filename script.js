document.getElementById('fetchDataBtn').addEventListener('click', () => {
    fetch('/api/fetch-hotels')  // This URL points to your Vercel serverless function
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
  