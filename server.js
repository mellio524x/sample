// server.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

const uri = 'mongodb+srv://mellio524:Katie1990@cluster0.8chvgu1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB');
  // Start your server or define additional routes here
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
