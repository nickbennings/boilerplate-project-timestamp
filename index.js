// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// /api/:date? requst
app.get("/api/:date?", (req, res) => {
  let date;
  let unix;
  let isUnix;
  let utc;
  let utcDate;
  let dateObj;
  let utcTest;
  let testDate;
  let testInt;
  let unix1;
  let intDate;

  date = req.params.date;
  
  // check date for unix format
  isUnix = /^\d+$/.test(date);
  testDate = new Date(date);
  utcTest = testDate.toUTCString();
  
if(isUnix) {
  intDate = parseInt(date);
  dateObj = new Date(intDate);
  unix1 = dateObj.getTime();
  unix = unix1;
  utc = dateObj.toUTCString();
} else {
  dateObj =  new Date(date);
  unix = dateObj.getTime();
  utc = dateObj.toUTCString();
}

  console.log(date);
  console.log(isUnix);
  console.log(dateObj);
  console.log(unix)
  console.log(utc);
  console.log("-------------------------")
  
  
  if(date === undefined) {
    let latestDate = new Date();
    utc = latestDate.toUTCString();
    unix = latestDate.getTime();
    res.json({unix: unix, utc: utc});
  };
  
  if(unix == null || utc == "Invalid Date") {
    res.json({error: "Invalid Date"})
  } else {
    res.json({unix: unix, utc: utc});
  }


  });
  
