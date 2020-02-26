const db = require("../../../models/index");
const router = require("express").Router();
const {body, validationResult} = require('express-validator');
const mongoose = require("mongoose");

// route /api/heartrate/getAllUser
router.get("/getAllUser", (req, res) => {
    console.log(req.session.user);
    console.log("getAllUser");
    db.HeartRate.count({ userID: mongoose.Types.ObjectId(`${req.session.user.id}`)}, (err, count) => {
        if(err){
            throw err;
        }
        count > 10 ? 10 : count;
        const skip = count > 10 ? count - 10 : 0;
        db.HeartRate
            .find({ userID: mongoose.Types.ObjectId(`${req.session.user.id}`) })
            .sort({ date: 1 }).skip(skip).limit(count)
            .then((heartRateData, err) => {
                if (err) {
                    return res.status(422).json(err);
                }
                return res.status(200).json(heartRateData);
            })
    })
})

router.post('/new', [
    body('amount').isInt({ min: 10 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log("creating new heartRate entry");
    db.HeartRate.create({
        userID: mongoose.Types.ObjectId(`${req.session.user.id}`),
        level: req.body.amount,
        date: req.body.date
    }, (err, heartRateEntry) => {
        if (err) {
            console.log(err);
            return res.status(422).json(err);
        }
        console.log(heartRateEntry);
        return res.status(200).json({
            level: heartRateEntry.level
        });
    })
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
    console.log('/api');
    res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
  });

module.exports = router;
