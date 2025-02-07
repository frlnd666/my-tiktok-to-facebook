const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

// Middleware untuk mengunggah file
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  const { caption } = req.body;
  const videoBuffer = req.file.buffer;

  try {
    const formData = new FormData();
    formData.append('file', videoBuffer, req.file.originalname);
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
