import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36'
      }
    });
    res.status(200).json(response.data);  // Send the API data to the client
  } catch (error) {
    console.error('Error fetching hotel data:', error.message);  // Log the specific error message
    console.error('Error details:', error.response?.data);  // Log any specific response error details
    res.status(500).json({
      message: 'Error fetching hotel data',
      error: error.message,
      details: error.response?.data || 'No further details'
    });
  }
}

// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
