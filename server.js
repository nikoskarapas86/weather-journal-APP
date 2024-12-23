import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const port = 8000;

let projectData = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('website'));

// Routes
app.get('/all', (req, res) => res.send(projectData));
app.post('/add', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse };
  res.send({ success: true, message: 'Data added successfully' });
});

// Fallback route for undefined paths
app.get('*', (req, res) => res.status(404).send('404: Page not found'));

// Start server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
