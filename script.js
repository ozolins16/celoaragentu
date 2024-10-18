document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');
  const hotelsContainer = document.getElementById('hotels-container'); 
  
  // Fetch country data from the backend API route
  fetch('/api/fetch-hotels')
    .then(response => response.json())
    .then(data => populateCountryOptions(data))
    .catch(error => console.error('Error fetching country data:', error.message));

  // Populate country options
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
    if (selectedCountry) {
      fetchHotelsForCountry(selectedCountry);
    } else {
      results.textContent = 'Please select a country.';
    }
  });

  // Fetch hotels for the selected country
  function fetchHotelsForCountry(countryCode) {
    fetch(`/api/fetch-hotels?countryCode=${countryCode}`) 
      .then(response => response.json())
      .then(data => displayHotels(data.hotels))  // `hotels` is the key in the returned data
      .catch(error => {
        results.textContent = `Error fetching hotels: ${error.message}`;
      });
  }

  // Function to display hotels
  function displayHotels(hotels) {
    // Clear previous hotels
    hotelsContainer.innerHTML = '';

    // Loop through each hotel and create HTML for it
    hotels.forEach(hotel => {
      const hotelDiv = document.createElement('div');
      hotelDiv.className = 'hotel';

      // Add hotel name
      const hotelName = document.createElement('h2');
      hotelName.textContent = hotel.name;
      hotelDiv.appendChild(hotelName);

      // Add hotel image
      if (hotel.media && hotel.media.length > 0) {
        const hotelImg = document.createElement('img');
        hotelImg.src = hotel.media[0].image.midResImage;  // Use midResImage for better quality
        hotelImg.alt = hotel.name;
        hotelDiv.appendChild(hotelImg);
      }

      // Add hotel location
      const hotelLocation = document.createElement('p');
      hotelLocation.textContent = `Location: ${hotel.city}, ${hotel.country}`;
      hotelDiv.appendChild(hotelLocation);

      // Add hotel rating
      const hotelRating = document.createElement('p');
      hotelRating.textContent = `Rating: ${hotel.rating} / ${hotel.maxRating}`;
      hotelDiv.appendChild(hotelRating);

      // Append hotelDiv to the container
      hotelsContainer.appendChild(hotelDiv);
    });
  }
});
