// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const productsRouter = require('./src/features/product-routes.js');
const { connectMonggose } = require('./src/config/db.js');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Set the port for the server to listen on
const PORT = 3000;

// Connect to MongoDB using the defined function in db.js
connectMonggose();

// Use middleware to parse JSON requests
app.use(express.json());

// Use the productsRouter for handling routes starting with '/'
app.use('/', productsRouter);

// Start the server and listen on the specified port
app.listen(PORT, (error) => {
  if (error) {
    console.error(`Error starting the server: ${error.message}`);
  } else {
    console.log(`Server is listening at port ${PORT}`);
  }
});
