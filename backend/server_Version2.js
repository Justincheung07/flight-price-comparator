const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Key and Base URL for TinyFish
const tinyFishAPIKey = 'sk-tinyfish-0v5A_zSyoLsRexFJbSBVkJBxAD7Kgnly';
const tinyFishBaseURL = 'https://api.tinyfish/{endpoint}';

// Route to fetch flight data
app.post('/api/flights', async (req, res) => {
  const { origin, destination, date } = req.body;

  try {
    // Fetch data from TinyFish API
    const response = await axios.get(`${tinyFishBaseURL}/flights`, {
      params: {
        origin,
        destination,
        date,
      },
      headers: {
        'Authorization': `Bearer ${tinyFishAPIKey}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).send('Failed to fetch flight data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});