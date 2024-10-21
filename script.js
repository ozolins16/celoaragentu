document.addEventListener('DOMContentLoaded', () => {
  const locationSelect = document.getElementById('location');
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');
  const hotelsContainer = document.getElementById('hotels-container');
  const adultsInput = document.getElementById('adults');
  const pagination = document.getElementById('pagination');

  let currentPage = 1;  // Initialize current page

  // Fetch country data from the backend API (fetches list of destinations)
  fetch('/api/fetch-hotels')
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
    currentPage = 1;  // Reset to page 1 on new search
    fetchHotels(currentPage);
  });

  // Function to fetch hotels with the current page
  function fetchHotels(page) {
    const selectedCountry = locationSelect.value;
    const adults = adultsInput.value;

    // Construct query string
    const queryParams = new URLSearchParams();
    if (selectedCountry) queryParams.append('countryCode', selectedCountry);
    if (adults) queryParams.append('adults', adults);
    if (page) queryParams.append('page', page);

    // Make the API request with the constructed query string
    fetch(`/api/fetch-hotels?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => {
        displayHotels(data.hotels);  // Adjust based on actual API response
        setupPagination(data.pager);  // Handle pagination
      })
      .catch(error => {
        results.textContent = `Error fetching hotels: ${error.message}`;
      });
  }

  // Function to display hotels with image slider
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
          <button class="prev" data-hotel="${hotel.hotelCode}">Prev</button>
          <button class="next" data-hotel="${hotel.hotelCode}">Next</button>
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
          } else {
            img.classList.add('hidden');  // Hide other images by default
          }
          slider.appendChild(img);
        });
      }

      hotelsContainer.appendChild(hotelDiv);
    });

    // Attach event listeners to next and prev buttons
    document.querySelectorAll('.next').forEach(button => {
      button.addEventListener('click', (e) => {
        const hotelCode = e.target.getAttribute('data-hotel');
        nextSlide(hotelCode);
      });
    });

    document.querySelectorAll('.prev').forEach(button => {
      button.addEventListener('click', (e) => {
        const hotelCode = e.target.getAttribute('data-hotel');
        prevSlide(hotelCode);
      });
    });
  }

  // Function to set up pagination
  function setupPagination(pager) {
    pagination.innerHTML = '';  // Clear previous pagination controls

    // "Previous" button
    if (pager.page > 1) {
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.addEventListener('click', () => {
        currentPage--;
        fetchHotels(currentPage);
      });
      pagination.appendChild(prevButton);
    }

    // "Next" button
    if (pager.page < pager.total_pages) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', () => {
        currentPage++;
        fetchHotels(currentPage);
      });
      pagination.appendChild(nextButton);
    }
  }
});
