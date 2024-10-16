import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { location } = req.query; // Get the location from the query parameters

  try {
    // Fetch the hotel data from the external API
    const response = await fetch('https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
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


    console.log(JSON.stringify(data, null, 2));    
    // Filter the data based on the location provided
    // const filteredData = data.hotels.filter(hotel => hotel.country_code === location);

    // Return the filtered data
    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error fetching hotel data:', error.message);
    res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
  }
}






// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3