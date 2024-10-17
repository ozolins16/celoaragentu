import fetch from 'node-fetch';

const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout))
  ]);
};

export default async function handler(req, res) {
  try {
    // Fetch the hotel data with a timeout of 5 seconds
    const response = await fetchWithTimeout('https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',
        'User-Agent': 'Mozilla/5.0'
      }
    }, 5000);

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