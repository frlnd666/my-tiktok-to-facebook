const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

router.post('/upload', async (req, res) => {
  const { videoPath, caption } = req.body;
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(videoPath));
    formData.append('caption', caption);
    formData.append('access_token', accessToken);

    const response = await axios.post(
      `https://graph.facebook.com/v14.0/me/reels`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to upload video to Facebook', error });
  }
});

module.exports = router;
