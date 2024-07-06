const exprees = require("express");
const User = require('../modules/User');
const { body, validationResult } = require("express-validator");
const router = exprees.Router();

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
    const user = User(req.body)
    user.save()
    res.status(200).send(req.body);
    res.json({ erros: 'Please Enter a valied email' })
    res.json("Nice")
});


module.exports = router


