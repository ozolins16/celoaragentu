export default async function handler(req, res) {
  const { countryCode, adults, page } = req.query;  // Only capture countryCode and adults

  let apiUrl;

  if (countryCode) {
    const queryParams = new URLSearchParams();
    queryParams.append('country_code[]=', countryCode);
    if (adults) queryParams.append('adults=', adults);

    apiUrl = `https://pim.novatours.eu/webservice/celo111/LV/list-hotels?${queryParams.toString()}`;
  } else {
    // If no countryCode, fetch the list of destinations
    apiUrl = 'https://pim.novatours.eu/webservice/celo111/LV/list-destinations-tab';
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',  // Replace with your actual token
        'User-Agent': 'Mozilla/5.0'
      }
    });
    console.log(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);  // Send the API data to the client
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}

  
  
  // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
  // https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
  // 72ae9d228c3f630b446a1b8a8cb8cbf3

// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3