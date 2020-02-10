const router = require("express").Router();
const crypto = require("crypto");
const db = require("../../../models");
const { check, validationResult } = require('express-validator');

// signup new user
router.post("/signup", [
    check('username').isLength({ min: 3 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 8 }),
    check('externalType').isIn(['google', 'native'])
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const userInfo = hashPassword(req.body.password);
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        passwordHash: userInfo.hash,
        passwordSalt: userInfo.salt,
        externalType: "native",
        externalID: null
    }, (err, data) => {
        if (err) {
            return res.status(422).json(err);
        }
        const userInfo = {
            username: data.username,
            email: data.email
        };
        const session = req.session;
        session.user = userInfo;
        return res.status(200).json(userInfo);
    })
})

//login existing user
router.post("/login", [
    check('email').isEmail().normalizeEmail()
], (req, res) => {
    console.log("/login");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    db.User.find({
        email: req.body.email
    }, (err, data) => {
        if(err){
            return res.status(422).json(err);
        }
        const user = data[0];
        const correctPassword = validPassword(req.body.password, user.passwordSalt, 10000, user.passwordHash);
        if(correctPassword){
            const userInfo = {
                username: user.username,
                email: user.email
            };
            const session = req.session;
            session.user = userInfo;
            return res.status(200).json(userInfo);
        }
        return res.status(422).send("incorrect password");
    })
})

router.get('/logout',(req,res) => {
    console.log(req.session);
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        console.log(req.session);
        res.end();
    });
});

function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

function validPassword (password, salt, iterations, dbHash) {
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, `sha512`).toString(`hex`);
    return hash === dbHash;
};

module.exports = router;