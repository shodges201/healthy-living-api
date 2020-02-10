const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./cholesterol/cholesterol");
const heartRate = require("./heartRate/heartRate");
const user = require("./user/user");
// const firebase = require('firebase-admin');

// API Routes
router.use("/cholesterol", apiRoutes);
router.use("/heartrate", heartRate);
router.use("/user", user);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log('/api');
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;