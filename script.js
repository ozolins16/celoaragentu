async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying... (${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

export default async function handler(req, res) {
  try {
    const response = await fetchWithRetry('https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching hotel data:', error.message);
    res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
  }
}
