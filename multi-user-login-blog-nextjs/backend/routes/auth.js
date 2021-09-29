const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin } = require('../controllers/auth');

//VALIDTORS
const { runValidation } = require('../validator');
const { userSignupValidator, userSigninValidator } = require('../validator/auth');

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout)

//test
// router.get("/secret", requireSignin, (req, res) => {
//     res.json({
//         message: req.user
//     })
// })
module.exports = router;