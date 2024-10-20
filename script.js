document.addEventListener('DOMContentLoaded', () => {
  const destinationSelect = document.getElementById('destination');
  const datePicker = document.getElementById('date-picker');
  const searchButton = document.getElementById('search');
  const results = document.getElementById('results');

  // Step 1: Populate the destination dropdown (assuming you have this implemented)
  fetch('/api/fetch-destinations')  // Example endpoint for fetching destinations
    .then(response => response.json())
    .then(data => populateDestinationOptions(data))
    .catch(error => console.error('Error fetching destinations:', error));

  function populateDestinationOptions(data) {
    // Assuming the data format has destination codes and names
    data.forEach(destination => {
      const option = document.createElement('option');
      option.value = destination.countryCode; // Example: "AE"
      option.textContent = destination.countryName; // Example: "United Arab Emirates"
      destinationSelect.appendChild(option);
    });
  }

  // Step 2: When the user selects a destination, fetch the available dates
  destinationSelect.addEventListener('change', () => {
    const selectedDestination = destinationSelect.value;

    if (selectedDestination) {
      fetchAvailableDates(selectedDestination);
    }
  });

  // Function to fetch available dates for the selected destination
  function fetchAvailableDates(countryCode) {
    const apiUrl = `/api/fetch-hotel-offers?countryCode=${countryCode}`; // Replace with the actual endpoint for fetching hotel offers

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const availableDates = extractAvailableDates(data); // You need to extract the available dates from the API response
        initializeDatePicker(availableDates); // Initialize date picker with the available dates
      })
      .catch(error => console.error('Error fetching available dates:', error));
  }

  // Function to extract available dates from the API response
  function extractAvailableDates(data) {
    // Assuming the API response contains available date ranges for the hotels or flights
    // You would need to adjust this based on the actual response structure
    const availableDates = data.map(offer => offer.check_in_from); // Adjust as per response format
    return availableDates;
  }

  // Function to initialize the date picker with available dates
  function initializeDatePicker(availableDates) {
    flatpickr(datePicker, {
      enable: availableDates.map(date => new Date(date)),  // Enable only available dates
      dateFormat: "Y-m-d",
    });
  }

  // Step 3: Search button logic (fetch hotel or flight data based on selected destination and date)
  searchButton.addEventListener('click', () => {
    const selectedDestination = destinationSelect.value;
    const selectedDate = datePicker.value;

    if (selectedDestination && selectedDate) {
      // Fetch the hotel or flight details based on the selected destination and date
      const apiUrl = `/api/fetch-hotel-offers?countryCode=${selectedDestination}&check_in_from=${selectedDate}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching hotels/flights:', error));
    } else {
      alert('Please select a destination and date.');
    }
  });

  function displayResults(data) {
    results.innerHTML = ''; // Clear previous results
    // Render the hotel/flight data in the results div
    data.forEach(offer => {
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = `
        <h3>${offer.name}</h3>
        <p>Price: ${offer.price}</p>
        <p>Available from: ${offer.check_in_from}</p>
      `;
      results.appendChild(resultDiv);
    });
  }
});
