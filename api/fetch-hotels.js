import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV', {
      headers: {
        'Authorization': 'Bearer // 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    // Log detailed error message from server
    console.error('Error message:', error.message);
    console.error('Error response data:', error.response?.data);  // Check for any error response data
    console.error('Error status:', error.response?.status);  // Check if there's a response status code
    
    // Return detailed error response to client
    res.status(500).json({
      message: 'Error fetching hotel data',
      error: error.message,
      details: error.response?.data || 'No details from API',
      status: error.response?.status || 'No status code from API'
    });
  }
}


// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3