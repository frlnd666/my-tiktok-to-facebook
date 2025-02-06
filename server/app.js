const express = require('express');
const cors = require('cors');
const tiktokRoutes = require('./routes/tiktok');
const facebookRoutes = require('./routes/facebook');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tiktok', tiktokRoutes);
app.use('/api/facebook', facebookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
