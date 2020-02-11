const db = require("../../../models/index");
const router = require("express").Router();
const {body, validationResult} = require('express-validator');

// route /api/cholesterol/getAll
router.get("/getAllUser", (req, res) => {
    db.Cholesterol.find({
        userID: req.session.user.id
    }).then((err, cholesterolData) => {
        if(err){
            return res.status(422).json(err);
        }
        return res.status(200).json(cholesterolData);
    })
})

router.post('/new',[
    body('level').isInt({min: 10})
] ,(req, res) => {
    db.Cholesterol.create({
        userID: req.session.user.id,
        level: req.body.level
    }, (err, cholesterolEntry) => {
        if(err){
            return res.status(422).json(err);
        }
        console.log(cholesterolEntry);
        return res.status(200).json({
            level: cholesterolEntry.level
        });
    })
})

module.exports = router;
