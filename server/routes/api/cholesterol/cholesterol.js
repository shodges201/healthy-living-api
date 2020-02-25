const db = require("../../../models/index");
const router = require("express").Router();
const {body, validationResult} = require('express-validator');
const mongoose = require("mongoose");

// route /api/cholesterol/getAll
router.get("/getAllUser", (req, res) => {
    console.log(req.session.user);
    console.log("getAllUser");
    db.Cholesterol.find({
        userID: mongoose.Types.ObjectId(`${req.session.user.id}`)
    }).then((cholesterolData, err) => {
        if(err){
            return res.status(422).json(err);
        }
        return res.status(200).json(cholesterolData);
    })
})

router.post('/new',[
    body('amount').isInt({min: 10})
] ,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log("creating new cholesterol entry");
    db.Cholesterol.create({
        userID: mongoose.Types.ObjectId(`${req.session.user.id}`),
        level: req.body.amount,
        date: req.body.date
    }, (err, cholesterolEntry) => {
        if(err){
            console.log(err);
            return res.status(422).json(err);
        }
        console.log(cholesterolEntry);
        return res.status(200).json({
            level: cholesterolEntry.level
        });
    })
})

module.exports = router;
