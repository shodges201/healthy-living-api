const path = require("path");
const router = require("express").Router();
const cholesterolRoutes = require("./cholesterol/cholesterol");
const heartRate = require("./heartRate/heartRate");
const user = require("./user/user");
const LDL = require("./LDL/LDL");
const HDL = require("./HDL/HDL");

// API Routes
router.use("/cholesterol", cholesterolRoutes);
router.use("/heartrate", heartRate);
router.use("/user", user);
router.use("/LDL", LDL);
router.use("/HDL", HDL);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log('/api');
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;