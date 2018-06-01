​// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Empty reservation table
// =============================================================
var reservation =[
    {
    "customerName": "Ahmed",
    "customerEmail": "afhaque89@gmail.com",
    "customerID": "afhaque89",
    "phoneNumber": "979-587-0887"
    }
];
var waitlist = [
    {
    "customerName": "Saima",
    "customerEmail": "saima@gmail.com",
    "phoneNumber": "979-587-0887",
    "customerID": "saimacool"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  	console.log('home page request');
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/tables", function(req, res) {
    console.log('table page requested');
    res.sendFile(path.join(__dirname, "table.html"));
  });
  
  app.get("/reserve", function(req, res) {
    console.log('reserve page requested');
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

// Display all reservations in tables
app.get("/api/tables", function(req,res){
    return res.json(reservation);
})

// Create reservations - takes in JSON input
app.post("/api/reserve", function(req,res){

    var newReserve = req.body;

    newReserve.routeName = newReserve.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReserve);

    if (reservation.length < 5){
        reservation.push(newReserve);
    }
    else {
        waitlist.push(newReserve);
    }

    res.json(newReserve);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  