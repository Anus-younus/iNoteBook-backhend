const exprees = require("express");
const User = require('../modules/User');
const { body, validationResult } = require("express-validator");
const router = exprees.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let jData = "AnusTata"

router.post("/", [
    body('name', "Your name is inavalied").isLength({ min: 3 }),
    body('email', "Your email is inavalied").isEmail(),
    body('password', "Your password is inavalied").isLength({ min: 5 })
], async (req, res) => {
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() })
    }
    let userEmail = await User.findOne({ email: req.body.email });
    console.log(userEmail);

    if (userEmail) {
        return res.status(400).json({ errors: "Sorry your email is already exixst" })
    }
    console.log(req.body);
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt)
    let user = User(req.body)
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, jData)
    res.json({authToken})
});


module.exports = router


