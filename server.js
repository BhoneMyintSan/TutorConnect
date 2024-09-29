// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import your auth route
const tutorProfileRoutes = require('./routes/tutorProfiles'); // Import tutor profile routes
const ratingRoutes = require('./routes/ratings'); // Import rating routes

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.BACKEND_PORT || 3001; // Use 3001 or another available port

app.use(cors());
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Use the auth routes with a base path
app.use('/api', authRoutes); // Use '/api' as the base path for all auth routes

// Use the tutor profile routes with a base path
app.use('/api/tutors', tutorProfileRoutes); // Add tutor profile routes

// Use the rating routes with a base path
app.use('/api/ratings', ratingRoutes); // Add rating routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
