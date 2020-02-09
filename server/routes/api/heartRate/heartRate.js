const db = require("../../../models/index");
const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("/heartrate");
    res.send("heartrate");
})

// route /api/heartrate/getAll
router.get("/getAll", (req, res) => {
    db.HeartRate.find().then((results, err) => {
        if(err) {
            console.log('Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).send(results);
        }
    })
})

router.post('/new', (req, res) => {
    console.log("here");
    db.HeartRate.create({
        userID: req.body.userID,
        rate: req.body.amount
    }, (err, hearRateEntry) => {
        console.log(JSON.stringify(err));
        console.log(typeof (err));
        if (err) {
            console.log(err.code);
            switch (err.code) {
                case 11000:
                    console.log('Repeat username: ' + err);
                    res.statusMessage = 'Username Taken';
                    res.status(500).send('Username already taken');
                    break;
                default:
                    console.log('signup error: ' + err);
                    res.statusMessage = 'Signup Error';
                    res.status(500).statusMessage('Signup Error').send('Signup Error');
            }
        }
    })
})

module.exports = router;
