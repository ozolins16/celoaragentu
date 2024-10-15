document.getElementById('testApiButton').addEventListener('click', function() {
    // The full URL with samo_action and version already included
    const apiUrl = "https://ozolins16.github.io/celoaragentu/export/default.php?samo_action=api&version=1.0";
    
    // Add the required query parameters (oauth_token, type, action)
    const params = new URLSearchParams({
        oauth_token: '450c0605a2824ed7be80329b04f9716e',  // Replace with your actual oauth token
        type: 'json',  // Use 'json' to get the response in JSON format
        action: 'SearchTour_TOWNFROMS'  // This is the action you're calling in the API
    });

    // Send the GET request using fetch
//     fetch(apiUrl + '&' + params.toString())  // Append the parameters to the URL
//         .then(response => response.json())  // Parse the response as JSON
//         .then(data => handleApiResponse(data))  // Handle the successful response
//         .catch(error => handleApiError(error));  // Handle any errors
// });

fetch(apiUrl + '&' + params.toString())
    .then(response => response.text())  // Use text() to get the raw response as a string
    .then(data => {
        console.log(data);  // Log the raw response
        try {
            // Attempt to parse JSON manually
            const jsonData = JSON.parse(data);
            handleApiResponse(jsonData);
        } catch (error) {
            handleApiError(error);
        }
    })
    .catch(error => handleApiError(error));


// Function to handle the response when it's successful
function handleApiResponse(data) {
    const responseDiv = document.getElementById('response');
    responseDiv.classList.remove('error');  // Remove error class
    responseDiv.innerHTML = "<h2>API Response:</h2>";

    // Check if the response contains the data we expect
    if (data && data.SearchTour_TOWNFROMS && Array.isArray(data.SearchTour_TOWNFROMS)) {
        responseDiv.innerHTML += "<ul>" + data.SearchTour_TOWNFROMS.map(item => {
            return `<li>Tour ID: ${item.id}, Name: ${item.name}</li>`;
        }).join('') + "</ul>";
    } else {
        responseDiv.innerHTML += "<p>No data found</p>";
    }
}

// Function to handle errors from the API
function handleApiError(error) {
    const responseDiv = document.getElementById('response');
    responseDiv.classList.add('error');  // Add error class
    responseDiv.innerHTML = `<h2>Error:</h2><p>${error.message}</p>`;
}