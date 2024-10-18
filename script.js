document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');  // Make sure this is correctly declared here
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');

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

  // Add event listener for the Search button
  searchButton.addEventListener('click', () => {
    const selectedCountry = locationSelect.value; // Get the selected country code
    if (selectedCountry) {
      // Make an API request with the selected country
      fetchHotelsForCountry(selectedCountry);
    } else {
      results.textContent = 'Please select a country.';
    }
  });

  // Function to fetch hotels for the selected country
  function fetchHotelsForCountry(countryCode) {
    // Ensure that the API endpoint is correct
    fetch(`/api/list-hotels?countryCode=${countryCode}`)  // Removed the "[]" notation
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch hotels for country ${countryCode}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        displayResults(data);  // Display the results on the page
      })
      .catch(error => {
        results.textContent = `Error fetching hotels: ${error.message}`;
      });
  }

  // Function to display the results
  function displayResults(data) {
    results.textContent = JSON.stringify(data, null, 2);  // Pretty print the results in <pre> tag
  }
});
