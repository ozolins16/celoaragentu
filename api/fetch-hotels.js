import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Get the "location" parameter from the query string
  const { location } = req.query;

  try {
    // Make the external API request with the selected country code
    const response = await fetch(`https://pim.novatours.eu/webservice/celo111/list-hotels?country_code[]=${location}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching hotel data:', error.message);
    res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
  }
}




// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3