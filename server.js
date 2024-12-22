let projectData = {};

// Require Express to run server and routes
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Start up an instance of the app
const app = express();

// Configure environment variables
dotenv.config();

/* Middleware*/
// Configure Express to use JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for cross-origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

// GET route to send projectData to client
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = {
    temperature,
    date,
    userResponse,
  };
  res.send({ success: true, message: 'Data added successfully' });
});
