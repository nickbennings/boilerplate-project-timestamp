const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS
const cors = require('cors');
app.use(cors());

// Route for parsing dates and returning JSON responses
app.get('/api/timestamp/:date_string?', (req, res) => {
  let dateString = req.params.date_string;
  
  // If dateString is not provided, use current date
  if (!dateString) {
    dateString = new Date();
  }

  // Parse the date
  let date;
  if (isNaN(dateString)) {
    date = new Date(dateString);
  } else {
    date = new Date(parseInt(dateString));
  }

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response with Unix timestamp and UTC date
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen on specified port
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
