const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes');
const admin = require('firebase-admin');
const path = require("path");

//const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
console.log();
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://healthy-living-5cb07.firebaseio.com"
});


app.listen(PORT, () => {
  console.log('Node server running on port ' + PORT);
});