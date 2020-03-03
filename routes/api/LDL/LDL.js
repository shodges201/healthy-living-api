const db = require("../../../models/index");
const router = require("express").Router();
const {body, validationResult} = require('express-validator');

router.get("/", (req, res) => {
    console.log("/heartrate");
    res.send("heartrate");
})

// route /api/heartrate/getAll
router.get("/getAllUser", (req, res) => {
    db.HeartRate.find({
        userID: req.session.user.id
    }).then((err, heartRateInfo) => {
        if(err){
            return res.status(422).json(err);
        }
        return res.status(200).json(heartRateInfo);
    })
})

router.post('/new',[
    body('rate').isInt({min: 10})
] ,(req, res) => {
    db.HeartRate.create({
        userID: req.session.user.id,
        rate: req.body.rate
    }, (err, heartRateEntry) => {
        if(err){
            return res.status(422).json(err);
        }
        return res.status(200).json({
            rate: heartRateEntry.rate
        });
    })
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
    console.log('/api');
    res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
  });
  

module.exports = router;
