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
    console.log("here");
    db.HeartRate.create({
        userID: req.session.user.id,
        rate: req.body.rate
    }, (err, heartRateEntry) => {
        if(err){
            return res.status(422).json(err);
        }
        console.log(heartRateEntry);
        return res.status(200).json({
            rate: heartRateEntry.rate
        });
    })
})

module.exports = router;
