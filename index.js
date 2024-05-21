const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Route for the root URL
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route for the timestamp API
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // If dateString is not provided, use current date
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
