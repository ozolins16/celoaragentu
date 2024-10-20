document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');
  const hotelsContainer = document.getElementById('hotels-container');

  // Input for adults
  const adultsInput = document.getElementById('adults');

  // Fetch country data from the backend API (fetches list of destinations)
  fetch('/api/fetch-hotels')  // This will fetch `list-destinations-tab` since no countryCode is provided
    .then(response => response.json())
    .then(data => populateCountryOptions(data))
    .catch(error => {
      results.textContent = `Error fetching country data: ${error.message}`;
    });

  // Populate the <select> element with country options
  function populateCountryOptions(data) {
    const destinations = data.destinations_tab;
    for (const countryCode in destinations) {
      if (destinations.hasOwnProperty(countryCode)) {
        const countryName = destinations[countryCode][0].country_name;
        const option = document.createElement('option');
        option.value = countryCode;
        option.textContent = countryName;
        locationSelect.appendChild(option);
      }
    }
  }

  // Add event listener for the Search button
  searchButton.addEventListener('click', () => {
    const selectedCountry = locationSelect.value;
    const adults = adultsInput.value;

    // Construct query string
    const queryParams = new URLSearchParams();
    if (selectedCountry) queryParams.append('country_code[]', selectedCountry);
    if (adults) queryParams.append('adults', adults);

    // Make the API request with the constructed query string
    fetch(`/api/fetch-hotels?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => displayHotels(data.hotels))  // Adjust based on actual API response
      .catch(error => {
        results.textContent = `Error fetching hotels: ${error.message}`;
      });
  });

  // Function to display hotels
  function displayHotels(hotels) {
    hotelsContainer.innerHTML = '';  // Clear previous results

    hotels.forEach(hotel => {
      const hotelDiv = document.createElement('div');
      hotelDiv.className = 'hotel';
      hotelDiv.innerHTML = `
        <h2>${hotel.name}</h2>
        <p>Location: ${hotel.city}, ${hotel.country}</p>
        <p>Rating: ${hotel.rating} / ${hotel.maxRating}</p>
      `;
      if (hotel.media && hotel.media.length > 0) {
        const img = document.createElement('img');
        img.src = hotel.media[0].image.midResImage;
        img.alt = hotel.name;
        hotelDiv.appendChild(img);
      }
      hotelsContainer.appendChild(hotelDiv);
    });
  }
});
