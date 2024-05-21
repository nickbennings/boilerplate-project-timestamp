const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Route for parsing dates and returning JSON responses
app.get('/api/:date_string?', (req, res) => {
  let dateString = req.params.date_string;
  let date;

  // If dateString is empty, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if dateString is a valid Unix timestamp
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response with Unix timestamp and UTC date
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
