const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./cholesterol/cholesterol");
const heartRate = require("./heartRate/heartRate");
// const firebase = require('firebase-admin');

// API Routes
router.use("/cholesterol/", apiRoutes);
router.use("/heartrate/", heartRate);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log('/');
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;