const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define your routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Netlify Function!' });
});

// Export the serverless function
module.exports.handler = serverless(app);