document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');
  const hotelsContainer = document.getElementById('hotels-container');
  const adultsInput = document.getElementById('adults');  // Assuming an input for adults
  const childrenInput = document.getElementById('children');  // Assuming an input for children

  // Add event listener for the Search button
  searchButton.addEventListener('click', () => {
    const selectedCountry = locationSelect.value;
    const adults = adultsInput.value;  // Get number of adults
    const children = childrenInput.value;  // Get number of children

    // Construct query string using URLSearchParams
    const queryParams = new URLSearchParams();

    if (selectedCountry) {
      queryParams.append('country_code[]', selectedCountry);
    }
    if (adults) {
      queryParams.append('adults', adults);
    }
    if (children) {
      queryParams.append('children', children);
    }

    // Make the API request with the constructed query string
    fetch(`/api/fetch-hotels?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => displayHotels(data.hotels))
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
