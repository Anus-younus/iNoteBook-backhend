const exprees = require("express");
const User = require('../modules/User');
const { body, validationResult } = require("express-validator");
const router = exprees.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let jData = "AnusTata"

router.post("/createuser", [
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

router.post("/login", [
    body('email', "Your email is inavalied").isEmail(),
    body('password', "Your password is inavalied").exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({erros: "Please try to login with correct credentialy"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({errors: "Please enter a valied password"})
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jData)
        res.json({authToken})
    } catch (error) {
        
    }
})


module.exports = router


