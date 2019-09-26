const db = require("../../../model/health.js");
const router = require("express").Router();

// route /api/cholesterol
router.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.body.user);
    db.getAllCholesterol(req.body.user, function(data){
        //console.log(data);
        res.json(data);
    })
})

module.exports = router;
