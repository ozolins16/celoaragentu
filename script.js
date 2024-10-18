// document.getElementById('search').addEventListener('click', () => {
//   fetch('/api/fetch-hotels')
//     .then(response => {
//       console.log('Status:', response.status); // Log the status code
//       console.log('Status Text:', response.statusText); // Log status text
//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.statusText} (Status: ${response.status})`);
//       }
//       const availableLocations = response.json();

//     })
//     .then(data => {
//       document.getElementById('output').textContent = JSON.stringify(data, null, 2);
//     })
//     .catch(error => {
//       document.getElementById('output').textContent = 'Error fetching data: ' + error.message;
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');

  // Fetch country data from the backend API route
  fetch('/api/fetch-hotels')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      populateCountryOptions(data);
    })
    .catch(error => {
      console.error('Error fetching country data:', error.message);
    });

  // Function to populate the <select> element with options (countries only)
  function populateCountryOptions(data) {
    const destinations = data.destinations_tab;

    // Loop through each country in the destinations_tab
    for (const countryCode in destinations) {
      if (destinations.hasOwnProperty(countryCode)) {
        const cities = destinations[countryCode];

        // Get the country name from the first city (all cities in the same country share the same country name)
        const countryName = cities[0].country_name;

        // Create a new <option> element
        const option = document.createElement('option');
        option.value = countryCode;  // Set the value to the country code
        option.textContent = countryName;  // Set the display text to the country name

        // Append the <option> to the <select> element
        locationSelect.appendChild(option);
      }
    }
  }
});


// Call the function to populate the <select> on page load
populateLocationOptions();