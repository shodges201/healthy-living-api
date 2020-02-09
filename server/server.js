const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require("path");
var mongoose = require("mongoose");

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthyLiving';
const PORT = process.env.PORT || 9000;

const app = express();
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, });
const connection = mongoose.connection;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

// Add routes, both API and view
app.use(routes);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log('Node server running on port ' + PORT);
  });
});