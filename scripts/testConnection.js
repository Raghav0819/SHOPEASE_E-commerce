const mongoose = require('mongoose');

const mongoURI = 'your_mongo_uri_here'; // Use your actual MongoDB URI here

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
