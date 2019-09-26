const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes');

//const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Add routes, both API and view
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log('Node server running on port ' + PORT);
});