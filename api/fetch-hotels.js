import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Make the API request to Novatours
    const response = await axios.get('https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Send the response from Novatours API back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching hotel data:', error.message);
    res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
  }
}
