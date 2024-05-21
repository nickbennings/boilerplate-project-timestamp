const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Route to handle timestamp conversion
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;
  let date;
  
  if (dateString) {
    // Check if the provided string is a valid date or a Unix timestamp
    if (!isNaN(Date.parse(dateString))) {
      date = new Date(dateString);
    } else {
      date = new Date(parseInt(dateString));
    }
  } else {
    // If no date is provided, use the current date
    date = new Date();
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid date' });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Default route handler for requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Timestamp Microservice!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
