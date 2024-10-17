const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://pim.novatours.eu/webservice/celo111/LV/list-destinations-tab';

fetch(proxyUrl + apiUrl, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer 72ae9d228c3f630b446a1b8a8cb8cbf3',
    'User-Agent': 'Mozilla/5.0',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });



// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
// https://pim.novatours.eu/webservice/celo111/LV/list-hotels?country_code[]=LV
// 72ae9d228c3f630b446a1b8a8cb8cbf3