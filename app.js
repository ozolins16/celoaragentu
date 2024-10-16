document.getElementById('fetchDataBtn').addEventListener('click', () => {
    fetch('https://cors-anywhere.herokuapp.com/https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0'
      }
    })
    .then(response => {
      console.log('Status:', response.status);  // Log the status code
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
  