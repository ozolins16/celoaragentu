const express = require('express');
const path = require('path');
const fetchHotels = require('./api/fetch-hotels');

const app = express();

// Serve static files (like index.html, script.js)
app.use(express.static(path.join(__dirname)));

// API endpoint to fetch hotels
app.get('/api/fetch-hotels', fetchHotels);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
