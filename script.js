document.getElementById('search').addEventListener('click', async () => {
  // Get the selected country code from the dropdown or input field
  const countryCode = document.getElementById('location').value;

  try {
    // Fetch all hotels from the server-side API (fetch-hotels.js)
    const response = await fetch('/api/fetch-hotels');

    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Filter the hotels based on the selected country code
    const filteredHotels = data.hotels.filter(hotel => hotel.countryCode === countryCode);

    // Display the filtered hotels on the page
    document.getElementById('output').textContent = JSON.stringify(filteredHotels, null, 2);
  } catch (error) {
    document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
  }
});
