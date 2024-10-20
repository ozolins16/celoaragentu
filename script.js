document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');
  const hotelsContainer = document.getElementById('hotels-container');
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
    if (selectedCountry) queryParams.append('countryCode', selectedCountry);
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
        <p>Stars: ${hotel.stars}</p>
        <div class="slider-container">
          <div class="slider" id="slider-${hotel.hotelCode}">
            <!-- Images will be appended here -->
          </div>
          <button class="prev" onclick="prevSlide('${hotel.hotelCode}')">Prev</button>
          <button class="next" onclick="nextSlide('${hotel.hotelCode}')">Next</button>
        </div>
      `;
      
      // Loop through the hotel.media array to create image slides
      if (hotel.media && hotel.media.length > 0) {
        const slider = hotelDiv.querySelector(`#slider-${hotel.hotelCode}`);
        hotel.media.forEach((mediaItem, index) => {
          const img = document.createElement('img');
          img.src = mediaItem.image.midResImage;
          img.alt = `${hotel.name} - image ${index + 1}`;
          img.classList.add('slide');
          if (index === 0) {
            img.classList.add('active');  // Set the first image as active by default
          }
          slider.appendChild(img);
        });
      }

      hotelsContainer.appendChild(hotelDiv);
    });
  }
});

// Move the functions outside the displayHotels to the global scope

// Function to go to the next slide
function nextSlide(hotelCode) {
  const slider = document.getElementById(`slider-${hotelCode}`);
  const slides = slider.getElementsByClassName('slide');
  let currentIndex;

  // Find the active slide
  Array.from(slides).forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      slide.classList.remove('active');
      currentIndex = index;
    }
  });

  // Show the next slide (wrap around if at the end)
  const nextIndex = (currentIndex + 1) % slides.length;
  slides[nextIndex].classList.add('active');
}

// Function to go to the previous slide
function prevSlide(hotelCode) {
  const slider = document.getElementById(`slider-${hotelCode}`);
  const slides = slider.getElementsByClassName('slide');
  let currentIndex;

  // Find the active slide
  Array.from(slides).forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      slide.classList.remove('active');
      currentIndex = index;
    }
  });

  // Show the previous slide (wrap around if at the start)
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[prevIndex].classList.add('active');
}
