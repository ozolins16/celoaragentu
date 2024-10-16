import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { location } = req.query; // Get the location from the query parameters

  try {
    // Fetch the hotel data from the external API
    const response = await fetch('https://pim.novatours.eu/webservice/celo111/LV/list-hotels', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer your_token_here',
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
