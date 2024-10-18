export default async function handler(req, res) {
  const { countryCode } = req.query;  // Get the countryCode from the query string

  // Base URL for fetching hotel data
  const apiUrl = countryCode 
    ? `https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=${countryCode}`
    : 'https://pim.novatours.eu/webservice/celo111/LV/list-destinations-tab';

  try {
    // Fetch data from the API based on the selected country
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);  // Send the API data to the client
  } catch (error) {
    console.error('Error fetching hotel data:', error.message);
    res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
  }
}

  
  
  // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
  // https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
  // 72ae9d228c3f630b446a1b8a8cb8cbf3

// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3