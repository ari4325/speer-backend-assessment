require('dotenv').config();
require('./src/config/db')();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
