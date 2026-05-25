const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const port=process.env.PORT || 3000;

dotenv.config();
const app = express();
//connect to database
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
//server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});