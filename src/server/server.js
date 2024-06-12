// Load environment variables from a .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const routes = require('../server/routes'); // Adjust this path if needed
const InputError = require('../exceptions/InputError'); // Adjust the path to where your InputError is defined

// Create an Express application
const app = express();

// Define the port for the server to listen on
const port = 6500;
const host = '0.0.0.0';


// Enable Cross-Origin Resource Sharing (CORS) for all origins
app.use(cors());

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next(); // Proceed to the next middleware/route handler
});

// Register the routes from the imported routes module
app.use(routes);

// Error handling middleware for InputError
app.use((err, req, res, next) => {
  // If the error is an instance of InputError, return a 400 status with a custom message
  if (err instanceof InputError) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  // If it's a different kind of error, return a 413 status with a custom message
  if (err) {
    return res.status(413).json({
      status: 'fail',
      message: err.message,
    });
  }

  // If there's no error, proceed to the next middleware/route handler
  next();
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
