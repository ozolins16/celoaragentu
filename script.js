// Event listener for the "Search" button
document.getElementById('search').addEventListener('click', async () => {
  // Get the selected location value
  const location = document.getElementById('location').value;

  try {
    // Make a fetch request to the server-side API endpoint, passing the selected location
    const response = await fetch(`/api/fetch-hotels?location=${location}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    
    // Display the fetched data
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    // Handle errors
    document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
  }
});
