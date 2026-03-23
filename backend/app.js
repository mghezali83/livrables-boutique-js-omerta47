const express = require('express');
const cors = require('cors');

// Import routes
const productRoutes = require('./router/products');

// Create Express app
const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);

// Simple route for testing the server is up
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// We will add database connection here later
// module.exports = db; // to export the db connection
