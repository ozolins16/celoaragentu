const output = document.getElementById('output');

async function destinationData() {
    try {
        const response = await fetch('https://pim.novatours.eu/webservice/celo111/LV/list-destinations-tab', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36',
                },
                });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = JSON.stringify(data, null);

    }catch {
        console.error('Error:', error);
        output.textContent = `Error: ${error.message}`;
    }
}


destinationData();









// async function handler(req, res) {
//   try {
//     // Fetch the hotel data from the external API
//     const response = await fetch('https://pim.novatours.eu/webservice/celo111/LV/list-destinations-tab', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch hotels: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Return the full API data to the client (without filtering)
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching hotel data:', error.message);
//     res.status(500).json({ message: 'Error fetching hotel data', error: error.message });
//   }
// }

// module.exports = handler;

// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3