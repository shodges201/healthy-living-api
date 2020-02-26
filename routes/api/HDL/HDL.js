const db = require("../../../models/index");
const router = require("express").Router();
const {body, validationResult} = require('express-validator');

// route /api/heartrate/getAll
router.get("/getAllUser", (req, res) => {
    db.LDL.find({
        userID: req.session.user.id
    }).then((err, LDLInfo) => {
        if(err){
            return res.status(422).json(err);
        }
        return res.status(200).json(LDLInfo);
    })
})

router.post('/new',[
    body('level').isInt({min: 10})
] ,(req, res) => {
    db.LDL.create({
        userID: req.session.user.id,
        level: req.body.level
    }, (err, LDLEntry) => {
        if(err){
            return res.status(422).json(err);
        }
        console.log(LDLEntry);
        return res.status(200).json({
            rate: LDLEntry.rate
        });
    })
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
    console.log('/api');
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });  

module.exports = router;
