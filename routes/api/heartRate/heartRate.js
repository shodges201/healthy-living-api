const db = require("../../../model/health.js");
const router = require("express").Router();

// route /api/heartrate/getAll
router.post("/getAll", (req, res) => {
    db.getAllHeartRate(req.body.userID, function(data){
        res.json(data);
    })
})

router.post('/new', (req, res) => {
    console.log("here");
    db.addNewHeartRate(req.body.userID, req.body.date, req.body.amount, function(data){
        res.json(data);
    })
})

module.exports = router;
