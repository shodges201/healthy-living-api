const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require("path");
var mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);


const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthyLiving';
const PORT = process.env.PORT || 9000;

const app = express();
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(session({ secret: 'randomrandom', saveUninitialized: true, resave: true, store: new MongoStore({ mongooseConnection: connection }) }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

app.on('ready', function() { 
  app.listen(9000, function(){ 
      console.log(`server is running on port ${PORT}`); 
  }); 
}); 

connection.once('open', function() { 
  // All OK - fire (emit) a ready event. 
  app.emit('ready'); 
});