const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }
        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;
        let newUser = new User({ name, email, password, profile, username });
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json({
                message: 'Signup successfull ! Please SignIn'
            })
        })
    })
}

exports.signin = (req, res) => {
    //check if user exist
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        //authenticate
        if (!user.authenticate(password)) {
            res.status(400).json({
                error: 'Email and password do not match'
            })
        }
        //generate token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user,

        })
    }
    )
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: "Signout Success"
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']

})