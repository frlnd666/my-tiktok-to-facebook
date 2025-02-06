const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/download', async (req, res) => {
  const { url } = req.body;
  try {
    // Contoh cara mengunduh video TikTok (metode ini mungkin tidak berfungsi selalu)
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.type('video/mp4');
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to download video', error });
  }
});

module.exports = router;
