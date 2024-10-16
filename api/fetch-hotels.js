import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Making a request to the external API
    const response = await axios.get('https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV', {
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Return the successful data
    res.status(200).json(response.data);
  } catch (error) {
    // Log the full error for debugging purposes
    console.error('Error message:', error.message);
    if (error.response) {
      // Log the full response if available
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      res.status(error.response.status).json({
        message: 'Error fetching hotel data',
        details: error.response.data,
      });
    } else {
      // General error logging if no specific response data
      res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
    }
  }
}


// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3