const exprees = require("express");
const User = require('../modules/User')
const router = exprees.Router();

router.post("/", (req, res) => {
    console.log(req.body);
    const user = User(req.body)
    user.save()
    res.status(200).send(req.body);
});


module.exports = router


