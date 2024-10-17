document.getElementById('search').addEventListener('click', async () => {
  // Get the selected location (country code) value from the dropdown
  const location = document.getElementById('location').value;

  try {
    // Fetch all the hotel data from your backend
    const response = await fetch('/api/fetch-hotels');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Filter the hotels by the country code
    const filteredHotels = data.hotels.filter(hotel => hotel.countryCode === location);

    // Display the filtered hotels on the page
    document.getElementById('output').textContent = JSON.stringify(filteredHotels, null, 2);
  } catch (error) {
    document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
  }
});
