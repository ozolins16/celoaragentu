// document.getElementById('search').addEventListener('click', async () => {
//   // Get the selected location value from the dropdown
//   const location = document.getElementById('location').value;

//   try {
//     // Make a fetch request to the server-side API (fetch-hotels.js)
//     const response = await fetch(`/api/fetch-hotels?countryCode[]=${location}`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Display the fetched data on the page
//     document.getElementById('output').textContent = JSON.stringify(data, null, 2);
//   } catch (error) {
//     document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
//   }
// });

// document.getElementById('search').addEventListener('click', async () => {
//   const location = document.getElementById('location').value;

//   try {
//     const response = await fetch(`/api/fetch-hotels?location=${location}`);
//     const data = await response.json();

//     // Display the raw data to inspect
//     document.getElementById('output').textContent = JSON.stringify(data, null, 2);
//   } catch (error) {
//     document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
//   }
// });

document.getElementById('search').addEventListener('click', async () => {
  // Get the selected country code from the dropdown
  const selectedCountryCode = document.getElementById('location').value;

  try {
    // Fetch hotel data from your custom API
    const response = await fetch('/api/fetch-hotels'); // Adjust the path if necessary

    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Filter hotels based on the selected country code
    const filteredHotels = data.hotels.filter(hotel => hotel.countryCode === selectedCountryCode);

    // Display the filtered hotels on the page
    document.getElementById('output').textContent = JSON.stringify(filteredHotels, null, 2);
  } catch (error) {
    document.getElementById('output').textContent = 'Error fetching hotels: ' + error.message;
  }
});

