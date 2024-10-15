document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form default submission
  
    // Get form values
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
  
    // Call the server-side API route
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, date }) // Send user input to the server
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data); // Display API response data
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = 'Error fetching data.';
    });
  });
  
  // Function to display results
  function displayResults(data) {
    let resultsHTML = '<h2>Search Results:</h2>';
    if (data && data.length > 0) {
        data.forEach(result => {
            resultsHTML += `<div>
                                <h3>Destination: ${result.destination}</h3>
                                <p>Price: ${result.price}</p>
                            </div>`;
        });
    } else {
        resultsHTML = '<p>No results found.</p>';
    }
    document.getElementById('results').innerHTML = resultsHTML;
  }
  
